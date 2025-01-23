import { TypeU } from '@util/common/TypeU.ts'
import {
  WidgetElem,
  WidgetStyle,
  transform1,
  WidgetAttrs,
  WidgetComplexTransformers,
  WidgetPseudos,
  WidgetProps,
  WidgetPseudoElements, WidgetMultiAnyTransformer,
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
}




export const CommonProps = {
  width: WidgetProps.width,
  w: WidgetProps.width,
  height: WidgetProps.height,
  h: WidgetProps.height,
  size: WidgetComplexTransformers.size,
  sz: WidgetComplexTransformers.size,
  background: WidgetProps.background,
  bg: WidgetProps.background,
}
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





export const transformWidgetStyle = (widget: Widget, style: WidgetStyle): string => {
  return transform6(transform5(transform4(transform3(transform2(transform1(
    style,
    [CommonProps, widget.elems, undefined, undefined, undefined]
  ))))))
}
