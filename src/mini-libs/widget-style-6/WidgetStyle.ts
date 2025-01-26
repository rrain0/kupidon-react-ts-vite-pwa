import { TypeU } from '@util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import isArray = TypeU.isArray
import isnumber = TypeU.isnumber
import isstring = TypeU.isstring


export type StyleVal =
  | string // pass as is if there are no special values or transformations
  | number // transform to fractions or pixels
  | null // set empty value (background: none, color: transparent)
  | undefined // remove value definition

export type StyleValue = StyleVal | StyleVal[]



export function isPrimitiveStyleValue<T, SV extends StyleVal>(value: T | SV): value is SV {
  return isstring(value) || isnumber(value) || value === null || value === undefined
}
export function isStyleValue<T, SV extends StyleValue>(value: T | SV): value is SV {
  if (isArray(value)) {
    if (!value.length) return false
    return isPrimitiveStyleValue(value[0])
  }
  return isPrimitiveStyleValue(value)
}



// export type WidgetS = { [selectorProp: string]: StyleValue | WidgetS | WidgetS[] }
// export type WidgetStyle = WidgetS | WidgetStyle[]

export type WidgetStyle =
  | { [selectorProp: string]: StyleValue | WidgetStyle | WidgetStyle[] }
  | WidgetStyle[]


export type AppWidgetStyle = (theme: AppTheme.Theme) => WidgetStyle

export type AppStyle = (theme: AppTheme.Theme) => string



