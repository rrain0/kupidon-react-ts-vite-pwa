import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { StyleValue, WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import uncapitalize = StringU.uncapitalize
import lastI = ArrayU.lastI
import isobject = TypeU.isobject
import isnumber = TypeU.isnumber
import camelCaseToKebabCase = StringU.camelCaseToKebabCase
import RecordRo = TypeU.RecordRo
import isArray = TypeU.isArray






export type TransformPropValue = (propValue: StyleValue) => StyleValue


export class WidgetMedia {
  readonly type = 'media' as const
  readonly isAtomic = true as const
  
  constructor(readonly media: string) { }
  
  static ofQuery(query: string) {
    return new WidgetMedia(query)
  }
  
}

export class WidgetElem<const out Ps extends RecordRo<string, WidgetProp> = any> {
  readonly type = 'elem' as const
  readonly isAtomic = true as const
  
  constructor(
    readonly className: string,
    readonly states?: Record<string, WidgetAnyStateTransformer> | undefined,
    readonly props?: Ps | undefined,
    readonly upSelector?: string | undefined,
    readonly upElem?: WidgetElem | undefined,
  ) { }
  
  static of<const Ps extends RecordRo<string, WidgetProp>>(params: {
    className: string,
    states?: Record<string, WidgetAnyStateTransformer> | undefined,
    props?: Ps | undefined,
    upSelector?: string | undefined,
    upElem?: WidgetElem | undefined,
  }): WidgetElem<Ps> {
    return new WidgetElem<Ps>(
      params.className, params.states, params.props, params.upSelector, params.upElem
    )
  }
  
  get n() { return this.className }
  get ps() { return this.props }
}

export class WidgetPseudoElem {
  readonly type = 'pseudoElem' as const
  readonly isAtomic = true as const
  
  constructor(readonly pseudoElem: string) { }
  
  static ofName(name: string) {
    return new WidgetPseudoElem(name)
  }
}

export class WidgetPseudo {
  readonly type = 'pseudo' as const
  readonly isAtomic = true as const
  
  constructor(readonly pseudo: string) { }
  
  static ofName(name: string) {
    return new WidgetPseudo(name)
  }
}

export class WidgetAttr {
  readonly type = 'attr' as const
  readonly isAtomic = true as const
  
  constructor(
    readonly attr: string,
    readonly values?: Record<string, any> | undefined,
  ) { }
  
  static of(name: string, values?: Record<string, any> | undefined) {
    return new WidgetAttr(name, values)
  }
}

export class WidgetProp {
  readonly type = 'prop' as const
  readonly isAtomic = true as const
  
  constructor(
    readonly prop: string,
    readonly transformValue?: TransformPropValue | undefined,
  ) { }
  
  static ofName(name: string, transformValue?: TransformPropValue | undefined) {
    return new WidgetProp(name, transformValue)
  }
  
  get n() { return this.prop }
}



export class WidgetMultiAnyTransformer {
  readonly type = 'widget' as const
  readonly isAtomic = false as const
  
  constructor(
    readonly transform: () => WidgetTransformerList,
    readonly title?: string | undefined,
    readonly states?: Record<string, WidgetAnyStateTransformer> | undefined,
    readonly values?: Record<string, any> | undefined,
    readonly props?: Record<string, WidgetProp> | undefined,
  ) { }
  
  static of(params: {
    transform: () => WidgetTransformerList,
    title?: string | undefined,
    states?: Record<string, WidgetAnyStateTransformer> | undefined,
    values?: Record<string, any> | undefined,
    props?: Record<string, WidgetProp> | undefined,
  }) {
    return new WidgetMultiAnyTransformer(
      params.transform, params.title, params.states, params.values, params.props,
    )
  }
}

export class WidgetMultiStateTransformer {
  readonly type = 'state' as const
  readonly isAtomic = false as const
  
  constructor(
    readonly transform: (stateValue?: string) => WidgetTransformerList,
    readonly title?: string | undefined,
    readonly values?: Record<string, any> | undefined,
  ) { }
  
  static of(params: {
    transform: (stateValue?: string) => WidgetTransformerList,
    title: string,
    values?: Record<string, any> | undefined,
  }) {
    return new WidgetMultiStateTransformer(params.transform, params.title, params.values)
  }
}

export class WidgetMultiPropTransformer {
  readonly type = 'prop' as const
  readonly isAtomic = false as const
  
  constructor(
    readonly transform: (propValue: StyleValue) => WidgetTransformerList,
    readonly title?: string | undefined,
  ) { }
  
  static of(params: {
    transform: (propValue: StyleValue) => WidgetTransformerList,
    title?: string | undefined,
  }) {
    return new WidgetMultiPropTransformer(params.transform, params.title)
  }
}



export class WidgetStateValue {
  readonly type = 'stateValue' as const
  constructor(readonly value: string) { }
  
  static of(value: string) {
    return new WidgetStateValue(value)
  }
}
export class WidgetPropValue {
  readonly type = 'propValue' as const
  constructor(readonly value: StyleValue) { }
  
  static of(value: StyleValue) {
    return new WidgetPropValue(value)
  }
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
  export const hoverable = WidgetMedia.ofQuery(hoverableMedia)
}

export namespace WidgetPseudoElements {
  export const before = WidgetPseudoElem.ofName('before')
  export const after = WidgetPseudoElem.ofName('after')
}

export namespace WidgetPseudos {
  export const checked = WidgetPseudo.ofName('checked')
  export const selected = WidgetPseudo.ofName('selected')
  export const hover = WidgetPseudo.ofName('hover')
  export const active = WidgetPseudo.ofName('active')
  export const focus = WidgetPseudo.ofName('focus')
  export const focusVisible = WidgetPseudo.ofName('focus-visible')
  export const readOnly = WidgetPseudo.ofName('read-only')
  export const disabled = WidgetPseudo.ofName('disabled')
}

export namespace WidgetAttrs {
  export const type = WidgetAttr.of('type', { radio: '', checkbox: '' })
  export const error = WidgetAttr.of('data-error')
}

export namespace WidgetProps {
  
  export const transformLenValue = (value: StyleValue) => {
    if (value === undefined) return undefined
    if (value === null) value = 0
    if (value === 'full') value = '100%'
    if (isnumber(value)) value = `${value}px`
    return value
  }
  /* export const transformMultiLenValue = (value: StyleValue) => {
    if (isArray(value)) return value.map(v => transformLenValue(v)).join(' ')
    return transformLenValue(value)
  } */
  export const transformNullToNone = (value: StyleValue) => {
    if (value === null) return 'none'
    return value
  }
  export const transformNullToTransparent = (value: StyleValue) => {
    if (value === null) return 'transparent'
    return value
  }
  
  export const position = WidgetProp.ofName('position', value => {
    if (value === 'abs') return 'absolute'
    if (value === 'rel') return 'relative'
    if (value === null) return 'static'
    return value
  })
  export const top = WidgetProp.ofName('top', transformLenValue)
  export const right = WidgetProp.ofName('right', transformLenValue)
  export const bottom = WidgetProp.ofName('bottom', transformLenValue)
  export const left = WidgetProp.ofName('left', transformLenValue)
  
  export const width = WidgetProp.ofName('width', transformLenValue)
  export const height = WidgetProp.ofName('height', transformLenValue)
  export const minWidth = WidgetProp.ofName('min-width', transformLenValue)
  export const minHeight = WidgetProp.ofName('min-height', transformLenValue)
  export const maxWidth = WidgetProp.ofName('max-width', transformLenValue)
  export const maxHeight = WidgetProp.ofName('max-height', transformLenValue)
  export const margin = WidgetProp.ofName('margin', transformLenValue)
  export const padding = WidgetProp.ofName('padding', transformLenValue)
  export const paddingTop = WidgetProp.ofName('padding-top', transformLenValue)
  export const paddingRight = WidgetProp.ofName('padding-right', transformLenValue)
  export const paddingBottom = WidgetProp.ofName('padding-bottom', transformLenValue)
  export const paddingLeft = WidgetProp.ofName('padding-left', transformLenValue)
  export const gap = WidgetProp.ofName('gap', transformLenValue)
  
  export const color = WidgetProp.ofName('color', transformNullToTransparent)
  export const background = WidgetProp.ofName('background', transformNullToNone)
  export const backgroundColor = WidgetProp.ofName('background-color', transformNullToNone)
  export const border = WidgetProp.ofName('border', transformNullToNone)
  export const borderRadius = WidgetProp.ofName('border-radius', transformLenValue)
  export const outline = WidgetProp.ofName('outline', transformNullToNone)
  export const boxShadow = WidgetProp.ofName('box-shadow', transformNullToNone)
}

export namespace WidgetComplexTransformers {
  
  // just 'radio' instead of 'typeRadio'
  export const radio = WidgetMultiStateTransformer.of({
    title: 'radio -> [type=radio]',
    transform: () => [
      [WidgetAttrs.type, WidgetStateValue.of('radio')],
    ],
  })
  
  // hoverable AND hover
  export const hoverableHover = WidgetMultiStateTransformer.of({
    title: `hoverableHover -> @media ${hoverableMedia} & :hover`,
    transform: () => [[WidgetMedias.hoverable, WidgetPseudos.hover]],
  })
  
  // hover OR focusVisible
  export const inFocus = WidgetMultiStateTransformer.of({
    title: 'inFocus -> hoverableHover | :focus-visible',
    transform: () => [
      ...WidgetComplexTransformers.hoverableHover.transform(),
      [WidgetPseudos.focusVisible],
    ],
  })
  
  // width + height
  export const size = WidgetMultiPropTransformer.of({
    title: 'size -> width & height',
    transform: (value: StyleValue) => [
      [WidgetProps.width, WidgetPropValue.of(value)],
      [WidgetProps.height, WidgetPropValue.of(value)],
    ],
  })
  
  export const abs = WidgetMultiPropTransformer.of({
    title: 'abs -> top & right & bottom & left',
    transform: (value: StyleValue) => [
      [WidgetProps.top, WidgetPropValue.of(value)],
      [WidgetProps.right, WidgetPropValue.of(value)],
      [WidgetProps.bottom, WidgetPropValue.of(value)],
      [WidgetProps.left, WidgetPropValue.of(value)],
    ],
  })
  export const absH = WidgetMultiPropTransformer.of({
    title: 'absH -> right & left',
    transform: (value: StyleValue) => [
      [WidgetProps.right, WidgetPropValue.of(value)],
      [WidgetProps.left, WidgetPropValue.of(value)],
    ],
  })
  export const absV = WidgetMultiPropTransformer.of({
    title: 'absV -> top & bottom ',
    transform: (value: StyleValue) => [
      [WidgetProps.top, WidgetPropValue.of(value)],
      [WidgetProps.bottom, WidgetPropValue.of(value)],
    ],
  })
  
  export const ph = WidgetMultiPropTransformer.of({
    title: 'ph -> padding-left & padding-right',
    transform: (value: StyleValue) => [
      [WidgetProps.paddingRight, WidgetPropValue.of(value)],
      [WidgetProps.paddingLeft, WidgetPropValue.of(value)],
    ],
  })
  export const pv = WidgetMultiPropTransformer.of({
    title: 'pv -> padding-top & padding-bottom ',
    transform: (value: StyleValue) => [
      [WidgetProps.paddingTop, WidgetPropValue.of(value)],
      [WidgetProps.paddingBottom, WidgetPropValue.of(value)],
    ],
  })
}



// TODO Style split 'selP' by capital letters and check using 'in' operator
// TODO Style Парсить свойство по чатсям (разделение по словам): bg: { image: '', size: '' }




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
  baseData: WidgetTransformer[] = [],
): WidgetTransformer[][] {
  for (const [selectProp, value] of Object.entries(style)) {
    const contextStack = [...baseContextStack]
    const data = [...baseData]
    let selP = selectProp
    
    if (selP) pLoop: while (true) {
      if (!selP) {
        if (isobject(value)) {
          dataList = transform1(value, contextStack, dataList, data)
        }
        break
      }
      selP = uncapitalize(selP)
      
      for (let ctxI = lastI(contextStack); ctxI >= 0; ctxI--) {
        const context = contextStack[ctxI]
        if (context) for (const [name, entity] of Object.entries(context)) {
          
          if (ctxI !== ctxCommonI && selP.startsWith(name)
            || ctxI === ctxCommonI && selP === name
          ) {
            selP = selP.slice(name.length)
            
            // found widget transformer
            if (entity.type === 'widget') {
              data.push(entity)
              contextStack[ctxStatesI] = entity.states
              contextStack[ctxStateValuesI] = entity.values
              contextStack[ctxElemPropI] = entity.props
            }
            // found elem
            else if (entity.type === 'elem') {
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
            // found prop - must be last in selector
            else if (entity.type === 'prop') {
              if (!selP && !isobject(value)) {
                data.push(entity)
                data.push({ value, type: 'propValue' })
                dataList.push(data)
                break pLoop
              }
            }
            
            continue pLoop
          }
        }
      }
      
      // If not found then it is unregistered property
      {
        //throw new Error(`Unknown property: ${selP}`)
        if (isobject(value)) {
          throw new Error(`Found unregistered property '${selP}' but value is object: ${value}`)
        }
        const pKebabized = camelCaseToKebabCase(selP)
        data.push(WidgetProp.ofName(pKebabized))
        data.push({ value, type: 'propValue' })
        dataList.push(data)
        selP = ''
      }
      
    }
  }
  
  return dataList
}

