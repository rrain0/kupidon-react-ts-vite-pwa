import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import uncapitalize = StringU.uncapitalize
import lastI = ArrayU.lastI
import isobject = TypeU.isobject
import isnumber = TypeU.isnumber




export type StyleValue =
  | string // pass as is if there are no special values or transformations
  | number // transform to fractions or pixels
  | null // set empty value (background: none, color: transparent)
  | undefined // remove value definition




export interface MediaTransformer1 {
  readonly media: string
  readonly type: 'media'
  readonly isAtomic: true
}
export interface ElemTransformer1 {
  readonly className: string
  readonly type: 'elem'
  readonly isAtomic: true
  readonly states?: Record<string, AnyStateTransformer1> | undefined
  readonly props?: Record<string, PropTransformer1> | undefined
  readonly upSelector?: string | undefined
  readonly upElem?: ElemTransformer1 | undefined
}
export interface PseudoElemTransformer1 {
  readonly pseudoElem: string
  readonly type: 'pseudoElem'
  readonly isAtomic: true
}
export interface PseudoTransformer1 {
  readonly pseudo: string
  readonly type: 'pseudo'
  readonly isAtomic: true
}
export interface AttrTransformer1 {
  readonly attr: string
  readonly type: 'attr'
  readonly isAtomic: true
  readonly values?: Record<string, any> | undefined
}
export interface PropTransformer1 {
  readonly prop: string
  readonly type: 'prop'
  readonly isAtomic: true
  readonly transformValue?: (propValue: StyleValue) => string | undefined
}


export interface MultiWidgetTransformer1 {
  readonly name: string
  readonly type: 'widget'
  readonly isAtomic: false
  readonly states?: Record<string, AnyStateTransformer1> | undefined
  readonly values?: Record<string, any> | undefined
  readonly props?: Record<string, PropTransformer1> | undefined
  readonly transform: () => Transformer1List
}
export interface MultiStateTransformer1 {
  readonly state: string
  readonly type: 'state'
  readonly isAtomic: false
  readonly values?: Record<string, any> | undefined
  readonly transform: (stateValue?: string) => Transformer1List
}
export interface MultiPropTransformer1 {
  readonly prop: string
  readonly type: 'prop'
  readonly isAtomic: false
  readonly transform: (propValue: StyleValue) => Transformer1List
}


export interface StateValueTransformer1 {
  readonly value: string
  readonly type: 'stateValue',
}
export interface PropValueTransformer1 {
  readonly value: StyleValue
  readonly type: 'propValue',
}



export type AtomicTransformer1 =
  | MediaTransformer1
  | ElemTransformer1
  | PseudoElemTransformer1
  | PseudoTransformer1
  | AttrTransformer1
  | PropTransformer1
  | StateValueTransformer1
  | PropValueTransformer1

export type MultiTransformer1 =
  | MultiWidgetTransformer1
  | MultiStateTransformer1
  | MultiPropTransformer1


export type Transformer1 = AtomicTransformer1 | MultiTransformer1
export type Transformer1List = (Transformer1 | Transformer1List)[][]


export type AnyStateTransformer1 =
  | PseudoElemTransformer1
  | PseudoTransformer1
  | AttrTransformer1
  | MultiStateTransformer1

export type AnyPropTransformer1 =
  | PropTransformer1
  | MultiPropTransformer1





export const hoverableMedia = '(hover: hover) and (pointer: fine)'

export namespace Medias1 {
  export const hoverable: MediaTransformer1 = {
    media: hoverableMedia, type: 'media', isAtomic: true,
  }
}
export namespace PseudoElements1 {
  export const before: PseudoElemTransformer1 = {
    pseudoElem: 'before', type: 'pseudoElem', isAtomic: true,
  }
  export const after: PseudoElemTransformer1 = {
    pseudoElem: 'after', type: 'pseudoElem', isAtomic: true,
  }
}
export namespace Pseudos1 {
  export const checked: PseudoTransformer1 = {
    pseudo: 'checked', type: 'pseudo', isAtomic: true,
  }
  export const selected: PseudoTransformer1 = {
    pseudo: 'selected', type: 'pseudo', isAtomic: true,
  }
  export const hover: PseudoTransformer1 = {
    pseudo: 'hover', type: 'pseudo', isAtomic: true,
  }
  export const active: PseudoTransformer1 = {
    pseudo: 'active', type: 'pseudo', isAtomic: true,
  }
  export const focus: PseudoTransformer1 = {
    pseudo: 'focus', type: 'pseudo', isAtomic: true,
  }
  export const focusVisible: PseudoTransformer1 = {
    pseudo: 'focus-visible', type: 'pseudo', isAtomic: true,
  }
  export const readOnly: PseudoTransformer1 = {
    pseudo: 'read-only', type: 'pseudo', isAtomic: true,
  }
  export const disabled: PseudoTransformer1 = {
    pseudo: 'disabled', type: 'pseudo', isAtomic: true,
  }
}
export namespace Attrs1 {
  export const type: AttrTransformer1 = {
    attr: 'type', type: 'attr', isAtomic: true,
    values: { radio: '', checkbox: '' },
  }
  export const error: AttrTransformer1 = {
    attr: 'data-error', type: 'attr', isAtomic: true,
  }
}
export namespace Props1 {
  const transformLenValue = (value: StyleValue) => {
    if (value === undefined) return undefined
    if (value === null) value = 0
    if (value === 'full') value = '100%'
    if (isnumber(value)) value = `${value}px`
    return value
  }
  export const width: PropTransformer1 = {
    prop: 'width', type: 'prop', isAtomic: true,
    transformValue: transformLenValue,
  }
  export const height: PropTransformer1 = {
    prop: 'height', type: 'prop', isAtomic: true,
    transformValue: transformLenValue,
  }
  export const background: PropTransformer1 = {
    prop: 'background', type: 'prop', isAtomic: true,
  }
}
export namespace ComplexTransformers1 {
  
  // just 'radio' instead of 'typeRadio'
  export const radio: MultiStateTransformer1 = {
    state: 'radio', type: 'state', isAtomic: false,
    transform: () => [
      [Attrs1.type, { type: 'stateValue', value: 'radio' }],
    ],
  }
  
  // hoverable AND hover
  export const hoverableHover: MultiStateTransformer1 = {
    state: 'hoverableHover', type: 'state', isAtomic: false,
    transform: () => [[Medias1.hoverable, Pseudos1.hover]],
  }
  
  // hover OR focusVisible
  export const inFocus: MultiStateTransformer1 = {
    state: 'inFocus', type: 'state', isAtomic: false,
    transform: () => [
      ...ComplexTransformers1.hoverableHover.transform(),
      [Pseudos1.focusVisible],
    ],
  }
  
  // width + height
  export const size: MultiPropTransformer1 = {
    prop: 'size', type: 'prop', isAtomic: false,
    transform: (value: StyleValue) => [
      [Props1.width, { type: 'propValue', value }],
      [Props1.height, { type: 'propValue', value }],
    ],
  }
  
}








export type WidgetStyle = { [selectorProp: string]: StyleValue | WidgetStyle }

export type EntitiesRecord = Record<string, Transformer1>
export type EntitiesRecordArray = Array<EntitiesRecord | undefined>


// slot indexes for context entities
const ctxCommonI = 0
const ctxElementsI = 1
const ctxStatesI = 2 // record of pseudoClasses, attrs
const ctxStateValuesI = 3 // record of attr values
const ctxElemPropI = 4 // record of elem props

export function transform1(
  style: WidgetStyle,
  baseContextStack: EntitiesRecordArray,
  dataList: Transformer1[][] = [],
  baseData: Transformer1[] = []
): Transformer1[][] {
  for (const [selectProp, value] of Object.entries(style)) {
    const contextStack = [...baseContextStack]
    const data = [...baseData]
    let p = selectProp
    
    pLoop: while (true) {
      if (!p) {
        if (isobject(value)) {
          dataList = transform1(value, contextStack, dataList, data)
        }
        break
      }
      p = uncapitalize(p)
      
      for (let ctxI = lastI(contextStack); ctxI >= 0; ctxI--) {
        const context = contextStack[ctxI]
        if (context) for (const [name, entity] of Object.entries(context)) {
          // TODO split 'p' by capital letters and check using 'in' operator
          
          if (p.startsWith(name)) {
            p = p.slice(name.length)
            
            // found widget transformer
            if (entity.type === 'widget') {
              data.push(entity)
              contextStack[ctxStatesI] = entity.states
              contextStack[ctxStateValuesI] = entity.values
              contextStack[ctxElemPropI] = entity.props
            }
            // found elem
            if (entity.type === 'elem') {
              data.push(entity)
              contextStack[ctxStatesI] = entity.states
              contextStack[ctxStateValuesI] = undefined
              contextStack[ctxElemPropI] = entity.props
            }
            // found elem state (multistate, attr, pseudoClass)
            else if (entity.type === 'state' || entity.type === 'attr') {
              data.push(entity)
              contextStack[ctxStateValuesI] = entity.values
            }
            // found elem state (pseudoClass)
            else if (entity.type === 'pseudo') {
              data.push(entity)
              contextStack[ctxStateValuesI] = undefined
            }
            // found elem state (pseudoElement)
            else if (entity.type === 'pseudoElem') {
              data.push(entity)
              contextStack[ctxStateValuesI] = undefined
            }
            // found state value (attr value)
            else if (ctxI === ctxStateValuesI) {
              data.push({ value: name, type: 'stateValue' })
            }
            // found prop
            else if (entity.type === 'prop') {
              if (!isobject(value)) {
                data.push(entity)
                data.push({ value, type: 'propValue' })
                dataList.push(data)
              }
              break pLoop
            }
            
            continue pLoop
          }
        }
      }
      
      throw new Error(`Unknown property: ${p}`)
    }
  }
  
  return dataList
}

