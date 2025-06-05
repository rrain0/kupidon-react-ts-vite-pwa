import { TypeU } from '@util/common/TypeU.ts'
import {
  WidgetElemName,
  WidgetElemPropReplacer, WidgetState,
  WidgetStyleReplacer,
} from 'src/mini-libs/widget-style-7/WidgetConfig.ts'
import isfunction = TypeU.isfunction
import isArray = TypeU.isArray
import isobject = TypeU.isobject
import isundef = TypeU.isundef
import isnull = TypeU.isnull
import isbool = TypeU.isbool
import isnumstr = TypeU.isnumstr
import { BuiltWidget, WidgetElem } from './WidgetBuildedConfig'
import Pu = TypeU.Pu



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
export const cssTokenPattern = new RegExp([
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
    .match(cssTokenPattern)
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




// TODO убирать контекст, если пошёл следующий элемент через селекторы > + ~...
// TODO :where($button,.clss) \???
// TODO :where(:$hover) ???
// TODO widgetElem заменять на строку, а не объект
export function transform<Props>(
  style: GetOrWidgetStyle<Props>,
  props: NoInfer<Props>,
  widget: BuiltWidget,
  context: Pu<{
    widgetState: WidgetState
    elem: string
  }> = { },
): WidgetStyle {
  if (isundef(style)) {
    return style
  }
  else if (isfunction(style)) {
    return transform(style(props), props, widget, { ...context })
  }
  else if (isArray(style)) {
    return style.map(s => transform(s, props, widget, { ...context }))
  }
  else if (isobject(style)) {
    let currOutObj: WidgetStyle & object | undefined = undefined
    const outArray: WidgetStyle[] = []
    
    for (let [prop, subStyle] of Object.entries(style)) {
      
      let propStart = prop
      
      const transformedStyle = (() => {
        const m = prop.match(cssTokenPattern)
        if (m) {
          const i = m.index!
          propStart = prop.substring(0, i)
          const propMatch = m[0]
          const groups = m.groups as CustomSelectorPatternGroups
          const propRest = prop.substring(i + propMatch.length)
          let nextTransform = transform as typeof transform | undefined
          const replacer = (() => {
            if (groups.wState) {
              const wState = widget.widgetStates[propMatch] as WidgetState | undefined
              context = { ...context, widgetState: wState }
              return undefined
            }
            else if (groups.wElem) {
              const elem = widget.elems[propMatch] as WidgetElem | undefined
              const elemSel = elem ? getWidgetElemSelector(elem) : undefined
              if (elemSel) {
                context.elem = propMatch
                return subStyle => ({ [addThisToSelector(elemSel)]: subStyle })
              }
            }
            else if (groups.wElemState) {
              const contextElemName = context.elem
              const contextElem = (
                contextElemName ? widget.elems[contextElemName] : undefined
              ) as WidgetElem | undefined
              const stateReplacer = (
                contextElem?.states[propMatch]
                ?? widget.anyElemStates[propMatch]
              ) as WidgetStyleReplacer<Props> | undefined
              return stateReplacer
            }
            else if (groups.prop) {
              if (isPrimitiveStyleValue(subStyle)) {
                nextTransform = undefined
                const contextElemName = context.elem
                const contextElem = (
                  contextElemName ? widget.elems[contextElemName] : undefined
                ) as WidgetElem | undefined
                const propReplacer = (
                  contextElem?.props[propMatch]
                  ?? widget.anyElemProps[propMatch]
                ) as WidgetElemPropReplacer | undefined
                return propReplacer as WidgetStyleReplacer<Props> | undefined
              }
            }
          })()
          
          if (propRest) subStyle = { [addThisToSelector(propRest)]: subStyle }
          if (replacer) subStyle = replacer(subStyle)
          else propStart += propMatch
          if (nextTransform) return nextTransform(subStyle, props, widget, { ...context })
          return subStyle as PrimitiveStyleValue
        }
        else {
          return transform(subStyle, props, widget, { ...context })
        }
      })()
      
      
      
      //console.log('propStart, propMatch, propRest:', propStart, propMatch, propRest)
      //console.log('replacer', replacer)
      
      if (propStart) {
        (currOutObj ??= { })[propStart] = transformedStyle
      }
      else {
        if (currOutObj) outArray.push(currOutObj)
        currOutObj = undefined
        outArray.push(transformedStyle)
      }
    }
    
    if (currOutObj) outArray.push(currOutObj)
    
    if (outArray.length === 0) return undefined
    if (outArray.length === 1) return outArray[0]
    return outArray
  }
  else {
    throw new Error(
      `Style container must be function or array or object or undefined, but is: ${style}`
    )
  }
}





