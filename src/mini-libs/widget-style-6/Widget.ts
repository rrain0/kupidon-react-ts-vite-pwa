import { TypeU } from '@util/common/TypeU.ts'
import {
  ElemTransformer1,
  WidgetStyle,
  transform1,
  Attrs1,
  ComplexTransformers1,
  Pseudos1,
  Props1,
  PseudoElements1,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { transform2 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import RecordRo = TypeU.RecordRo





export interface Widget {
  readonly rootElem: ElemTransformer1
  readonly elems: RecordRo<string, ElemTransformer1>
  // Состояние самого виджета
  readonly states?: RecordRo<string, string> | undefined
}




export const CommonProps = {
  width: Props1.width,
  w: Props1.width,
  height: Props1.height,
  h: Props1.height,
  size: ComplexTransformers1.size,
  sz: ComplexTransformers1.size,
  background: Props1.background,
  bg: Props1.background,
}
export const CommonStates = {
  before: PseudoElements1.before,
  after: PseudoElements1.after,
  type: Attrs1.type,
  radio: ComplexTransformers1.radio,
  
  // States
  checked: Pseudos1.checked,
  selected: Pseudos1.selected,
  // hoverable AND hover
  hover: ComplexTransformers1.hoverableHover,
  active: Pseudos1.active,
  focus: Pseudos1.focus,
  focusVisible: Pseudos1.focusVisible,
  // hover OR focusVisible
  inFocus: ComplexTransformers1.inFocus,
  readOnly: Pseudos1.readOnly,
  disabled: Pseudos1.disabled,
  error: Attrs1.error,
}




const RootElemStates2 = {
  type: Attrs1.type,
  hover: ComplexTransformers1.hoverableHover,
  focus: Pseudos1.focus,
  focusVisible: Pseudos1.focusVisible,
}

export const transformWidgetStyle = (widget: Widget, style: WidgetStyle): string => {
  return transform6(transform5(transform4(transform3(transform2(transform1(
    style,
    [CommonProps, widget.elems, RootElemStates2, undefined, undefined]
  ))))))
}
