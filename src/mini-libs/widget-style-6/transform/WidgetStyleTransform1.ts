import { StringU } from '@utils/common/StringU.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import { isStyleValue, StyleValue, WidgetStyleWithProps } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import isobject = TypeU.isobject
import isArray = TypeU.isArray
import capitalize = StringU.capitalize
import isfunction = TypeU.isfunction



export type FlatStyleTf1 = Map<string, StyleValue>

export function transform1<Props>(
  style: WidgetStyleWithProps<Props>,
  props: NoInfer<Props>,
  flatStyle: FlatStyleTf1 = new Map(),
  baseSelectProp = ''
): FlatStyleTf1 {
  if (isStyleValue(style)) {
    flatStyle.set(baseSelectProp, style)
  }
  else if (isArray(style)) {
    if (isStyleValue(style)) {
      flatStyle.set(baseSelectProp, style)
    }
    else {
      style.forEach(s => {
        flatStyle = transform1(s, props, flatStyle, baseSelectProp)
      })
    }
  }
  else if (isfunction(style)) {
    flatStyle = transform1(style(props), props, flatStyle, baseSelectProp)
  }
  else if (isobject(style)) for (let [prop, subStyle] of Object.entries(style)) {
    if (baseSelectProp) prop = baseSelectProp + capitalize(prop)
    // Optimization
    if (isfunction(subStyle)) subStyle = subStyle(props)
    // Optimization
    if (isStyleValue(subStyle)) flatStyle.set(prop, subStyle)
    else {
      flatStyle = transform1(subStyle, props, flatStyle, prop)
    }
  }
  return flatStyle
}






