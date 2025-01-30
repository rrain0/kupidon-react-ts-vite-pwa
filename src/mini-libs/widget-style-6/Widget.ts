import { TypeU } from '@util/common/TypeU.ts'
import { transform1 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import {
  WidgetElem,
  WidgetMultiAnyTransformer,
  WidgetAnyPropTransformer,
  WidgetTransformerList,
  WidgetTransformer,
} from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  transform2,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import { transform7 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform7.ts'
import {
  CommonProps,
} from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { WidgetStyleWithProps } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import RecordRo = TypeU.RecordRo
import isObject = TypeU.isObject


/*
DESCRIPTION:

The library is usage-friendly: do more while write less

CssWidget assembles html element's tree into one entity called 'Widget'

Widget State: You needn't know which element bears the state, just use it.

Unregistered (unknown) CSS properties' names are automatically transformed from camelCase to kebab-case
 */




export class Widget<const out Es extends Record<string, WidgetElem> = any> {
  
  constructor(
    readonly rootElem: WidgetElem | undefined,
    readonly elems: Es,
    readonly states?: RecordRo<string, WidgetTransformer> | undefined,
    // Additional CSS prop transformers
    readonly props?: RecordRo<string, WidgetAnyPropTransformer> | undefined,
  ) { }
  
  static of<const Es extends Record<string, WidgetElem> = any>(params: {
    rootElem: WidgetElem | undefined,
    elems: Es,
    states?: RecordRo<string, WidgetTransformer> | undefined,
    props?: RecordRo<string, WidgetAnyPropTransformer> | undefined,
  }): Widget<Es> {
    return new Widget(params.rootElem, params.elems, params.states, params.props)
  }
  
  // TODO Style - add param 'selectThis = true'
  transform<Props>(props: Props, style: WidgetStyleWithProps<Props>) {
    return transformWidgetStyle(this, props, style)
  }
  
  get els() { return this.elems }
  get t() { return this.transform }
}



export function createWidgetState(...transformerList: WidgetTransformerList) {
  return WidgetMultiAnyTransformer.of({
    transform: () => transformerList,
  })
}



const styleCache: WeakMap<object,
  WeakMap<object,
    WeakMap<object, string>
  >
> = new WeakMap()

export const transformWidgetStyle = <Props>(
  widget: Widget,
  props: Props,
  style: WidgetStyleWithProps<Props>,
): string => {
  if (isObject(props) && isObject(style)) {
    const css = styleCache.get(props)?.get(widget)?.get(style)
    if (css !== undefined) return css
  }
  const css = transform7(transform6(transform5(transform4(transform3(transform2(
    transform1(style, props),
    [
      { ...CommonProps, ...widget.props },
      { ...widget.states, ...widget.elems },
      undefined,
      undefined,
      undefined,
    ]
  ))))))
  if (isObject(props) && isObject(style)) {
    let widgetsMap = styleCache.get(props)
    if (!widgetsMap) styleCache.set(props, widgetsMap = new WeakMap())
    let stylesMap = widgetsMap.get(widget)
    if (!stylesMap) widgetsMap.set(widget, stylesMap = new WeakMap())
    stylesMap.set(style, css)
  }
  return css
}

