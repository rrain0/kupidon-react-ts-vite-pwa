import { TypeU } from '@util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import isArray = TypeU.isArray
import isnumber = TypeU.isnumber
import isstring = TypeU.isstring


// TODO Allow insert raw string css
function rawCss(string: TemplateStringsArray, ...args: any[]): string {
  return ''
}
const withRawCss = {
  button1: 'background-color: black;',
  button2: [
    'background-color: black;',
    {
      bgColor: 'white',
    },
    'background-color: indianred;',
    {
      bgColor: 'blue',
    },
  ],
  // it will not work
  button3: `:where(${{ inFocus: {
    boxShadow: null,
  } }})`,
  // it will not work
  button4: rawCss`:where(${{ inFocus: {
    boxShadow: null,
  } }})`,
  
  
  // 'where' will get inside only next selector entity:
  // ':where(:hover)>.rruiBox { ... }
  button5WhereHoverBox: { bgColor: 'white' },
  // 'where' will get inside only next object keys-selectors:
  // ':where(:active)>.rruiBox { ... }
  // ':where(:hover:,focus-visible)>.rruiBox { ... }
  button6Where: {
    active: { boxBgColor: 'blue' },
    inFocus: { boxBgColor: 'blue' },
  },
  where: {
    active: { buttonBoxBgColor: 'blue' },
    inFocus: { buttonBoxBgColor: 'blue' },
  },
}


export type StyleVal =
  | string // pass as is if there are no special values or transformations
  | number // transform to fractions or pixels
  | null // set empty value (e.g. background: none, color: transparent, padding: 0)
  | undefined // will not be rendered to css as if prop not exists

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



