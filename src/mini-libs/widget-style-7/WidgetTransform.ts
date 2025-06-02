import { TypeU } from '@util/common/TypeU.ts'
import isfunction = TypeU.isfunction
import isArray = TypeU.isArray
import isobject = TypeU.isobject
import isundef = TypeU.isundef
import isnull = TypeU.isnull
import isbool = TypeU.isbool
import isnumstr = TypeU.isnumstr



export type PrimitiveStyleValue =
  // Skipped
  | undefined
  // Absent / Empty / Default
  // background: 'none', color: 'transparent', width: 'auto'
  | null
  // Enabled
  // pointerEvents: 'auto', alignItems: 'center', flexGrow: 1
  | true
  // Disabled
  // pointerEvents: 'none', width: 0
  | false
  // Just number
  // opacity: 1, width: 100
  | number
  // 'unset'
  | ''
  // Just string
  | string


const isPrimitiveStyleValue = <T, P extends PrimitiveStyleValue>(value: T | P): value is P => (
  isundef(value) || isnull(value) || isbool(value) || isnumstr(value)
)



export type WidgetStyle =
  | undefined
  | PrimitiveStyleValue
  | { [selectorProp: string]: WidgetStyle }
  | WidgetStyle[]




export type GetWidgetStyle<Props> = (props: Props) => GetOrWidgetStyle<Props>

export type GetOrWidgetStyle<Props> =
  | undefined
  | PrimitiveStyleValue
  | WidgetStyle
  | { [selectorProp: string]: GetOrWidgetStyle<Props> }
  | GetWidgetStyle<Props>
  | GetOrWidgetStyle<Props>[]


{
  // CSS identifier pattern
  const cssIdfPattern = /-?[_a-zA-Z]+[_a-zA-Z0-9-]*/
  // CSS identifier delimiters
  const delim = '([#.&>+~:@{]|\\s|$)'
}




// CSS identifier pattern
const cssIdf = '-?[_a-zA-Z]+[_a-zA-Z0-9-]*'

type CustomSelectorPatternGroups = {
  wState: string | undefined
  wElemState: string | undefined
  wElem: string | undefined
  prop: string | undefined
}
const customSelectorsPattern = new RegExp([
  // ':!name' - custom widget state
  `(:!(?<wState>${cssIdf}))`,
  // ':$name' - custom elem state
  `(:[$](?<wElemState>${cssIdf}))`,
  // '$name' - custom widget element
  `([$](?<wElem>${cssIdf}))`,
  // 'backgroundColor', 'div' - css prop или html элемент (в том числе кастомный) в селекторе
  // Должно предшествовать начало строки или '{', потом могут быть пробельные символы
  // После могут быть пробельные символы, потом конец строки
  `((?<=(^|{)\\s*)(?<prop>${cssIdf})(?=\\s*$))`,
].join('|'))


export const _wst7TestMatch = () => {
  const testMatch = '.c$button:hover:$hover.cc>.cc $border+:!hover{backgroundColor'
    .match(customSelectorsPattern)
  console.log('_wst7TestMatch', testMatch)
}



const customElemReplacers = {
  button: <Props>(style: GetOrWidgetStyle<Props>): GetOrWidgetStyle<Props> => ({
    '&.rruiButton': style,
  }),
  border: <Props>(style: GetOrWidgetStyle<Props>): GetOrWidgetStyle<Props> => ({
    '&.rruiButton > .rruiBorder': style,
  }),
}
const elemCustomStateReplacers = {
  hoverableHover: <Props>(style: GetOrWidgetStyle<Props>): GetOrWidgetStyle<Props> => ({
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': style,
    },
  }),
}
const customPropReplacers = {
  sz: (style: PrimitiveStyleValue): WidgetStyle => ({
    width: style,
    height: style,
  }),
}

const customElemSelectorToReplacer = {
  '$button': customElemReplacers.button,
  '$border': customElemReplacers.border,
}
const customElemStateSelectorToReplacer = {
  ':$hover': elemCustomStateReplacers.hoverableHover,
}
const customPropToReplacer = {
  sz: customPropReplacers.sz,
}




export function transform<Props>(
  style: GetOrWidgetStyle<Props>,
  props: NoInfer<Props>,
): WidgetStyle {
  if (isfunction(style)) {
    return transform(style(props), props)
  }
  else if (isArray(style)) {
    return style.map(s => transform(s, props))
  }
  else if (isobject(style)) {
    const outStyle: WidgetStyle = { }
    for (const [prop, subStyle] of Object.entries(style)) {
      
      let propStart = prop
      
      const styleReplacer = (() => {
        const m = prop.match(customSelectorsPattern)
        if (m) {
          
          const i = m.index!
          propStart = prop.substring(0, i)
          const propMatch = m[0]
          const g = m.groups as CustomSelectorPatternGroups
          let propRest = prop.substring(i + propMatch.length)
          let t = transform
          const replacer = (() => {
            if (g.wState) return undefined
            else if (g.wElem) return customElemSelectorToReplacer[propMatch]
            else if (g.wElemState) return customElemStateSelectorToReplacer[propMatch]
            else if (g.prop) {
              if (isPrimitiveStyleValue(subStyle)) {
                t = (v => v) as typeof transform
                return customPropToReplacer[propMatch]
              }
            }
          })()
          
          
          if (replacer) {
            if (propRest) {
              if (propRest[0] === '.' || propRest[0] === '#') propRest = '&' + propRest
              return t(replacer({ [propRest]: subStyle }), props)
            }
            return t(replacer(subStyle), props)
          }
          else {
            propStart += propMatch
            if (propRest) {
              if (propRest[0] === '.' || propRest[0] === '#') propRest = '&' + propRest
              return t({ [propRest]: subStyle }, props)
            }
            return t(subStyle, props)
          }
        }
        else {
          return transform(subStyle, props)
        }
      })()
      
      
      
      //console.log('propStart, propMatch, propRest:', propStart, propMatch, propRest)
      //console.log('replacer', replacer)
      
      if (propStart) {
        outStyle[propStart] = styleReplacer
      }
      else {
        Object.assign(outStyle, styleReplacer)
      }
    }
    return outStyle
  }
  else {
    throw new Error(`Style container must be function or array or object, but is: ${style}`)
  }
}




export const _wst7TestTransform = () => {
  const testTransform = transform(
    {
      '.c$button:hover:$hover.cc>.cc $border+:!hover{backgroundColor': {
        sz: 143,
        aa: 'bb',
      },
    },
    undefined
  )
  console.log('_wst7TestTransform', testTransform)
}



