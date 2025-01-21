import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import uncapitalize = StringU.uncapitalize
import lastI = ArrayU.lastI
import isobject = TypeU.isobject
import isnumber = TypeU.isnumber
import isArray = TypeU.isArray




export type StyleValue =
  | string // pass as is if there are no special values or transformations
  | number // transform to fractions or pixels
  | null // set empty value (background: none, color: transparent)
  | undefined // remove value definition



export type Transformer2 = AtomicTransformer2 | MultiTransformer2

export type AtomicTransformer2 =
  | MediaTransformer2
  | ElemTransformer2
  | PseudoTransformer2
  | AttrTransformer2
  | PropTransformer2
  | AttrValueTransformer2
  | PropValueTransformer2
export type MultiTransformer2 =
  | MultiStateTransformer2
  | MultiPropTransformer2

export type StateTransformer2 = MultiStateTransformer2 | PseudoTransformer2 | AtomicTransformer2

export type Transformer2List = (Transformer2 | Transformer2List)[][]



export interface MediaTransformer2 {
  readonly media: string
  readonly type: 'media'
  readonly isAtomic: true
}
export interface ElemTransformer2 {
  readonly elem: string
  readonly type: 'elem'
  readonly isAtomic: true
  readonly states?: Record<string, StateTransformer2> | undefined
  readonly props?: Record<string, PropTransformer2> | undefined
}
export interface PseudoTransformer2 {
  readonly pseudo: string
  readonly type: 'pseudo'
  readonly isAtomic: true
}
export interface AttrTransformer2 {
  readonly attr: string
  readonly type: 'attr'
  readonly isAtomic: true
  readonly values?: Record<string, any> | undefined
}
export interface PropTransformer2 {
  readonly prop: string
  readonly type: 'prop'
  readonly isAtomic: true
  readonly transformValue?: (value: StyleValue) => string | undefined
}


export interface MultiStateTransformer2 {
  readonly state: string
  readonly type: 'state'
  readonly isAtomic: false
  readonly values?: Record<string, any> | undefined
  readonly transform: (value?: string) => Transformer2List
}
export interface MultiPropTransformer2 {
  readonly prop: string
  readonly type: 'prop'
  readonly isAtomic: false
  readonly transform: (value: StyleValue) => Transformer2List
}


export interface AttrValueTransformer2 {
  readonly value: string
  readonly type: 'stateValue',
}
export interface PropValueTransformer2 {
  readonly value: StyleValue
  readonly type: 'propValue',
}




/*
 States order to select in CSS:
   normal - no selector
   checked / selected - :checked / :selected
   hover - :hover
   active - :active
   focus - :focus
   focusVisible - :focus-visible
   readOnly - :read-only
   disabled - :disabled
   error - [error]
 */

export const hoverableMedia = '(hover: hover) and (pointer: fine)'

namespace Medias2 {
  export const hoverable: MediaTransformer2 = {
    media: hoverableMedia, type: 'media', isAtomic: true,
  }
}
namespace Pseudos2 {
  export const hover: PseudoTransformer2 = {
    pseudo: 'hover', type: 'pseudo', isAtomic: true,
  }
  export const focus: PseudoTransformer2 = {
    pseudo: 'focus', type: 'pseudo', isAtomic: true,
  }
  export const focusVisible: PseudoTransformer2 = {
    pseudo: 'focus-visible', type: 'pseudo', isAtomic: true,
  }
}
namespace Attrs2 {
  export const type: AttrTransformer2 = {
    attr: 'type', type: 'attr', isAtomic: true,
    values: { radio: '', checkbox: '' },
  }
}
namespace Props2 {
  const transformLenValue = (value: StyleValue) => {
    if (value === undefined) return undefined
    if (value === null) value = 0
    if (value === 'full') value = '100%'
    if (isnumber(value)) value = `${value}px`
    return value
  }
  export const width: PropTransformer2 = {
    prop: 'width', type: 'prop', isAtomic: true,
    transformValue: transformLenValue,
  }
  export const height: PropTransformer2 = {
    prop: 'height', type: 'prop', isAtomic: true,
    transformValue: transformLenValue,
  }
  export const background: PropTransformer2 = {
    prop: 'background', type: 'prop', isAtomic: true,
  }
}
namespace ComplexTransformers2 {
  
  // just 'radio' instead of 'typeRadio'
  export const radio: MultiStateTransformer2 = {
    state: 'radio', type: 'state', isAtomic: false,
    transform: () => [
      [Attrs2.type, { type: 'stateValue', value: 'radio' }],
    ],
  }
  
  // hoverable AND hover
  export const hoverableHover: MultiStateTransformer2 = {
    state: 'hoverableHover', type: 'state', isAtomic: false,
    transform: () => [[Medias2.hoverable, Pseudos2.hover]],
  }
  
  // hover OR focusVisible
  export const inFocus: MultiStateTransformer2 = {
    state: 'inFocus', type: 'state', isAtomic: false,
    transform: () => [
      ...ComplexTransformers2.hoverableHover.transform(),
      [Pseudos2.focusVisible],
    ],
  }
  
  // width + height
  export const size: MultiPropTransformer2 = {
    prop: 'size', type: 'prop', isAtomic: false,
    transform: (value: StyleValue) => [
      [Props2.width, { type: 'propValue', value }],
      [Props2.height, { type: 'propValue', value }],
    ],
  }
  
}








export type WidgetStyle = { [selectorProp: string]: StyleValue | WidgetStyle }

type EntitiesRecord = Record<string, Transformer2>
type EntitiesRecordArray = Array<EntitiesRecord | undefined>


// slot indexes for context entities
const ctxCommonI = 0
const ctxElementsI = 1
const ctxStatesI = 2 // record of pseudoClasses, attrs
const ctxStateValuesI = 3 // record of attr values
const ctxElemPropI = 4 // record of elem props

export function transform1(
  style: WidgetStyle,
  baseContextStack: EntitiesRecordArray,
  dataList: Transformer2[][] = [],
  baseData: Transformer2[] = []
): Transformer2[][] {
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
            
            // found elem state (attr, pseudoClass)
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
            // found prop
            else if (entity.type === 'prop') {
              if (!isobject(value)) {
                data.push(entity)
                data.push({ value, type: 'propValue' })
                dataList.push(data)
              }
              break pLoop
            }
            // found state value (attr value)
            else if (ctxI === ctxStateValuesI) {
              data.push({ value: name, type: 'stateValue' })
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








export function transform2(
  dataList: Transformer2List,
  transformed: Transformer2[][] = [],
  baseMedia: MediaTransformer2[] = [],
  baseData: AtomicTransformer2[] = [],
): Transformer2[][] {
  dataList.forEach(data => {
    const m = [...baseMedia]
    const d = [...baseData]
    
    let state: MultiStateTransformer2 | AttrTransformer2 | undefined
    let prop: MultiPropTransformer2 | PropTransformer2 | undefined
    
    for (let dataI = 0; dataI < data.length; dataI++) {
      const entity = data[dataI]
      
      if (isArray(entity)) {
        return transform2(
          entity.map(e => [...e, ...data.slice(dataI + 1)]),
          transformed, m, d
        )
      }
      
      const processState = (value?: string) => {
        if (state) {
          if (state.type === 'attr') {
            const stateData: AtomicTransformer2[] = [state]
            if (value) stateData.push({ value, type: 'stateValue' })
            d.push(...stateData)
          }
          else if (state.type === 'state') {
            const nextI = entity.type === 'stateValue' ? dataI + 1 : dataI
            return transform2(
              state.transform(value).map(e => [...e, ...data.slice(nextI)]),
              transformed, m, d
            )
          }
        }
      }
      
      if (entity.type === 'media') {
        m.push(entity)
      }
      else if (entity.type === 'elem') {
        if (processState()) return
        d.push(entity)
        state = undefined
        prop = undefined
      }
      else if (entity.type === 'attr' || entity.type === 'state') {
        if (processState()) return
        state = entity
        prop = undefined
      }
      else if (entity.type === 'pseudo') {
        if (processState()) return
        d.push(entity)
        state = undefined
        prop = undefined
      }
      else if (entity.type === 'stateValue') {
        if (processState(entity.value)) return
        state = undefined
        prop = undefined
      }
      else if (entity.type === 'prop') {
        if (processState()) return
        state = undefined
        prop = entity
      }
      else if (entity.type === 'propValue') {
        if (prop) {
          if (prop.isAtomic) {
            d.push(prop, entity)
          }
          else {
            return transform2(
              prop.transform(entity.value).map(e => [...e, ...data.slice(dataI + 1)]),
              transformed, m, d
            )
          }
        }
        state = undefined
        prop = undefined
      }
      
      // last must be value after prop so no need to check 'state' & 'prop'
      if (dataI === data.length - 1) transformed.push([...m, ...d])
    }
  })
  
  return transformed
}




const CommonProps2 = {
  width: Props2.width,
  w: Props2.width,
  height: Props2.height,
  h: Props2.height,
  size: ComplexTransformers2.size,
  sz: ComplexTransformers2.size,
  background: Props2.background,
  bg: Props2.background,
}
const CommonStates2 = {
  type: Attrs2.type,
  radio: ComplexTransformers2.radio,
  hover: ComplexTransformers2.hoverableHover,
  focus: Pseudos2.focus,
  focusVisible: Pseudos2.focusVisible,
  inFocus: ComplexTransformers2.inFocus,
}
const Elements2 = {
  frame: {
    elem: 'frame', type: 'elem', isAtomic: true,
    states: CommonStates2,
  } satisfies ElemTransformer2,
  box: {
    elem: 'box', type: 'elem', isAtomic: true,
    states: {
      hover: ComplexTransformers2.hoverableHover,
      focus: Pseudos2.focus,
    },
  } satisfies ElemTransformer2,
}
const RootElemStates2 = {
  type: Attrs2.type,
  hover: ComplexTransformers2.hoverableHover,
  focus: Pseudos2.focus,
  focusVisible: Pseudos2.focusVisible,
}



export function testWidget51Transform() {
  const widgetStyle = {
    hoverTypeRadioBg: 'white',
    frameTypeCheckboxBoxSz: '40%',
    frameRadioBg: 'indianred',
    frameRadioBoxHoverFocusBg: 'aquamarine',
    typeRadio: {
      bg: 'black',
      sz: 100,
    },
    type: {
      checkbox: {
        bg: 'red',
        sz: 200,
      },
      radio: {
        bg: 'green',
        sz: 'full',
      },
    },
  }
  console.log('widgetStyle', widgetStyle)
  
  const transformed1 = transform1(
    widgetStyle,
    [CommonProps2, Elements2, RootElemStates2, undefined, undefined]
  )
  console.log('transformed1', transformed1)
  
  const transformed2 = transform2(transformed1)
  console.log('transformed2', transformed2)
}
