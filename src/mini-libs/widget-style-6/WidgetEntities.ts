import { TypeU } from '@util/common/TypeU.ts'
import { StyleValue } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import isnumber = TypeU.isnumber
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
/*
todo style idea: linear-gradient:
 linear-gradient(to bottom, #ffffff 0% 30%, #bbbbbb 100%) =>
 ['linear', 'to bottom', ['#ffffff', '0%', '30%'], ['#bbbbbb', '100%']]


 */
export namespace WidgetProps {
  
  export const transformLenValue = (value: StyleValue) => {
    if (value === undefined) return undefined
    if (value === null) return '0px'
    if (value === 'inf') return '999999px'
    if (value === 'round') return '999999px'
    if (value === 'full') return '100%'
    if (value === 'content') return 'fit-content'
    if (value === 'ct') return 'fit-content'
    if (isnumber(value)) return `${value}px`
    return value
  }
  // TODO Style - allow empty values (retain prev value) for 4-len vals:
  //  p: [8, 16, '', 16] or [8, 16, undefined, 16] or [8, 16, '_', 16]
  export const transformMultiLenValue = (value: StyleValue) => {
    if (isArray(value)) return value.map(v => transformLenValue(v)).join(' ')
    return transformLenValue(value)
  }
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
  export const margin = WidgetProp.ofName('margin', transformMultiLenValue)
  export const padding = WidgetProp.ofName('padding', transformMultiLenValue)
  export const paddingTop = WidgetProp.ofName('padding-top', transformLenValue)
  export const paddingRight = WidgetProp.ofName('padding-right', transformLenValue)
  export const paddingBottom = WidgetProp.ofName('padding-bottom', transformLenValue)
  export const paddingLeft = WidgetProp.ofName('padding-left', transformLenValue)
  export const gap = WidgetProp.ofName('gap', transformMultiLenValue)
  
  export const color = WidgetProp.ofName('color', transformNullToTransparent)
  export const background = WidgetProp.ofName('background', transformNullToNone)
  export const backgroundColor = WidgetProp.ofName('background-color', transformNullToTransparent)
  export const backgroundImage = WidgetProp.ofName('background-image', transformNullToNone)
  export const backgroundPosition = WidgetProp.ofName('background-position', transformMultiLenValue)
  export const backgroundSize = WidgetProp.ofName('background-size', transformMultiLenValue)
  export const border = WidgetProp.ofName('border', transformNullToNone)
  export const borderRadius = WidgetProp.ofName('border-radius', transformLenValue)
  export const outline = WidgetProp.ofName('outline', transformNullToNone)
  export const boxShadow = WidgetProp.ofName('box-shadow', transformNullToNone)
}

export namespace WidgetComplexTransformers {
  
  // just 'radio' instead of 'typeRadio'
  import isArray = TypeU.isArray
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
    title: 'abs -> top, right, bottom, left',
    transform: (value: StyleValue) => {
      let t: StyleValue = undefined
      let r: StyleValue = undefined
      let b: StyleValue = undefined
      let l: StyleValue = undefined
      if (isArray(value)) {
        if (value.length === 1) {
          t = value[0]; r = value[0]; b = value[0]; l = value[0]
        }
        else if (value.length === 2) {
          t = value[0]; r = value[1]; b = value[0]; l = value[1]
        }
        else if (value.length === 3) {
          t = value[0]; r = value[1]; b = value[2]; l = value[1]
        }
        else if (value.length >= 4) {
          t = value[0]; r = value[1]; b = value[2]; l = value[3]
        }
      }
      else {
        t = value; r = value; b = value; l = value
      }
      return [
        [WidgetProps.top, WidgetPropValue.of(t)],
        [WidgetProps.right, WidgetPropValue.of(r)],
        [WidgetProps.bottom, WidgetPropValue.of(b)],
        [WidgetProps.left, WidgetPropValue.of(l)],
      ]
    },
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

