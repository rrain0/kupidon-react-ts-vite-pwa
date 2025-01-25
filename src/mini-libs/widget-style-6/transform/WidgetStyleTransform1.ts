import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { StyleValue, WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import isobject = TypeU.isobject
import isArray = TypeU.isArray
import capitalize = StringU.capitalize




export type FlatStyleTf1 = Map<string, StyleValue>

export function transform1(
  style: WidgetStyle,
  flatStyle: FlatStyleTf1 = new Map(),
  baseSelectProp = ''
): FlatStyleTf1 {
  if (isArray(style)) style.forEach(s => {
    flatStyle = transform1(s, flatStyle, baseSelectProp)
  })
  else if (isobject(style)) for (const [prop, subStyle] of Object.entries(style)) {
    let p = prop
    if (baseSelectProp) p = baseSelectProp + capitalize(prop)
    if (isobject(subStyle)) {
      flatStyle = transform1(subStyle, flatStyle, p)
    }
    else {
      flatStyle.set(p, subStyle)
    }
  }
  return flatStyle
}






