import { css } from '@emotion/react'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import isObject = TypeU.isobject
import isstring = TypeU.isstring
import SingleOrArr = ArrayU.SingleOrArr
import exists = TypeU.exists
import ObjectMap = ObjectU.ObjectMap
import RecordRo = TypeU.RecordRo




export namespace WidgetStyle {
  
  /*
  Has Element list
  Has State List
  Has SINGLE Root element
  */
  export class CssWidget<
    const E extends string,
    const S extends string,
    const P extends string
  > {
    
    constructor(
      readonly root: NoInfer<E>,
      readonly states: RecordRo<S, CssWidgetState>,
      readonly elements: RecordRo<E, CssWidgetElement>,
      readonly props: RecordRo<P, CssWidgetProp>,
    ) { }
    
    // get root
    get r() { return this.root }
    // get root element
    get re() { return this.elements[this.root] }
    // get states
    get s() { return this.states }
    // get elements
    get e() { return this.elements }
  
    get use() { return new UseCssWidget(this) }
    
    static ofRoot
    <const E extends string, const S extends string, const P extends string>
    (elementName: E, element: Elem<S, P>): CssWidget<E, S, P> {
      return new CssWidget<E, S, P>(
        elementName,
        {
          ...ObjectMap<Record<S, CssState>, Record<S, CssWidgetState>>(
            element.states,
            ([stateName, cssState]) => [
              stateName,
              new CssWidgetState(elementName, cssState),
            ]
          ),
        },
        {
          [elementName]: new CssWidgetElement(element),
        } as Record<E, CssWidgetElement>,
        {
          ...ObjectMap<Record<P, CssProp>, Record<P, CssWidgetProp>>(
            element.props,
            ([propName, cssProp]) => [
              propName,
              new CssWidgetProp(elementName, cssProp),
            ]
          ),
        },
      )
    }
    
    addRoot
    <
      const NE extends Exclude<string, E>,
      const NS extends Exclude<string, S>,
      const NP extends Exclude<string, P>,
    >
    (elementName: NE, element: Elem<NS, NP>): CssWidget<E | NE, S | NS, P | NP> {
      return new CssWidget<E | NE, S | NS, P | NP>(
        elementName,
        {
          ...this.states,
          ...ObjectMap<Record<NS, CssState>, Record<NS, CssWidgetState>>(
            element.states,
              ([stateName, cssState]) => [
              stateName,
              new CssWidgetState(elementName, cssState),
            ]
          ),
        },
        {
          ...this.elements,
          [elementName]: new CssWidgetElement(element),
        } as Record<E | NE, CssWidgetElement>,
        {
          ...this.props,
          ...ObjectMap<Record<NP, CssProp>, Record<NP, CssWidgetProp>>(
            element.props,
            ([propName, cssProp]) => [
              propName,
              new CssWidgetProp(elementName, cssProp),
            ]
          ),
        },
      )
    }
    
    add
    <
      const NE extends Exclude<string, E>,
      const NS extends Exclude<string, S>,
      const NP extends Exclude<string, P>,
    >
    (up: E, selector: string, elementName: NE, element: Elem<NS, NP>)
    : CssWidget<E | NE, S | NS, P | NP> {
      return new CssWidget<E | NE, S | NS, P | NP>(
        this.root,
        {
          ...this.states,
          ...ObjectMap<Record<NS, CssState>, Record<NS, CssWidgetState>>(
            element.states,
            ([stateName, cssState]) => [
              stateName,
              new CssWidgetState(elementName, cssState),
            ]
          ),
        },
        {
          ...this.elements,
          [elementName]: new CssWidgetElement(element, up, selector),
        } as Record<E | NE, CssWidgetElement>,
        {
          ...this.props,
          ...ObjectMap<Record<NP, CssProp>, Record<NP, CssWidgetProp>>(
            element.props,
            ([propName, cssProp]) => [
              propName,
              new CssWidgetProp(elementName, cssProp),
            ]
          ),
        },
      )
    }
  
  }
  
  
  export class UseCssWidget
  <const E extends string, const S extends string> {
    
    readonly s: RecordRo<S, () => UseCssWidget<E, S>>
    readonly e: RecordRo<E, () => UseCssWidget<E, S>>
    
    currState: S | null = null
    currElem: E | null = null
    
    constructor(
      readonly widget: CssWidget<E, S, any>,
    ) {
      this.s = ObjectMap(widget.states, ([name]) => [
        name,
        () => {
          this.currState = name
          return this
        },
      ])
      this.e = ObjectMap(widget.elements, ([name]) => [
        name,
        () => {
          this.currElem = name
          return this
        },
      ])
    }
    
    // get widget
    get w() { return this.widget }
    
    get use() {
      if (this.currElem === null) throw new Error('element is null')
      
      let selector = ''
      let eName = this.currElem
      const e = () => this.widget.elements[eName]
      const s = (() => {
        if (this.currState === null) return null
        const s = this.widget.states[this.currState]
        if (!s.use) return null
        return s
      })()
      let stateWasApplied = false
      
      while (eName) {
        if (s !== null) {
          if (!stateWasApplied && eName === s.ownerElementName) {
            selector = s.use + selector
            stateWasApplied = true
          }
          else if (!stateWasApplied && eName === this.widget.root) {
            const startName = eName
            let endName = s.ownerElementName
            const end = () => this.widget.elements[endName]
            let stateSelector = ''
            
            while (startName !== endName) {
              stateSelector = end().use + stateSelector
              endName = end().upElementName as E
            }
            
            if (stateSelector) {
              selector = `:has(${stateSelector}${s.use})` + selector
              stateWasApplied = true
            }
          }
        }
        
        selector = e().use + selector
        eName = e().upElementName as E
      }
      
      return selector
    }
    
    get thisUse() {
      return `&${this.use}`
    }
  }
  
  
  export class CssWidgetElement {
    
    constructor(
      readonly element: Elem<any, any>,
      // '' if this element is root
      readonly upElementName = '',
      readonly upSelector = '',
    ) { }
    
    // get element
    get e() { return this.element }
    
    get use() {
      return `${this.upSelector}${this.element.use}`
    }
    
  }
  
  
  export class CssWidgetState {
    
    constructor(
      readonly ownerElementName: string,
      readonly state: CssState,
    ) { }
    
    // get state
    get s() { return this.state }
    
    get use() {
      return this.state.use
    }
    
  }
  
  
  export class CssWidgetProp {
    
    constructor(
      readonly ownerElementName: string,
      readonly prop: CssProp,
    ) { }
    
    // get prop
    get p() { return this.prop }
    
  }
  
  
  /*
  STATE ORDER:
  normal
  checked
  hover
  active
  focus
  focusVisible
  readOnly
  disabled
  error
  */
  
  
  
  export class CssPseudo {
    
    constructor(
      // 'hover'
      readonly name: string
    ) { }
    
    // ':hover'
    get use() {
      const name = this.name
      if (!name) return ''
      return `:${name}`
    }
    // '&:hover'
    get thisUse() {
      const use = this.use
      if (!use) return ''
      return `&${use}`
    }
    
    static readonly empty = new CssPseudo('')
    static readonly checked = new CssPseudo('checked')
    static readonly hover = new CssPseudo('hover')
    static readonly active = new CssPseudo('active')
    static readonly focus = new CssPseudo('focus')
    static readonly focusVisible = new CssPseudo('focus-visible')
    static readonly readOnly = new CssPseudo('read-only')
    static readonly disabled = new CssPseudo('disabled')
    
    static readonly anyFocus = new CssPseudo('where(:active,:focus,:focus-visible)')
    
  }
  
  
  export class CssAttr {
    
    constructor(
      // attr name
      // 'data-error'
      readonly name: string
    ) { }
    
    // attr selector
    // '[data-error]'
    get use() {
      const name = this.name
      if (!name) return ''
      return `[${name}]`
    }
    
    // attr this selector
    // '&[data-error]'
    get thisUse() {
      const use = this.use
      if (!use) return ''
      return `&${use}`
    }
    
    static readonly empty = new CssAttr('')
    static readonly dataError = new CssAttr('data-error')
    
  }
  
  
  export type CssState = CssPseudo | CssAttr
  
  
  
  export class CssAttrEnum<const V extends string> {
    
    constructor(
      // attr name
      // 'direction'
      readonly name: string,
      // possible values
      // ['horizontal', 'vertical']
      readonly values: V[],
    ) { }
    
    // attr name-value combiner
    // 'direction=vertical'
    nameValue(value: V | '' = '') {
      const name = this.name
      if (!name) return ''
      if (!value) return name
      return `${name}=${value}`
    }
    
    // attr selector
    // '[direction=vertical]'
    use(value: V | '' = '') {
      const nameValue = this.nameValue(value)
      if (!nameValue) return ''
      return `[${nameValue}]`
    }
    
    // attr this selector
    // '&[direction=vertical]'
    thisUse(value: V | '' = '') {
      const use = this.use()
      if (!use) return ''
      return `&${use}`
    }
    
    toAttr(value: V | '' = '') {
      const nameValue = this.nameValue(value)
      return new CssAttr(nameValue)
    }
    
    
    static readonly empty = new CssAttrEnum('', [])
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
    static readonly inputType = new CssAttrEnum('type', ['radio', 'checkbox'])
    
  }
  
  
  
  // todo make P extends Record<...> to remember each property
  export class Elem<const S extends string, const P extends string> {
    
    constructor(
      // classname
      // 'rrainuiButton'
      readonly name: string,
      readonly states: Record<S, CssState>,
      readonly props: Record<P, CssProp>,
    ) { }
    
    // dot classname
    // '.rrainuiButton'
    get use() {
      if (!this.name) return ''
      return `.${this.name}`
    }
    
    // & dot classname
    // '&.rrainuiButton'
    get thisUse() {
      const use = this.use
      if (!use) return ''
      return `&${use}`
    }
    
    get p() { return this.props }
    
  }
  
  
  function testButtonHoverHover() {
    // TEST button:hover > border
    const btn = new Elem('rrainuiButton', {
      normal: CssPseudo.empty,
      hover: CssPseudo.hover,
    }, { })
    const border = new Elem('rrainuiBorder', { }, { })
    
    {
      const a = btn.states.hover
      //const b = frame.states.SOMETHING_ELSE // error
    }
    
    const buttonWidgetBtn = CssWidget.ofRoot('btn', btn)
    
    {
      const a = buttonWidgetBtn.states.hover
      //const b = buttonWidget.states.SOMETHING_ELSE // error
      const c = buttonWidgetBtn.elements.btn
      //const d = buttonWidget.elements.SOMETHING_ELSE // error
    }
    
    const buttonWidget = buttonWidgetBtn.add('btn', '>', 'border', border)
    
    {
      //const buttonWidget = inputWidget.add('SOMETHING_ELSE', '>', 'input', input) // error
    }
    
    const hoverBorder = buttonWidget.use.s.hover().e.border().use
    
    {
      //const hoverBorder1 = buttonWidget.use.s.SOMETHING_ELSE().e.input().use // error
      //const hoverBorder2 = buttonWidget.use.s.hover().e.SOMETHING_ELSE().use // error
    }
    
    // .rrainuiButton:hover>.rrainuiBorder
    //console.log('hoverBorder', hoverBorder)
  }
  
  function testFrameInputHover() {
    // TEST frame > input:hover
    const frame = new Elem('rrainuiFrame', { }, { })
    const input = new Elem('rrainuiInput', {
      normal: CssPseudo.empty,
      hover: CssPseudo.hover,
    }, { })
    
    {
      //const a = frame.states.SOMETHING_ELSE // error
    }
    
    const inputWidgetFrame = CssWidget.ofRoot('frame', frame)
    const inputWidget = inputWidgetFrame.add('frame', '>', 'input', input)
    
    {
      const a = inputWidget.states.hover
      //const b = inputWidget.states.SOMETHING_ELSE // error
      const c = inputWidget.elements.input
      //const d = inputWidget.elements.SOMETHING_ELSE // error
    }
    
    
    {
      //const widget = inputWidget.add('SOMETHING_ELSE', '>', 'input', input) // error
    }
    
    const hoverInput = inputWidget.use.s.hover().e.input().use
    
    {
      //const hoverInput1 = inputWidget.use.s.SOMETHING_ELSE().e.input().use // error
      //const hoverInput2 = inputWidget.use.s.hover().e.SOMETHING_ELSE().use // error
    }
    
    // hoverInput .rrainuiFrame>.rrainuiInput:hover
    //console.log('hoverInput', hoverInput)
  }
  
  function testFrameInputFrameBorderHover() {
    // TEST frame > input, frame > border:hover
    const frame = new Elem('rrainuiFrame', { }, { })
    const input = new Elem('rrainuiInput', { }, { })
    const border = new Elem('rrainuiBorder', {
      normal: CssPseudo.empty,
      hover: CssPseudo.hover,
    }, { })
    
    {
      //const a = frame.states.SOMETHING_ELSE // error
    }
    
    const inputWidgetFrame = CssWidget.ofRoot('frame', frame)
    const inputWidgetInput = inputWidgetFrame.add('frame', '>', 'input', input)
    const inputWidget = inputWidgetInput.add('frame', '>', 'border', border)
    
    
    const inputWithHoverBorder = inputWidget.use.s.hover().e.input().use
    const thisInputWithHoverBorder = inputWidget.use.s.hover().e.input().thisUse
    
    
    // .rrainuiFrame:has(>.rrainuiBorder:hover)>.rrainuiInput
    //console.log('inputWithHoverBorder', inputWithHoverBorder)
    // &.rrainuiFrame:has(>.rrainuiBorder:hover)>.rrainuiInput
    //console.log('thisInputWithHoverBorder', thisInputWithHoverBorder)
  }
  
  function test001() {
    /*
     ${W.use.s.active().e.btn().useThis} { }
     ${El.btn.thiz('active')} { }
     */
  }

  
  
  
  export class CssProp {
    constructor(
      // full prop name
      // '--color'
      readonly name: string
    ) { }
    
    setAny(value: string): string {
      return `${this.name}: ${value};`
    }
    varAny(defaultValue?: string): string {
      const nameAndDefault = [this.name]
      if (exists(defaultValue)) nameAndDefault.push(defaultValue)
      return `var(${nameAndDefault.join(', ')})`
    }
    
    set(value: string): string {
      return this.setAny(value)
    }
    var(defaultValue?: string): string {
      return this.varAny(defaultValue)
    }
    withDefault(defaultValue?: string): string {
      return this.set(this.var(defaultValue))
    }
    
    
    static readonly color = new class extends CssProp {
      override setAny(value: string): string {
        return `${super.setAny(value)} color: ${value};`
      }
    }('--color')
  }
  
  export class CssPropEnum<const V extends readonly string[]> extends CssProp {
    readonly values: V
    
    constructor(name: string, values: V) {
      super(name)
      this.values = values
    }
    
    override set(value: V[number]): string {
      return this.setAny(value)
    }
    override var(defaultValue?: V[number]): string {
      return this.varAny(defaultValue)
    }
    override withDefault(defaultValue?: V[number]): string {
      return this.setAny(this.varAny(defaultValue))
    }
  }
  
  // @deprecated todo remove
  export const CssPropColor = new class extends CssProp {
    override setAny(value: string): string {
      return `${super.setAny(value)} color: ${value};`
    }
  }('--color')
  
  
  
  function cssPropExample() {
    // CssProp EXAMPLE
    const Prop = {
      prop: new CssProp('--prop'),
      propEnum: new CssPropEnum('--prop-enum', ['black', 'white', 'default-value']),
    } as const
    
    const cssPropExample = css`
      // --prop: value;
      ${Prop.prop.name}: value;
      // --prop: var(--prop);
      ${Prop.prop.name}: ${Prop.prop.var()};
      // --prop: var(--prop, default-value);
      ${Prop.prop.name}: ${Prop.prop.var('default-value')};
      // --prop: var(--prop, default-value);
      ${Prop.prop.withDefault('default-value')};
      
      // --prop-enum: black;
      ${Prop.propEnum.set('black')};
      // --prop-enum: black;
      ${Prop.propEnum.name}: black;
      // --prop-enum: var(--prop-enum);
      ${Prop.propEnum.name}: ${Prop.propEnum.var()};
      // --prop-enum: var(--prop-enum, default-value);
      ${Prop.propEnum.name}: ${Prop.propEnum.var('default-value')};
      // --prop-enum: var(--prop-enum, default-value);
      ${Prop.propEnum.withDefault('default-value')};
    `
  }
  
  
  
  
  
  
  // todo REMOVE ALL BELOW:
  
  
  
  export class Pseudo0 {
    readonly name: string
    
    readonly sel: string
    readonly thiz: string
    
    constructor(name: string) {
      this.name = name
      
      this.sel = `:${this.name}`
      this.thiz = `&${this.sel}`
      if (!this.name) {
        this.sel = ''
        this.thiz = ''
      }
    }
    
    
    
    static readonly empty = new Pseudo0('')
    static readonly hover = new Pseudo0('hover')
    static readonly active = new Pseudo0('active')
    static readonly focus = new Pseudo0('focus')
    static readonly focusVisible = new Pseudo0('focus-visible')
    static readonly checked = new Pseudo0('checked')
    static readonly disabled = new Pseudo0('disabled')
  }
  
  
  
  
  export type DataAttrState<V extends readonly string[]>
    = Record<V[number], DataAttr<any>>
  
  export class DataAttr<const V extends readonly string[]> {
    readonly rawName: string
    readonly name: string
    
    readonly sel: string
    readonly thiz: string
    
    readonly values: V
    
    readonly s: DataAttrState<V>
    
    constructor(rawName: string, values: V) {
      this.rawName = rawName
      this.name = `data-${this.rawName}`
      this.values = values
      
      this.sel = `[${this.name}]`
      this.thiz = `&${this.sel}`
      
      const attrState = {} as DataAttrState<V>
      this.values.forEach(value => {
        attrState[value] = new DataAttr(`${this.rawName}=${value}`, [])
      })
      this.s = attrState
    }
    
    
    static readonly error = new DataAttr('error', [])
  }
  // todo remove
  export const DataAttrError = new DataAttr('error', [])
  
  /* { // attr test
    const AttrDirection = new DataAttr('direction',['vertical','horizontal'])
    console.log('AttrDirection',AttrDirection)
    
    const isHorizontalDirection = AttrDirection.s.horizontal.sel
    const isVerticalDirection = AttrDirection.s.vertical.sel
    console.log('isHorizontalDirection',isHorizontalDirection)
    console.log('isVerticalDirection',isVerticalDirection)
  } */
  
  
  
  
  
  export function combineStates(...states: (Pseudo0|DataAttr<any>)[]): Pseudo0 {
    if (states.length===0) return Pseudo0.empty
    if (states.length===1) return states[0]
    return new Pseudo0(`is(${states.map(it => it.sel).join(',')})`)
  }
  
  
  
  
  
  export type StateForElem<S extends string> = {
    elem: Elem0<any, any, any> | 'root',
    state: S[],
  }
  
  
  export type ElemStateDescriptor<S extends string>
    = Record<S, SingleOrArr<Pseudo0 | DataAttr<any>>>
  
  
  export class Elem0<
    S extends string,
    RootS extends string = S,
    P extends Record<string, CssProp> = Record<string, never>
  > {
    #up: Elem0<any, any, any> | undefined
    get up() { return this.#up }
    upSelector = ''
    
    // Class name without dot
    name: string
    states: ElemStateDescriptor<S>
    
    props: P
    
    
    constructor(
      name: string,
      states: ElemStateDescriptor<S>,
      props: P
    ) {
      this.name = name
      this.states = states
      this.props = props
    }
    
    s(...state: S[]): StateForElem<S> {
      return {
        elem: this,
        state: state,
      }
    }
    
    
    private extractThisState
    (
      applyStrings: boolean,
      applyRoot: boolean,
      ...state: (S|RootS|StateForElem<any>|StateForElem<S>)[]
    )
    : [ S[], (RootS|StateForElem<any>)[] ] {
      const statesSet = new Set<S>()
      const restState = state.filter(it => {
        if (isstring(it)) {
          if (applyStrings && it in this.states) {
            statesSet.add(it as S)
            return false
          }
        }
        else if (isObject(it)) {
          if (this===it.elem || (it.elem==='root' && applyRoot)) {
            it.state.forEach(it => {
              if (it in this.states) statesSet.add(it as S)
            })
            return false
          }
        }
        return true
      }) as (RootS|StateForElem<any>)[]
      return [[...statesSet], restState] as const
    }
    
    
    selSingle(...state: (S | StateForElem<S>)[]): string {
      const [thisState] = this.extractThisState(true, !this.#up, ...state)
      return '.'+this.name + combineStates(...thisState.flatMap(it => this.states[it])).sel
    }
    
    sel(...state: (RootS | StateForElem<any> | StateForElem<S>)[]): string {
      const [thisState, restState] = this.extractThisState(!this.#up, !this.#up, ...state)
      const thisSelector = '.'+this.name
        + combineStates(...thisState.flatMap(it => this.states[it])).sel
      const upSelector = this.up?.sel(...restState) ?? ''
      return upSelector+this.upSelector+thisSelector
    }
    thiz(...state: (RootS | StateForElem<any> | StateForElem<S>)[]): string {
      return '&'+this.sel(...state)
    }
    
    
    toElem<Down extends string, DownP extends Record<string, CssProp>>
    (selector: string, down: Elem0<Down, any, DownP>): Elem0<Down, RootS, DownP> {
      const newDown = new Elem0<Down, RootS, DownP>(down.name, down.states, down.props)
      newDown.#up = this
      newDown.upSelector = selector
      return newDown
    }
    
  }
  
  /* { // Elem test
    const hover = new PseudoClass('hover')
    const active = new PseudoClass('active')
    const dataActive = new DataAttr('active',[])
    const highlight = new DataAttr('highlight',[])
    const direction = new DataAttr('direction',['vertical','horizontal'])
    const fast = new DataAttr('fast',[])
    
    const btnElem = new Elem('rrainuiButton',
      {
        hover: hover,
        active: [dataActive, active],
        highlight: highlight,
        direction: direction,
        vertical: direction.s.vertical,
        horizontal: direction.s.horizontal,
      }
    )
    
    const borderElem = btnElem.upFor('>',new Elem('rrainuiBorder',{}))
    
    const rippleElem = borderElem.upFor(' ',new Elem('rrainuiRipple',{ fast }))
    
    console.log('btnElem',btnElem)
    console.log('borderElem',borderElem)
    console.log('rippleElem',rippleElem)
    
    console.log('btnElem.',btnElem.sel())
    console.log('btnElem.hover',btnElem.sel('hover'))
    console.log('btnElem.active',btnElem.sel('active'))
    
    console.log('borderElem.hover',borderElem.sel('hover'))
    console.log('borderElem.hover.vertical',borderElem.sel('hover','vertical'))
    
    console.log('rippleElem.',rippleElem.sel())
    console.log('rippleElem.hover',rippleElem.sel('hover'))
    console.log('rippleElem.active',rippleElem.sel('active'))
    
    console.log(
      'rippleElem.active.highlight',
      rippleElem.sel('active','highlight')
    )
    console.log(
      'rippleElem.hover.active',
      rippleElem.sel('hover','active')
    )
    console.log(
      'rippleElem.this.active.fast',
      rippleElem.thisSel(btnElem.s('active'), rippleElem.s('fast'))
    )
    
  } */
  
  
  
  
  export namespace Attr0 {
    export const attr = {
      error: 'data-error',
    } as const
    export const select = generateAttrSelector(attr)
    export const selThis = generateAttrThisSelector(select)
    
    export type errorJsxProp =
      PartialUndef<{ [attr.error]: boolean }>
    export type errorHtmlProp =
      PartialUndef<{ [attr.error]: true|undefined }>
  }
  export namespace Prop0 {
    export const prop = {
      color: '--color',
    } as const
    export const varr = generatePropVar(prop)
    export const vard = generatePropVarDefault(prop)
  }
  
  
  
  export type PropObject<T extends string> = Record<T, string>
  export type PropGenerator<T extends string> = Record<T, (value:string)=>string>
  
  
  
  // attr-name -> [attr-name]
  export function generateAttrSelector<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = { ...props }
    for (const propName in mappedProps) {
      mappedProps[propName] = `[${props[propName]}]`
    }
    return mappedProps
  }
  
  // [attr-name] -> &[attr-name]
  export function generateAttrThisSelector<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = { ...props }
    for (const propName in mappedProps) {
      mappedProps[propName] = `&${props[propName]}`
    }
    return mappedProps
  }
  
  
  
  // --prop-name -> var(--prop-name)
  export function generatePropVar<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = { ...props }
    for (const propName in mappedProps) {
      mappedProps[propName] = `var(${props[propName]})`
    }
    return mappedProps
  }
  
  // --prop-name -> var(--prop-name, default)
  export function generatePropVarDefault<T extends string>(props: PropObject<T>): PropGenerator<T> {
    const mappedProps = { ...props } as unknown as PropGenerator<T>
    for (const propName in mappedProps) {
      mappedProps[propName] = (defolt: string) => `var(${props[propName]},${defolt})`
    }
    return mappedProps
  }
  
  
  
  // class -> .class
  export function generateElDotClass<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = { ...props }
    for (const propName in mappedProps) {
      mappedProps[propName] = `.${props[propName]}`
    }
    return mappedProps
  }
  
  // element-selector -> &element-selector
  export function generateElThis<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = { ...props }
    for (const propName in mappedProps) {
      mappedProps[propName] = `&${props[propName]}`
    }
    return mappedProps
  }
  
  
  
}
