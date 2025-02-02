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
  // absence of property - will not be rendered to
  | undefined
  // transform to empty value
  // background: none, color: transparent, width: undefined
  | null
  // transform to undefined
  | ''
  // transform to some meaningful enabled value
  // pointer-events: auto
  | true
  // transform to some meaningful disabled value
  // pointer-events: none, width: 0
  | false
  // transform to string or px
  // opacity: 1, width: 100px
  | number
  // usually pass as is except special values or cases
  | string

export type StyleValue = StyleVal | StyleVal[]


// TODO Style - CssValue type
type CssValue = undefined | Exclude<string, ''>



export function isPrimitiveStyleValue<T, SV extends StyleVal>(value: T | SV): value is SV {
  return isstring(value) || isnumber(value)
    || value === true || value === false
    || value === null || value === undefined
}
export function isStyleValue<T, SV extends StyleValue>(value: T | SV): value is SV {
  if (isArray(value)) {
    if (!value.length) return false
    return isPrimitiveStyleValue(value[0])
  }
  return isPrimitiveStyleValue(value)
}




// TODO Доделать StyleValue в перемешку с остальным
// Если быть точным в массиве пока что может быть или StyleValue или всё остальное, но не в перемешку

export type WidgetStyle =
  | StyleValue
  | { [selectorProp: string]: WidgetStyle }
  | WidgetStyle[]


export type WidgetStyleObj = { [selectorProp: string]: WidgetStyle }


export type GetWidgetStyleWithProps<Props> = (props: Props) => WidgetStyleWithProps<Props>

export type WidgetStyleWithProps<Props> =
  | StyleValue
  | WidgetStyle
  | { [selectorProp: string]: WidgetStyleWithProps<Props> }
  | GetWidgetStyleWithProps<Props>
  | WidgetStyleWithProps<Props>[]




export type AppWidgetStyle = WidgetStyleWithProps<AppTheme.Theme>

export type AppStyle = (theme: AppTheme.Theme) => string



