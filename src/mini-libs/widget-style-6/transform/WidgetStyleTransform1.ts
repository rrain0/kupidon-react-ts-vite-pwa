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




export interface WidgetMedia {
  readonly media: string
  readonly type: 'media'
  readonly isAtomic: true
}
export interface WidgetElem {
  readonly className: string
  readonly type: 'elem'
  readonly isAtomic: true
  readonly states?: Record<string, WidgetAnyStateTransformer> | undefined
  readonly props?: Record<string, WidgetProp> | undefined
  readonly upSelector?: string | undefined
  readonly upElem?: WidgetElem | undefined
}
export interface WidgetPseudoElem {
  readonly pseudoElem: string
  readonly type: 'pseudoElem'
  readonly isAtomic: true
}
export interface WidgetPseudo {
  readonly pseudo: string
  readonly type: 'pseudo'
  readonly isAtomic: true
}
export interface WidgetAttr {
  readonly attr: string
  readonly type: 'attr'
  readonly isAtomic: true
  readonly values?: Record<string, any> | undefined
}
export interface WidgetProp {
  readonly prop: string
  readonly type: 'prop'
  readonly isAtomic: true
  readonly transformValue?: (propValue: StyleValue) => string | undefined
}


export interface WidgetMultiAnyTransformer {
  readonly name: string
  readonly type: 'widget'
  readonly isAtomic: false
  readonly states?: Record<string, WidgetAnyStateTransformer> | undefined
  readonly values?: Record<string, any> | undefined
  readonly props?: Record<string, WidgetProp> | undefined
  readonly transform: () => WidgetTransformerList
}
export interface WidgetMultiStateTransformer {
  readonly state: string
  readonly type: 'state'
  readonly isAtomic: false
  readonly values?: Record<string, any> | undefined
  readonly transform: (stateValue?: string) => WidgetTransformerList
}
export interface WidgetMultiPropTransformer {
  readonly prop: string
  readonly type: 'prop'
  readonly isAtomic: false
  readonly transform: (propValue: StyleValue) => WidgetTransformerList
}


export interface WidgetStateValue {
  readonly value: string
  readonly type: 'stateValue',
}
export interface WidgetPropValue {
  readonly value: StyleValue
  readonly type: 'propValue',
}



export type WidgetAtomicTransformer =
  | WidgetMedia
  | WidgetElem
  | WidgetPseudoElem
  | WidgetPseudo
  | WidgetAttr
  | WidgetProp
  | WidgetStateValue
  | WidgetPropValue

export type WidgetMultiTransformer =
  | WidgetMultiAnyTransformer
  | WidgetMultiStateTransformer
  | WidgetMultiPropTransformer


export type WidgetTransformer = WidgetAtomicTransformer | WidgetMultiTransformer
export type WidgetTransformerList = (WidgetTransformer | WidgetTransformerList)[][]


export type WidgetAnyStateTransformer =
  | WidgetPseudoElem
  | WidgetPseudo
  | WidgetAttr
  | WidgetMultiStateTransformer

export type WidgetAnyPropTransformer =
  | WidgetProp
  | WidgetMultiPropTransformer





export const hoverableMedia = '(hover: hover) and (pointer: fine)'

export namespace WidgetMedias {
  export const hoverable: WidgetMedia = {
    media: hoverableMedia, type: 'media', isAtomic: true,
  }
}
export namespace WidgetPseudoElements {
  export const before: WidgetPseudoElem = {
    pseudoElem: 'before', type: 'pseudoElem', isAtomic: true,
  }
  export const after: WidgetPseudoElem = {
    pseudoElem: 'after', type: 'pseudoElem', isAtomic: true,
  }
}
export namespace WidgetPseudos {
  export const checked: WidgetPseudo = {
    pseudo: 'checked', type: 'pseudo', isAtomic: true,
  }
  export const selected: WidgetPseudo = {
    pseudo: 'selected', type: 'pseudo', isAtomic: true,
  }
  export const hover: WidgetPseudo = {
    pseudo: 'hover', type: 'pseudo', isAtomic: true,
  }
  export const active: WidgetPseudo = {
    pseudo: 'active', type: 'pseudo', isAtomic: true,
  }
  export const focus: WidgetPseudo = {
    pseudo: 'focus', type: 'pseudo', isAtomic: true,
  }
  export const focusVisible: WidgetPseudo = {
    pseudo: 'focus-visible', type: 'pseudo', isAtomic: true,
  }
  export const readOnly: WidgetPseudo = {
    pseudo: 'read-only', type: 'pseudo', isAtomic: true,
  }
  export const disabled: WidgetPseudo = {
    pseudo: 'disabled', type: 'pseudo', isAtomic: true,
  }
}
export namespace WidgetAttrs {
  export const type: WidgetAttr = {
    attr: 'type', type: 'attr', isAtomic: true,
    values: { radio: '', checkbox: '' },
  }
  export const error: WidgetAttr = {
    attr: 'data-error', type: 'attr', isAtomic: true,
  }
}
export namespace WidgetProps {
  const transformLenValue = (value: StyleValue) => {
    if (value === undefined) return undefined
    if (value === null) value = 0
    if (value === 'full') value = '100%'
    if (isnumber(value)) value = `${value}px`
    return value
  }
  export const width: WidgetProp = {
    prop: 'width', type: 'prop', isAtomic: true,
    transformValue: transformLenValue,
  }
  export const height: WidgetProp = {
    prop: 'height', type: 'prop', isAtomic: true,
    transformValue: transformLenValue,
  }
  export const background: WidgetProp = {
    prop: 'background', type: 'prop', isAtomic: true,
  }
}
export namespace WidgetComplexTransformers {
  
  // just 'radio' instead of 'typeRadio'
  export const radio: WidgetMultiStateTransformer = {
    state: 'radio', type: 'state', isAtomic: false,
    transform: () => [
      [WidgetAttrs.type, { type: 'stateValue', value: 'radio' }],
    ],
  }
  
  // hoverable AND hover
  export const hoverableHover: WidgetMultiStateTransformer = {
    state: 'hoverableHover', type: 'state', isAtomic: false,
    transform: () => [[WidgetMedias.hoverable, WidgetPseudos.hover]],
  }
  
  // hover OR focusVisible
  export const inFocus: WidgetMultiStateTransformer = {
    state: 'inFocus', type: 'state', isAtomic: false,
    transform: () => [
      ...WidgetComplexTransformers.hoverableHover.transform(),
      [WidgetPseudos.focusVisible],
    ],
  }
  
  // width + height
  export const size: WidgetMultiPropTransformer = {
    prop: 'size', type: 'prop', isAtomic: false,
    transform: (value: StyleValue) => [
      [WidgetProps.width, { type: 'propValue', value }],
      [WidgetProps.height, { type: 'propValue', value }],
    ],
  }
  
}








export type WidgetStyle = { [selectorProp: string]: StyleValue | WidgetStyle }

export type EntitiesRecord = Record<string, WidgetTransformer>
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
  dataList: WidgetTransformer[][] = [],
  baseData: WidgetTransformer[] = []
): WidgetTransformer[][] {
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

