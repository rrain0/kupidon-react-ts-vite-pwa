import { TypeU } from '@util/common/TypeU.ts'
import {
  WidgetElem,
  WidgetStyle,
  transform1,
  WidgetAttrs,
  WidgetComplexTransformers,
  WidgetPseudos,
  WidgetProps,
  WidgetPseudoElements, WidgetMultiAnyTransformer, WidgetAnyPropTransformer,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { transform2 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import RecordRo = TypeU.RecordRo





export interface Widget {
  readonly rootElem: WidgetElem
  readonly elems: RecordRo<string, WidgetElem | WidgetMultiAnyTransformer>
  readonly props?: RecordRo<string, WidgetAnyPropTransformer> | undefined
  t(this: Widget, style: WidgetStyle, selectThis?: boolean): string
}



export const CommonProps = (() => {
  const props = {
    width: WidgetProps.width,
    height: WidgetProps.height,
    size: WidgetComplexTransformers.size,
    
    w: WidgetProps.width,
    h: WidgetProps.height,
    sz: WidgetComplexTransformers.size,
    
    margin: WidgetProps.margin,
    padding: WidgetProps.padding,
    gap: WidgetProps.gap,
    
    m: WidgetProps.margin,
    p: WidgetProps.padding,
    g: WidgetProps.gap,
    
    position: WidgetProps.position,
    top: WidgetProps.top,
    right: WidgetProps.right,
    bottom: WidgetProps.bottom,
    left: WidgetProps.left,
    
    pos: WidgetProps.position,
    abs: WidgetComplexTransformers.abs,
    absT: WidgetProps.top,
    absR: WidgetProps.right,
    absB: WidgetProps.bottom,
    absL: WidgetProps.left,
    absH: WidgetComplexTransformers.absH,
    absV: WidgetComplexTransformers.absV,
    a: WidgetComplexTransformers.abs,
    at: WidgetProps.top,
    ar: WidgetProps.right,
    ab: WidgetProps.bottom,
    al: WidgetProps.left,
    ah: WidgetComplexTransformers.absH,
    av: WidgetComplexTransformers.absV,
    
    background: WidgetProps.background,
    border: WidgetProps.border,
    outline: WidgetProps.outline,
    boxShadow: WidgetProps.boxShadow,
    
    bg: WidgetProps.background,
    
    backgroundColor: WidgetProps.backgroundColor,
    
    bgColor: WidgetProps.backgroundColor,
    
  }
  const sortedProps = Object.entries(props)
    .sort((([propA], [propB]) => propB.length - propA.length))
    .reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc }, { } as typeof props)
  return sortedProps
})()
export const CommonStates = {
  before: WidgetPseudoElements.before,
  after: WidgetPseudoElements.after,
  type: WidgetAttrs.type,
  radio: WidgetComplexTransformers.radio,
  
  // States
  checked: WidgetPseudos.checked,
  selected: WidgetPseudos.selected,
  // hoverable AND hover
  hover: WidgetComplexTransformers.hoverableHover,
  active: WidgetPseudos.active,
  focus: WidgetPseudos.focus,
  focusVisible: WidgetPseudos.focusVisible,
  // hover OR focusVisible
  inFocus: WidgetComplexTransformers.inFocus,
  readOnly: WidgetPseudos.readOnly,
  disabled: WidgetPseudos.disabled,
  error: WidgetAttrs.error,
}





export const transformWidgetStyle = (
  widget: Widget,
  style: WidgetStyle,
  selectThis = true
): string => {
  let css = transform6(transform5(transform4(transform3(transform2(transform1(
    style,
    [{ ...CommonProps, ...widget.props }, widget.elems, undefined, undefined, undefined]
  ))))))
  if (selectThis && css) css = `&${css}`
  return css
}



export function newWidget(
  rootElem: WidgetElem,
  elems: RecordRo<string, WidgetElem | WidgetMultiAnyTransformer>,
  props?: RecordRo<string, WidgetAnyPropTransformer>,
): Widget {
  return {
    rootElem, elems, props,
    t(style: WidgetStyle, selectThis = true) {
      return transformWidgetStyle(this, style, selectThis)
    },
  }
}
