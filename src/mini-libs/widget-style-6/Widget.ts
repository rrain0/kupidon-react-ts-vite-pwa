import { TypeU } from '@util/common/TypeU.ts'
import { transform1 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import {
  WidgetElem, WidgetMultiAnyTransformer, WidgetAnyPropTransformer,
} from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import {
  transform2,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import { transform7 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform7.ts'
import { CommonProps } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import RecordRo = TypeU.RecordRo






export class Widget<const out Es extends Record<string, WidgetElem> = any> {
  
  constructor(
    readonly rootElem: WidgetElem,
    readonly elems: Es,
    readonly states?: RecordRo<string, WidgetMultiAnyTransformer> | undefined,
    // Additional CSS prop transformers
    readonly props?: RecordRo<string, WidgetAnyPropTransformer> | undefined,
  ) { }
  
  static of<const Es extends Record<string, WidgetElem> = any>(params: {
    rootElem: WidgetElem,
    elems: Es,
    states?: RecordRo<string, WidgetMultiAnyTransformer> | undefined,
    props?: RecordRo<string, WidgetAnyPropTransformer> | undefined,
  }): Widget<Es> {
    return new Widget(params.rootElem, params.elems, params.states, params.props)
  }
  
  get els() { return this.elems }
  
  // TODO Style - selectThis = true
  t(style: WidgetStyle) {
    return transformWidgetStyle(this, style)
  }
}








export const transformWidgetStyle = (widget: Widget, style: WidgetStyle): string => {
  const css = transform7(transform6(transform5(transform4(transform3(transform2(
    transform1(style),
    [
      { ...CommonProps, ...widget.props },
      { ...widget.states, ...widget.elems },
      undefined,
      undefined,
      undefined,
    ]
  ))))))
  return css
}

