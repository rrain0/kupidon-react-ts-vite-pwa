import { css } from '@emotion/react'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
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
    const Es extends RecordRo<string, CssWidgetElement<any, any>>,
    const S extends string,
  > {
    
    constructor(
      readonly root: NoInfer<ObjectU.ObjectKeysType<Es>>,
      readonly states: RecordRo<S, CssWidgetState>,
      readonly elements: Es,
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
    <
      const E extends string,
      const S extends string,
      const Ps extends RecordRo<string, CssProp>
    >
    (elementName: E, element: Elem<S, Ps>): CssWidget< RecordRo<E, CssWidgetElement<S, Ps>>, S > {
      return new CssWidget< RecordRo<E, CssWidgetElement<S, Ps>>, S >(
        elementName,
        {
          ...ObjectMap<any, any>(
            element.states,
            ([stateName, cssState]) => [
              stateName,
              new CssWidgetState(elementName, cssState),
            ]
          ),
        } as unknown as RecordRo<S, CssWidgetState>,
        {
          [elementName]: new CssWidgetElement(element),
        } as unknown as RecordRo<E, CssWidgetElement<S, Ps>>,
      )
    }
    
    add<
      const NE extends Exclude<string, ObjectU.ObjectKeysType<Es>>,
      const NS extends Exclude<string, S>,
      const NPs extends Record<string, CssProp>,
    >(
      up: ObjectU.ObjectKeysType<Es>,
      selector: string,
      elementName: NE,
      element: Elem<NS, NPs>
    ): CssWidget<Es & RecordRo<NE, CssWidgetElement<NS, NPs>>, S | NS> {
      return new CssWidget<Es & RecordRo<NE, CssWidgetElement<NS, NPs>>, S | NS>(
        this.root,
        {
          ...this.states,
          ...ObjectMap<any, any>(
            element.states,
            ([stateName, cssState]) => [
              stateName,
              new CssWidgetState(elementName, cssState),
            ]
          ),
        } as unknown as RecordRo<S | NS, CssWidgetState>,
        {
          ...this.elements,
          [elementName]: new CssWidgetElement(element, up, selector),
        } as unknown as Es & RecordRo<NE, CssWidgetElement<NS, NPs>>,
      )
    }
  
  }
  
  
  export class UseCssWidget<
    const Es extends RecordRo<string, CssWidgetElement<any, any>>,
    const S extends string,
  > {
    
    readonly s: RecordRo<S, () => UseCssWidget<Es, S>>
    readonly e: RecordRo<ObjectU.ObjectKeysType<Es>, () => UseCssWidget<Es, S>>
    
    currState: S | null = null
    currElem: ObjectU.ObjectKeysType<Es> | null = null
    
    constructor(
      readonly widget: CssWidget<Es, S>,
    ) {
      this.s = ObjectMap(widget.states, ([name]) => [
        name,
        () => {
          this.currState = name
          return this
        },
      ])
      this.e = ObjectMap<any, any>(widget.elements, ([name]) => [
        name,
        () => {
          this.currElem = name
          return this
        },
      ]) as unknown as RecordRo<ObjectU.ObjectKeysType<Es>, () => UseCssWidget<Es, S>>
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
              endName = end().upElementName as ObjectU.ObjectKeysType<Es>
            }
            
            if (stateSelector) {
              selector = `:has(${stateSelector}${s.use})` + selector
              stateWasApplied = true
            }
          }
        }
        
        selector = e().use + selector
        eName = e().upElementName as ObjectU.ObjectKeysType<Es>
      }
      
      return selector
    }
    
    get thisUse() {
      return `&${this.use}`
    }
  }
  
  
  export class CssWidgetElement<
    const S extends string,
    const Ps extends Record<string, CssProp>,
  > {
    
    constructor(
      readonly element: Elem<S, Ps>,
      // '' if this element is root
      readonly upElementName = '',
      readonly upSelector = '',
    ) { }
    
    // get element
    get e() { return this.element }
    
    // get element props
    get p() { return this.element.props }
    
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
  
  
  
  export class Elem<
    const S extends string,
    const Ps extends Record<string, CssProp>,
  > {
    
    constructor(
      // classname
      // 'rrainuiButton'
      readonly name: string,
      readonly states: Record<S, CssState>,
      readonly props: Ps,
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
    
  }

  
  
  
  export class CssProp {
    constructor(
      // full prop name
      // '--color'
      readonly name: string
    ) { }
    
    // --prop: value;
    protected setAny(value: string): string {
      return `${this.name}: ${value};`
    }
    // var(--prop);
    // var(--prop, defaultValue);
    protected getAny(defaultValue?: string): string {
      const nameAndDefault = [this.name]
      if (exists(defaultValue)) nameAndDefault.push(defaultValue)
      return `var(${nameAndDefault.join(', ')})`
    }
    
    // can use generics inside inheritance
    // --prop: value;
    set(value: string): string {
      return this.setAny(value)
    }
    // can use generics inside inheritance
    // var(--prop);
    // var(--prop, defaultValue);
    get(defaultValue?: string): string {
      return this.getAny(defaultValue)
    }
    
    
    static readonly color = new class extends CssProp {
      // --color: value; color: value;
      protected override setAny(value: string): string {
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
    override get(defaultValue?: V[number]): string {
      return this.getAny(defaultValue)
    }
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
      ${Prop.prop.name}: ${Prop.prop.get()};
      // --prop: var(--prop, default-value);
      ${Prop.prop.name}: ${Prop.prop.get('default-value')};
      
      // --prop-enum: black;
      ${Prop.propEnum.set('black')};
      // --prop-enum: black;
      ${Prop.propEnum.name}: black;
      // --prop-enum: var(--prop-enum);
      ${Prop.propEnum.name}: ${Prop.propEnum.get()};
      // --prop-enum: var(--prop-enum, default-value);
      ${Prop.propEnum.name}: ${Prop.propEnum.get('default-value')};
    `
  }
  
  
  
  
}
