import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef
import isObject = ObjectUtils.isObject
import isstring = TypeUtils.isstring
import SingleOrArr = ArrayUtils.SingleOrArr




export namespace CommonStyle {
  
  
  
  import exists = TypeUtils.exists
  
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
    static readonly disabled = new Pseudo('disabled')
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
      this.values.forEach(value=>{
        attrState[value] = new DataAttr(`${this.rawName}=${value}`,[])
      })
      this.s = attrState
    }
    
    
    static readonly error = new DataAttr('error',[])
  }
  
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
    elem: Elem<any,any> | 'root',
    state: S[],
  }
  
  
  export type ElemStateDescriptor<S extends string>
    = Record<S, SingleOrArr<Pseudo | DataAttr<any>>>
  
  
  export class Elem<S extends string, RootS extends string = S> {
    #up: Elem<any,any> | undefined
    get up(){ return this.#up }
    upSelector = ''
    
    name: string
    states: ElemStateDescriptor<S>
    
    constructor(
      name: string,
      states: ElemStateDescriptor<S>
    ) {
      this.name = name
      this.states = states
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
    
    
    upFor<Down extends string>(selector: string, down: Elem<Down,any>): Elem<Down,RootS> {
      const newDown = new Elem<Down,RootS>(down.name, down.states)
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
  
  
  
  
  
  
  
  
  
  export type CssPropState<V extends readonly string[]>
    = Record<V[number], CssProp<any>>
  
  export class CssProp<const V extends readonly string[]> {
    readonly rawName: string
    readonly name: string
    
    readonly values: V
    
    //readonly s: PropState<V>
    
    constructor(rawName: string, values: V) {
      this.rawName = rawName
      this.name = `--${this.rawName}`
      this.values = values
      
      /* const propState = {} as PropState<V>
      this.values.forEach(value=>{
        propState[value] = new Prop(`${this.rawName}=${value}`,[])
      })
      this.s = propState */
    }
    
    sel(defaultValue?: string): string {
      const values = [this.name]
      if (exists(defaultValue)) values.push(defaultValue)
      return `var(${values.join(',')})`
    }
    
    
    static readonly color = new CssProp('color',[])
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