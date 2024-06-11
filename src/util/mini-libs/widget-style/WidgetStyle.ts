import { css } from '@emotion/react'
import { ArrayUtils } from 'src/util/common/ArrayUtils.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import PartialUndef = TypeUtils.PartialUndef
import isObject = TypeUtils.isobject
import isstring = TypeUtils.isstring
import SingleOrArr = ArrayUtils.SingleOrArr
import exists = TypeUtils.exists




export namespace WidgetStyle {
  
  
  
  
  // NEW
  {
    class CssWidget {
    
    }
  }
  
  
  
  
  
  
  
  
  
  export class Pseudo {
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
    
    
    
    static readonly empty = new Pseudo('')
    static readonly hover = new Pseudo('hover')
    static readonly active = new Pseudo('active')
    static readonly focus = new Pseudo('focus')
    static readonly focusVisible = new Pseudo('focus-visible')
    static readonly checked = new Pseudo('checked')
    static readonly disabled = new Pseudo('disabled')
  }
  // todo remove
  export const PseudoEmpty = new Pseudo('')
  export const PseudoHover = new Pseudo('hover')
  export const PseudoActive = new Pseudo('active')
  export const PseudoFocus = new Pseudo('focus')
  export const PseudoFocusVisible = new Pseudo('focus-visible')
  export const PseudoDisabled = new Pseudo('disabled')
  
  
  
  
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
      this.values.forEach(value=>{
        attrState[value] = new DataAttr(`${this.rawName}=${value}`,[])
      })
      this.s = attrState
    }
    
    
    static readonly error = new DataAttr('error',[])
  }
  // todo remove
  export const DataAttrError = new DataAttr('error',[])
  
  /* { // attr test
    const AttrDirection = new DataAttr('direction',['vertical','horizontal'])
    console.log('AttrDirection',AttrDirection)
    
    const isHorizontalDirection = AttrDirection.s.horizontal.sel
    const isVerticalDirection = AttrDirection.s.vertical.sel
    console.log('isHorizontalDirection',isHorizontalDirection)
    console.log('isVerticalDirection',isVerticalDirection)
  } */
  
  
  
  
  
  export function combineStates(...states: (Pseudo|DataAttr<any>)[]): Pseudo {
    if (states.length===0) return Pseudo.empty
    if (states.length===1) return states[0]
    return new Pseudo(`is(${states.map(it=>it.sel).join(',')})`)
  }
  
  
  
  
  
  export type StateForElem<S extends string> = {
    elem: Elem<any,any,any> | 'root',
    state: S[],
  }
  
  
  export type ElemStateDescriptor<S extends string>
    = Record<S, SingleOrArr<Pseudo | DataAttr<any>>>
  
  
  export class Elem
  <
    S extends string,
    RootS extends string = S,
    P extends Record<string, CssProp> = Record<string, never>
  >
  {
    #up: Elem<any,any,any> | undefined
    get up(){ return this.#up }
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
      const restState = state.filter(it=>{
        if (isstring(it)){
          if (applyStrings && it in this.states){
            statesSet.add(it as S)
            return false
          }
        }
        else if (isObject(it)){
          if (this===it.elem || (it.elem==='root' && applyRoot)){
            it.state.forEach(it=>{
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
      return '.'+this.name + combineStates(...thisState.flatMap(it=> this.states[it])).sel
    }
    
    sel(...state: (RootS | StateForElem<any> | StateForElem<S>)[]): string {
      const [thisState, restState] = this.extractThisState(!this.#up, !this.#up, ...state)
      const thisSelector = '.'+this.name
        + combineStates(...thisState.flatMap(it=>this.states[it])).sel
      const upSelector = this.up?.sel(...restState) ?? ''
      return upSelector+this.upSelector+thisSelector
    }
    thiz(...state: (RootS | StateForElem<any> | StateForElem<S>)[]): string {
      return '&'+this.sel(...state)
    }
    
    
    toElem<Down extends string, DownP extends Record<string, CssProp>>
    (selector: string, down: Elem<Down,any,DownP>): Elem<Down,RootS,DownP> {
      const newDown = new Elem<Down,RootS,DownP>(down.name, down.states, down.props)
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
  
  
  
  
  
  
  
  export class CssProp {
    readonly name: string
    
    constructor(name: string) {
      this.name = name
    }
    
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
  
  export const CssPropColor = new class extends CssProp {
    override setAny(value: string): string {
      return `${super.setAny(value)} color: ${value};`
    }
  }('--color')
  
  
  
  
  { // CssProp EXAMPLE
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // todo REMOVE
  
  export namespace Attr0 {
    export const attr = {
      error: 'data-error'
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
  
  
  
  export type PropObject<T extends string> = Record<T,string>
  export type PropGenerator<T extends string> = Record<T,(value:string)=>string>
  
  
  
  // attr-name -> [attr-name]
  export function generateAttrSelector<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `[${props[propName]}]`
    }
    return mappedProps
  }
  
  // [attr-name] -> &[attr-name]
  export function generateAttrThisSelector<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `&${props[propName]}`
    }
    return mappedProps
  }
  
  
  
  // --prop-name -> var(--prop-name)
  export function generatePropVar<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `var(${props[propName]})`
    }
    return mappedProps
  }
  
  // --prop-name -> var(--prop-name, default)
  export function generatePropVarDefault<T extends string>(props: PropObject<T>): PropGenerator<T> {
    const mappedProps = {...props} as unknown as PropGenerator<T>
    for (const propName in mappedProps) {
      mappedProps[propName] = (defolt: string)=>`var(${props[propName]},${defolt})`
    }
    return mappedProps
  }
  
  
  
  // class -> .class
  export function generateElDotClass<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `.${props[propName]}`
    }
    return mappedProps
  }
  
  // element-selector -> &element-selector
  export function generateElThis<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `&${props[propName]}`
    }
    return mappedProps
  }
  
  
  
}