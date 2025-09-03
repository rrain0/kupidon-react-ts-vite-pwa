import { TypeU } from '@utils/common/TypeU.ts'
import { transform1 } from '@libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import {
  WidgetElem,
  WidgetMultiAnyTransformer,
  WidgetAnyPropTransformer,
  WidgetTransformerList,
  WidgetTransformer,
} from '@libs/widget-style-6/WidgetEntity.ts'
import {
  transform2,
} from '@libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from '@libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from '@libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from '@libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from '@libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import { transform7 } from '@libs/widget-style-6/transform/WidgetStyleTransform7.ts'
import { CommonProps, CommonStates } from '@libs/widget-style-6/WidgetCommonEntities.ts'
import { WidgetStyleWithProps } from '@libs/widget-style-6/WidgetStyle.ts'
import RecordRo = TypeU.RecordRo
import isObject = TypeU.isObject


/*
DESCRIPTION:

The library is usage-friendly: do more while write less

CssWidget assembles html element's tree into one entity called 'Widget'

Widget State: You needn't know which element bears the state, just use it.

Unregistered (unknown) CSS properties' names are automatically transformed from camelCase to kebab-case

Нельзя использовать в качестве имён элементов наименования css свойств
или можно но, нужно css свойствам сделать алиасы с другим именем
 */



// TODO Style - WidgetElem is Widget !!!
export class Widget<
  const out Es extends RecordRo<string, WidgetElem> = any,
  const out Ss extends RecordRo<string, WidgetTransformer> = any,
  const out Ps extends RecordRo<string, WidgetAnyPropTransformer> = any,
> {
  
  constructor(
    readonly rootElem: WidgetElem | undefined,
    readonly elems: Es,
    readonly states?: Ss,
    // Additional CSS prop transformers
    readonly props?: Ps,
    readonly commonStates?: RecordRo<string, WidgetTransformer>,
    readonly commonProps?: RecordRo<string, WidgetAnyPropTransformer>,
  ) { }
  
  static of<
    const Es extends RecordRo<string, WidgetElem> = any,
    const Ss extends RecordRo<string, WidgetTransformer> = any,
  >({
    rootElem,
    elems,
    states,
    props,
    commonStates = CommonStates,
    commonProps = CommonProps,
  }: {
    rootElem: WidgetElem | undefined,
    elems: Es,
    states?: Ss | undefined,
    props?: RecordRo<string, WidgetAnyPropTransformer> | undefined,
    commonStates?: RecordRo<string, WidgetTransformer> | undefined,
    commonProps?: RecordRo<string, WidgetAnyPropTransformer> | undefined,
  }): Widget<Es, Ss> {
    return new Widget(rootElem, elems, states, props, commonStates, commonProps)
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
export namespace WidgetState {
  export const of = createWidgetState
}



export type AttachRootElemParams = {
  upElem: WidgetElem
  upSelector: string
}





// TODO Style - css class - задуматься как выделять css классы
// TODO Style - <div w={Widget} wst={WidgetStyle}/>

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
    if (css !== undefined) {
      //console.log('found css !!!')
      return css
    }
  }
  const css = transform7(transform6(transform5(transform4(transform3(transform2(
    transform1(style, props),
    [
      widget.commonProps, // поиск через ===
      widget.props, // поиск через ===
      widget.commonStates, // поиск через startsWith
      widget.states, // поиск через startsWith
      widget.elems, // поиск через startsWith
      undefined, // поиск через startsWith
      undefined, // поиск через startsWith
      undefined, // поиск через startsWith
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

