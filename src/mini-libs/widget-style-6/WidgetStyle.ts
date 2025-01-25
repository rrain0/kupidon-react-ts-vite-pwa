import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'


export type StyleVal =
  | string // pass as is if there are no special values or transformations
  | number // transform to fractions or pixels
  | null // set empty value (background: none, color: transparent)
  | undefined // remove value definition

export type StyleValue = StyleVal /* | StyleVal[] */



// export type WidgetS = { [selectorProp: string]: StyleValue | WidgetS | WidgetS[] }
// export type WidgetStyle = WidgetS | WidgetStyle[]

export type WidgetStyle =
  | { [selectorProp: string]: StyleValue | WidgetStyle | WidgetStyle[] }
  | WidgetStyle[]


export type AppWidgetStyle = (theme: AppTheme.Theme) => WidgetStyle



