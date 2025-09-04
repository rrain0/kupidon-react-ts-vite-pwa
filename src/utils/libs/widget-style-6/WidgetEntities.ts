
import { PrimitiveStyleValue, StyleValue } from '@libs/widget-style-6/WidgetStyle.ts'
import { isnumber } from 'src/utils/base/math/typeUtils.ts'
import { isArray } from 'src/utils/base/math/typeUtils.ts'
import {
  WidgetAnyPropTransformer,
  WidgetAttr,
  WidgetMedia,
  WidgetMultiPropTransformer,
  WidgetMultiStateTransformer,
  WidgetProp,
  WidgetPropValue,
  WidgetPseudo,
  WidgetPseudoElem,
  WidgetStateValue, WidgetTransformerList,
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
  export const dataError = WidgetAttr.of('data-error')
  export const dataSelected = WidgetAttr.of('data-selected')
  export const dataLocked = WidgetAttr.of('data-locked')
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
    if (value === false) return '0'
    if (value === true) return '100%'
    if (isnumber(value)) return `${value}px`
    if (value === '') return undefined
    if (value === 'inf') return '999999px'
    if (value === 'full') return '100%'
    if (value === 'content') return 'fit-content'
    if (value === 'ct') return 'fit-content'
    return value
  }
  export const transformRadiusAnyValue = (value: StyleValue) => {
    if (isArray(value)) {
      value = value.map(it => transformRadiusAnyValue(it))
      let div = value.findIndex(v => v === '/')
      if (div === -1) div = value.length
      const values =  [value.slice(0, div).join(' '), value.slice(div + 1).join(' ')]
      if (values[1]) return values.join(' / ')
      return values[0]
    }
    if (value === undefined) return undefined
    if (value === null) return undefined
    if (value === false) return '0'
    if (value === true) return '100%'
    if (isnumber(value)) return `${value}px`
    if (value === '') return undefined
    if (value === 'inf') return '999999px'
    if (value === 'round') return '999999px'
    if (value === 'full') return '100%'
    return value
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
  
  
  export const transformArrLenValue = (value: StyleValue) => {
    if (isArray(value)) return value.map(v => transformLenValue(v)).join(' ')
    return transformLenValue(value)
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
  export const aspectRatio = WidgetProp.ofName('aspect-ratio')
  
  export const margin = WidgetProp.ofName('margin', transformArrLenValue)
  export const marginTop = WidgetProp.ofName('margin-top', transformLenValue)
  export const marginRight = WidgetProp.ofName('margin-right', transformLenValue)
  export const marginBottom = WidgetProp.ofName('margin-bottom', transformLenValue)
  export const marginLeft = WidgetProp.ofName('margin-left', transformLenValue)
  
  export const padding = WidgetProp.ofName('padding', transformArrLenValue)
  export const paddingTop = WidgetProp.ofName('padding-top', transformLenValue)
  export const paddingRight = WidgetProp.ofName('padding-right', transformLenValue)
  export const paddingBottom = WidgetProp.ofName('padding-bottom', transformLenValue)
  export const paddingLeft = WidgetProp.ofName('padding-left', transformLenValue)
  
  export const gap = WidgetProp.ofName('gap', transformArrLenValue)
  
  export const color = WidgetProp.ofName('color', transformNullFalseToTransparent)
  
  export const background = WidgetProp.ofName('background', transformNullFalseToNone)
  export const backgroundColor = WidgetProp.ofName('background-color', transformNullFalseToTransparent)
  export const backgroundImage = WidgetProp.ofName('background-image', transformNullFalseToNone)
  export const backgroundPosition = WidgetProp.ofName('background-position', transformArrLenValue)
  export const backgroundSize = WidgetProp.ofName('background-size', transformArrLenValue)
  
  export const border = WidgetProp.ofName('border', transformNullFalseToNone)
  export const borderWidth = WidgetProp.ofName('border-width', transformLenValue)
  export const borderStyle = WidgetProp.ofName('border-style', transformNullFalseToNone)
  export const borderColor = WidgetProp.ofName('border-color', transformNullFalseToTransparent)
  export const borderRadius = WidgetProp.ofName('border-radius', transformRadiusAnyValue)
  
  export const borderBottom = WidgetProp.ofName('border-bottom', transformNullFalseToNone)
  export const borderBottomWidth = WidgetProp.ofName('border-bottom-width', transformLenValue)
  export const borderBottomStyle = WidgetProp.ofName('border-bottom-style', transformNullFalseToNone)
  export const borderBottomColor = WidgetProp.ofName('border-bottom-color', transformNullFalseToTransparent)
  
  export const outline = WidgetProp.ofName('outline', transformNullFalseToNone)
  export const boxShadow = WidgetProp.ofName('box-shadow', transformNullFalseToNone)
  
  export const gridTemplateRows = WidgetProp.ofName('grid-template-rows')
  export const gridTemplateColumns = WidgetProp.ofName('grid-template-columns')
  export const gridTemplateAreas = WidgetProp.ofName('grid-template-areas')
  export const gridAutoRows = WidgetProp.ofName('grid-auto-rows')
  export const gridAutoColumns = WidgetProp.ofName('grid-auto-columns')
  export const gridAutoFlow = WidgetProp.ofName('grid-auto-flow', v => {
    if (v === 'col') return 'column'
    return v
  })
  export const gridArea = WidgetProp.ofName('grid-area')
  
  export const pointerEvents = WidgetProp.ofName('pointer-events', v => {
    return transformNullFalseToNone(transformTrueToAuto(v))
  })
  export const content = WidgetProp.ofName('content')
}



export namespace AdditionalProps {
  
  export const createTransform4LenValue = (
    pMulti: WidgetAnyPropTransformer | undefined,
    p0: WidgetAnyPropTransformer,
    p1: WidgetAnyPropTransformer,
    p2: WidgetAnyPropTransformer,
    p3: WidgetAnyPropTransformer
  ) =>
    (value: StyleValue): WidgetTransformerList => {
      if (isArray(value)) {
        let t: StyleValue, r: StyleValue, b: StyleValue, l: StyleValue
        value = value.map(v => WidgetProps.transformLenValue(v)) as PrimitiveStyleValue[]
        
        if (value.length === 0) {
          t = undefined; r = undefined; b = undefined; l = undefined
        }
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
        
        if (pMulti && t && r && b && l) {
          if (r === l) {
            if (t === b) {
              if (t === r) {
                return [[pMulti, WidgetPropValue.of(t)]]
              }
              return [[pMulti, WidgetPropValue.of(`${t} ${r}`)]]
            }
            return [[pMulti, WidgetPropValue.of(`${t} ${r} ${b}`)]]
          }
          return [[pMulti, WidgetPropValue.of(`${t} ${r} ${b} ${l}`)]]
        }
        
        return [[
          ...t ? [p0, WidgetPropValue.of(t)] : [],
          ...r ? [p1, WidgetPropValue.of(r)] : [],
          ...b ? [p2, WidgetPropValue.of(b)] : [],
          ...l ? [p3, WidgetPropValue.of(l)] : [],
        ]]
      }
      if (pMulti) return [[pMulti, WidgetPropValue.of(value)]]
      return [[
        p0, WidgetPropValue.of(value),
        p1, WidgetPropValue.of(value),
        p2, WidgetPropValue.of(value),
        p3, WidgetPropValue.of(value),
      ]]
    }
  
  
  
  // width + height
  export const size = WidgetMultiPropTransformer.of({
    title: 'size -> width & height',
    transform: (value: StyleValue) => [[
      WidgetProps.width, WidgetPropValue.of(value),
      WidgetProps.height, WidgetPropValue.of(value),
    ]],
  })
  // min-width + min-height
  export const minSize = WidgetMultiPropTransformer.of({
    title: 'min-size -> min-width & min-height',
    transform: (value: StyleValue) => [[
      WidgetProps.minWidth, WidgetPropValue.of(value),
      WidgetProps.minHeight, WidgetPropValue.of(value),
    ]],
  })
  // max-width + max-height
  export const maxSize = WidgetMultiPropTransformer.of({
    title: 'max-size -> max-width & max-height',
    transform: (value: StyleValue) => [[
      WidgetProps.maxWidth, WidgetPropValue.of(value),
      WidgetProps.maxHeight, WidgetPropValue.of(value),
    ]],
  })
  
  export const abs = WidgetMultiPropTransformer.of({
    title: 'abs -> top, right, bottom, left',
    transform: createTransform4LenValue(
      undefined,
      WidgetProps.top,
      WidgetProps.right,
      WidgetProps.bottom,
      WidgetProps.left,
    ),
  })
  export const absH = WidgetMultiPropTransformer.of({
    title: 'absH -> right & left',
    transform: (value: StyleValue) => [[
      WidgetProps.right, WidgetPropValue.of(value),
      WidgetProps.left, WidgetPropValue.of(value),
    ]],
  })
  export const absV = WidgetMultiPropTransformer.of({
    title: 'absV -> top & bottom ',
    transform: (value: StyleValue) => [[
      WidgetProps.top, WidgetPropValue.of(value),
      WidgetProps.bottom, WidgetPropValue.of(value),
    ]],
  })
  
  export const padding = WidgetMultiPropTransformer.of({
    title: 'padding',
    transform: createTransform4LenValue(
      WidgetProps.padding,
      WidgetProps.paddingTop,
      WidgetProps.paddingRight,
      WidgetProps.paddingBottom,
      WidgetProps.paddingLeft,
    ),
  })
  export const ph = WidgetMultiPropTransformer.of({
    title: 'ph -> padding-left & padding-right',
    transform: (value: StyleValue) => [[
      WidgetProps.paddingRight, WidgetPropValue.of(value),
      WidgetProps.paddingLeft, WidgetPropValue.of(value),
    ]],
  })
  export const pv = WidgetMultiPropTransformer.of({
    title: 'pv -> padding-top & padding-bottom ',
    transform: (value: StyleValue) => [[
      WidgetProps.paddingTop, WidgetPropValue.of(value),
      WidgetProps.paddingBottom, WidgetPropValue.of(value),
    ]],
  })
  
  export const margin = WidgetMultiPropTransformer.of({
    title: 'margin',
    transform: createTransform4LenValue(
      WidgetProps.margin,
      WidgetProps.marginTop,
      WidgetProps.marginRight,
      WidgetProps.marginBottom,
      WidgetProps.marginLeft,
    ),
  })
  export const mh = WidgetMultiPropTransformer.of({
    title: 'mh -> margin-left & margin-right',
    transform: (value: StyleValue) => [[
      WidgetProps.marginRight, WidgetPropValue.of(value),
      WidgetProps.marginLeft, WidgetPropValue.of(value),
    ]],
  })
  export const mv = WidgetMultiPropTransformer.of({
    title: 'mv -> margin-top & margin-bottom ',
    transform: (value: StyleValue) => [[
      WidgetProps.marginTop, WidgetPropValue.of(value),
      WidgetProps.marginBottom, WidgetPropValue.of(value),
    ]],
  })
  
  // --color: size;
  export const varSize = WidgetProp.ofName('--size', WidgetProps.transformLenValue)
  // --color: value;
  export const varColor = WidgetProp.ofName('--color')
  // color: value; --color: value;
  export const colorAndVarColor = WidgetMultiPropTransformer.of({
    title: 'color & --color',
    transform: value => [[
      WidgetProps.color, WidgetPropValue.of(value),
      AdditionalProps.varColor, WidgetPropValue.of(value),
    ]],
  })
  export const varColorAccent = WidgetProp.ofName('--color-accent')
  // color: value; --color: value;
}




export namespace AdditionalStates {
  
  // before + content: ''
  export const before = WidgetMultiStateTransformer.of({
    title: `after + content: ''`,
    transform: () => [[
      // TODO Style - to make ::before content: '' work, remove selectProp linearization
      WidgetPseudoElements.before, //WidgetProps.content, WidgetPropValue.of("''"),
    ]],
  })
  // after + content: ''
  export const after = WidgetMultiStateTransformer.of({
    title: `after + content: ''`,
    transform: () => [[
      // TODO Style - to make ::after content: '' work, remove selectProp linearization
      WidgetPseudoElements.after, //WidgetProps.content, WidgetPropValue.of("''"),
    ]],
  })
  
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
  
  // hover OR focusVisible OR active
  export const inFocus = WidgetMultiStateTransformer.of({
    title: 'inFocus -> hoverableHover | :focus-visible | :active',
    transform: () => [
      ...AdditionalStates.hoverableHover.transform(),
      [WidgetPseudos.focusVisible],
      [WidgetPseudos.active],
    ],
  })
  
  export const selected = WidgetAttrs.dataSelected
  export const locked = WidgetAttrs.dataLocked
}

