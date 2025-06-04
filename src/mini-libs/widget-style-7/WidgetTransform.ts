import { TypeU } from '@util/common/TypeU.ts'
import {
  WidgetElemPropReplacer,
  WidgetElemPropReplacers,
  WidgetSelectorToElemPropReplacers,
  WidgetSelectorToElemReplacers,
  WidgetSelectorToElemStateReplacers, WidgetStyleReplacer,
} from 'src/mini-libs/widget-style-7/WidgetConfig.ts'
import isfunction = TypeU.isfunction
import isArray = TypeU.isArray
import isobject = TypeU.isobject
import isundef = TypeU.isundef
import isnull = TypeU.isnull
import isbool = TypeU.isbool
import isnumstr = TypeU.isnumstr
import { BuiltWidget, WidgetBuiltElemsRecord, WidgetElem } from './WidgetBuildedConfig'



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



const addThisToSelector = (selector: string): string => {
  if (selector[0] === '.' || selector[0] === '#') return '&' + selector
  return selector
}




// Element selector: '.elemClass'
const getElemSelector = (elemClass: string): string => elemClass && `.${elemClass}`

const getWidgetElemSelector = (elem: WidgetElem): string => {
  let sel = getElemSelector(elem.className)
  if (elem.upElem) {
    sel = getWidgetElemSelector(elem.upElem) + (elem.upSelector ?? '') + sel
  }
  return sel
}
const getWidgetElemSelectorUnderRoot = (elem: WidgetElem): string => {
  let sel = getElemSelector(elem.className)
  if (elem.upElem) {
    sel = getWidgetElemSelectorUnderRoot(elem.upElem) + (elem.upSelector ?? '') + sel
  }
  return sel
}
const getRootAndElemSelector = (elem: WidgetElem): [root: string, elemSel: string] => {
  const thisSel = getElemSelector(elem.className)
  let root = ''
  let sel = ''
  if (elem.upElem) {
    [root, sel] = getRootAndElemSelector(elem.upElem)
    sel += (elem.upSelector ?? '') + thisSel
  }
  else root = thisSel
  return [root, sel]
}




export function transform<Props>(
  style: GetOrWidgetStyle<Props>,
  props: NoInfer<Props>,
  builtWidget: BuiltWidget,
): WidgetStyle {
  if (isundef(style)) return style
  else if (isfunction(style)) {
    return transform(style(props), props, builtWidget)
  }
  else if (isArray(style)) {
    return style.map(s => transform(s, props, builtWidget))
  }
  else if (isobject(style)) {
    let currOutObj: WidgetStyle & object = { }
    const outArray: WidgetStyle[] = [currOutObj]
    
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
          let tf = transform
          const replacer = (() => {
            if (g.wState) return undefined
            else if (g.wElem) {
              const builtElem = builtWidget.elems[propMatch]
              if (builtElem) {
                let elemSel = getWidgetElemSelector(builtElem)
                if (elemSel) {
                  elemSel = addThisToSelector(elemSel)
                  return subStyle => ({ [elemSel]: subStyle })
                }
              }
            }
            else if (g.wElemState) {
              const builtElem = builtWidget.elems['$button']
              if (builtElem) {
                const elemStateReplacer = (
                  builtElem.states[propMatch] as WidgetStyleReplacer<Props> | undefined
                )
                return elemStateReplacer
              }
            }
            else if (g.prop) {
              if (isPrimitiveStyleValue(subStyle)) {
                tf = (v => v) as typeof transform
                const builtElem = builtWidget.elems['$button']
                if (builtElem) {
                  const elemPropReplacer = (
                    builtElem.props[propMatch] as WidgetElemPropReplacer | undefined
                  )
                  return elemPropReplacer as WidgetStyleReplacer<Props> | undefined
                }
              }
            }
          })()
          
          
          if (replacer) {
            if (propRest) {
              propRest = addThisToSelector(propRest)
              return tf(replacer({ [propRest]: subStyle }), props, builtWidget)
            }
            return tf(replacer(subStyle), props, builtWidget)
          }
          else {
            propStart += propMatch
            if (propRest) {
              propRest = addThisToSelector(propRest)
              return tf({ [propRest]: subStyle }, props, builtWidget)
            }
            return tf(subStyle, props, builtWidget)
          }
        }
        else {
          return transform(subStyle, props, builtWidget)
        }
      })()
      
      
      
      //console.log('propStart, propMatch, propRest:', propStart, propMatch, propRest)
      //console.log('replacer', replacer)
      
      if (propStart) {
        currOutObj[propStart] = styleReplacer
      }
      else {
        outArray.push(styleReplacer)
        currOutObj = { }
        outArray.push(currOutObj)
      }
    }
    
    if (outArray.length === 1) return outArray[0]
    return outArray
  }
  else {
    throw new Error(
      `Style container must be function or array or object or undefined, but is: ${style}`
    )
  }
}





