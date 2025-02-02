import { TypeU } from '@util/common/TypeU.ts'
import { StyleValue } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import isnumber = TypeU.isnumber
import isArray = TypeU.isArray
import {
  WidgetAttr,
  WidgetMedia,
  WidgetMultiPropTransformer,
  WidgetMultiStateTransformer,
  WidgetProp,
  WidgetPropValue,
  WidgetPseudo,
  WidgetPseudoElem,
  WidgetStateValue,
} from './WidgetEntity'






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
    if (value === null) return undefined
    if (value === false) return undefined
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
  export const transformNullFalseToNone = (value: StyleValue) => {
    if (value === null) return 'none'
    if (value === false) return 'none'
    return value
  }
  export const transformNullToAuto = (value: StyleValue) => {
    if (value === null) return 'auto'
    return value
  }
  export const transformNullFalseToTransparent = (value: StyleValue) => {
    if (value === null) return 'transparent'
    if (value === false) return 'transparent'
    return value
  }
  export const transformTrueToAuto = (value: StyleValue) => {
    if (value === true) return 'auto'
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
  export const zIndex = WidgetProp.ofName('z-index', transformNullToAuto)
  
  export const width = WidgetProp.ofName('width', transformLenValue)
  export const height = WidgetProp.ofName('height', transformLenValue)
  export const minWidth = WidgetProp.ofName('min-width', transformLenValue)
  export const minHeight = WidgetProp.ofName('min-height', transformLenValue)
  export const maxWidth = WidgetProp.ofName('max-width', transformLenValue)
  export const maxHeight = WidgetProp.ofName('max-height', transformLenValue)
  
  export const margin = WidgetProp.ofName('margin', transformMultiLenValue)
  export const marginTop = WidgetProp.ofName('margin-top', transformLenValue)
  export const marginRight = WidgetProp.ofName('margin-right', transformLenValue)
  export const marginBottom = WidgetProp.ofName('margin-bottom', transformLenValue)
  export const marginLeft = WidgetProp.ofName('margin-left', transformLenValue)
  
  export const padding = WidgetProp.ofName('padding', transformMultiLenValue)
  export const paddingTop = WidgetProp.ofName('padding-top', transformLenValue)
  export const paddingRight = WidgetProp.ofName('padding-right', transformLenValue)
  export const paddingBottom = WidgetProp.ofName('padding-bottom', transformLenValue)
  export const paddingLeft = WidgetProp.ofName('padding-left', transformLenValue)
  
  export const gap = WidgetProp.ofName('gap', transformMultiLenValue)
  
  export const color = WidgetProp.ofName('color', transformNullFalseToTransparent)
  
  export const background = WidgetProp.ofName('background', transformNullFalseToNone)
  export const backgroundColor = WidgetProp.ofName('background-color', transformNullFalseToTransparent)
  export const backgroundImage = WidgetProp.ofName('background-image', transformNullFalseToNone)
  export const backgroundPosition = WidgetProp.ofName('background-position', transformMultiLenValue)
  export const backgroundSize = WidgetProp.ofName('background-size', transformMultiLenValue)
  
  export const border = WidgetProp.ofName('border', transformNullFalseToNone)
  export const borderColor = WidgetProp.ofName('border-color', transformNullFalseToTransparent)
  export const borderRadius = WidgetProp.ofName('border-radius', transformMultiLenValue)
  
  export const outline = WidgetProp.ofName('outline', transformNullFalseToNone)
  export const boxShadow = WidgetProp.ofName('box-shadow', transformNullFalseToNone)
  
  export const gridTemplateRows = WidgetProp.ofName('grid-template-rows')
  export const gridTemplateColumns = WidgetProp.ofName('grid-template-columns')
  export const gridTemplateAreas = WidgetProp.ofName('grid-template-areas')
  export const gridAutoRows = WidgetProp.ofName('grid-auto-rows')
  export const gridAutoColumns = WidgetProp.ofName('grid-auto-columns')
  export const gridAutoFlow = WidgetProp.ofName('grid-auto-flow')
  export const gridArea = WidgetProp.ofName('grid-area')
  
  export const pointerEvents = WidgetProp.ofName('pointer-events', v => {
    return transformNullFalseToNone(transformTrueToAuto(v))
  })
}



export namespace AdditionalProps {
  
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
  
  export const mh = WidgetMultiPropTransformer.of({
    title: 'mh -> margin-left & margin-right',
    transform: (value: StyleValue) => [
      [WidgetProps.marginRight, WidgetPropValue.of(value)],
      [WidgetProps.marginLeft, WidgetPropValue.of(value)],
    ],
  })
  export const mv = WidgetMultiPropTransformer.of({
    title: 'mv -> margin-top & margin-bottom ',
    transform: (value: StyleValue) => [
      [WidgetProps.marginTop, WidgetPropValue.of(value)],
      [WidgetProps.marginBottom, WidgetPropValue.of(value)],
    ],
  })
  
  // --color: size;
  export const varSize = WidgetProp.ofName('--size', WidgetProps.transformLenValue)
  // --color: value;
  export const varColor = WidgetProp.ofName('--color')
  // color: value; --color: value;
  export const colorAndVarColor = WidgetMultiPropTransformer.of({
    transform: value => [
      [WidgetProps.color, WidgetPropValue.of(value)],
      [AdditionalProps.varColor, WidgetPropValue.of(value)],
    ],
  })
  export const varAccentColor = WidgetProp.ofName('--accent-color')
  // color: value; --color: value;
}




export namespace AdditionalStates {
  
  // just 'radio' instead of 'typeRadio'
  export const radio = WidgetMultiStateTransformer.of({
    title: 'radio -> [type=radio]',
    transform: () => [[WidgetAttrs.type, WidgetStateValue.of('radio')]],
  })
  // just 'checkbox' instead of 'typeCheckbox'
  export const checkbox = WidgetMultiStateTransformer.of({
    title: 'checkbox -> [type=checkbox]',
    transform: () => [[WidgetAttrs.type, WidgetStateValue.of('checkbox')]],
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
      ...AdditionalStates.hoverableHover.transform(),
      [WidgetPseudos.focusVisible],
    ],
  })
}

