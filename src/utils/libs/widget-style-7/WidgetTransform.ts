import { isRecordAndEmpty, isEmptyObj, getPairOfSingleKeyObj } from 'src/utils/base/ObjectU.ts'
import { Pair } from '@utils/js/Pair.ts'
import {
  WidgetElemPropReplacer, WidgetState,
  WidgetStyleReplacer,
} from '@libs/widget-style-7/WidgetConfig.ts'
import { isfunction } from 'src/utils/base/typeUtils.ts'
import { isArray } from 'src/utils/base/typeUtils.ts'
import { isobject } from 'src/utils/base/typeUtils.ts'
import { isundef } from 'src/utils/base/typeUtils.ts'
import { isnull } from 'src/utils/base/typeUtils.ts'
import { isbool } from 'src/utils/base/typeUtils.ts'
import { isnumstr } from 'src/utils/base/typeUtils.ts'
import { BuiltWidget, WidgetElem } from './WidgetBuildedConfig.ts'
import { Pu } from 'src/utils/base/typeUtils.ts'
import { isRecord } from 'src/utils/base/typeUtils.ts'
import { isstring } from 'src/utils/base/typeUtils.ts'



export type PrimitiveStyleValue =
  // Skipped
  // ['value', undefined] => ['value']
  // { key: 'value', key2: undefined } => { key: 'value' }
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
  | GetWidgetStyle<Props>
  | Pair<string, GetOrWidgetStyle<Props>>
  | { [selectorProp: string]: GetOrWidgetStyle<Props> }
  | GetOrWidgetStyle<Props>[]


{
  // CSS identifier pattern
  const cssIdfPattern = /-?[_a-zA-Z]+[_a-zA-Z0-9-]*/
  // CSS identifier delimiters
  const delim = '([#.&,>+~:@{]|\\s|$)'
}




// CSS identifier pattern
const cssIdf = '-?[_a-zA-Z]+[_a-zA-Z0-9-]*'

type CustomSelectorPatternGroups = {
  openParen: string | undefined
  closeParen: string | undefined
  wState: string | undefined
  wElemState: string | undefined
  wElem: string | undefined
  prop: string | undefined
}
export const cssTokenPattern = new RegExp([
  // '(' - open paren
  `(?<openParen>[(])`,
  // ')' - close paren
  `(?<closeParen>[)])`,
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



const prependWithNestingSel = (selector: string): string => {
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


const getWidgetElemSelParts = (elem: WidgetElem): string[] => {
  const selParts = [] as string[]
  const elemSel = getElemSelector(elem.className)
  selParts.unshift(elemSel)
  if (elem.upElem) {
    const upSelector = elem.upSelector ?? ''
    const upElemSelParts = getWidgetElemSelParts(elem.upElem)
    selParts.unshift(...upElemSelParts, upSelector)
  }
  return selParts
}




export function transform<Props>(
  style: GetOrWidgetStyle<Props>,
  props: NoInfer<Props>,
  widget: BuiltWidget,
  context: Pu<{
    '(': number
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
          const mi = m.index!
          propStart = prop.substring(0, mi)
          const propMatch = m[0]
          const groups = m.groups as CustomSelectorPatternGroups
          const propRest = prop.substring(mi + propMatch.length)
          let nextTransform = transform as typeof transform | undefined
          const replacer = (() => {
            if (groups.wState) {
              const wState = widget.widgetStates[propMatch] as WidgetState | undefined
              context = { ...context, widgetState: wState }
              return undefined
            }
            else if (groups.wElem) {
              const elem = widget.elems[propMatch] as WidgetElem | undefined
              const elemSelParts = elem ? getWidgetElemSelParts(elem).join('') : undefined
              if (elemSelParts) {
                context.elem = propMatch
                return subStyle => ({ [prependWithNestingSel(elemSelParts)]: subStyle })
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
          
          if (propRest) subStyle = { [prependWithNestingSel(propRest)]: subStyle }
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



function simplifyWidgetStyle(
  style: WidgetStyle | Pair<string, WidgetStyle>
): WidgetStyle | Pair<string, WidgetStyle> {
  if (isArray(style)) {
    if (style.length === 0) return { }
    else if (style.length === 1) style = style[0]
    else return style
  }
  if (isRecord(style) && style !instanceof Pair) {
    if (isEmptyObj(style)) return { }
    else {
      const pair = getPairOfSingleKeyObj(style)
      if (pair) style = pair
      else return style
    }
  }
  if (style instanceof Pair) {
    if (isundef(style.v)) return undefined
    else if (isRecordAndEmpty(style.v)) return style.k
    else return style
  }
  return style
}



function getNestedStyle(
  key: string, style: WidgetStyle
): WidgetStyle {
  if (key) return { [key]: style }
  return style
}




// TODO убирать контекст, если пошёл следующий элемент через селекторы > + ~...
// TODO :where($button,.clss) \???
// TODO :where(:$hover) ???
// TODO widgetElem заменять на строку, а не объект
export function transform_v2<Props>(
  style: GetOrWidgetStyle<Props>,
  props: NoInfer<Props>,
  widget: BuiltWidget,
  context: {
    '(': number
    widgetState?: WidgetState | undefined
    elem?: string | undefined
  } = { '(': 0 },
): Pu<{
  '@': GetWidgetStyle<Props>
  len: number
  style: WidgetStyle
}> {
  if (isstring(style)) {
    return transform_v2(Pair.of(style, { }), props, widget, { ...context })
  }
  else if (style instanceof Pair) {
    // To detect css property, we need to know that value is primitive
    const value = style.v
    const sel = style.k
    let processedSel = ''
    let si = 0
    let hasOpenParen = false
    
    while (si < sel.length) {
      const currSel = sel.substring(si)
      const m = currSel.match(cssTokenPattern)
      
      // Если нет матча, то вся строка закончилась
      if (!m) {
        processedSel += currSel
        break
      }
      
      const mi = m.index!
      const groups = m.groups as CustomSelectorPatternGroups
      const beforeMatch = currSel.substring(0, mi)
      const match = m[0]
      const ni = mi + match.length
      const rest = currSel.substring(ni)
      
      //console.log('match', match, 'ni', ni, 'rest', rest)
      
      si += ni
      processedSel += beforeMatch
      
      if (groups.openParen) {
        hasOpenParen = true
        processedSel += '('
        const nestedData = transform_v2(rest, props, widget, {
          ...context, '(': context['('] + 1,
        })
        //console.log('nestedData.len', nestedData.len)
        si += nestedData.len ?? 0
        // TODO process @
        const nested = simplifyWidgetStyle(nestedData.style)
        if (isstring(nested)) { processedSel += nested }
      }
      else if (groups.closeParen) {
        if (hasOpenParen) {
          hasOpenParen = false
          processedSel += ')'
        }
        else return { len: si - 1, style: processedSel }
      }
      else if (groups.wState) {
        processedSel += match
      }
      else if (groups.wElemState) {
        processedSel += match
      }
      else if (groups.wElem) {
        processedSel += match
      }
      else if (groups.prop && isPrimitiveStyleValue(value)) {
        const replacer = widget.anyElemProps[match]
        // TODO drop prop if inside (...)
        if (replacer) {
          const replaced = getNestedStyle(
            processedSel,
            transform_v2(replacer(value),  props, widget, { ...context }).style
          )
          return { len: sel.length, style: replaced }
        }
        else {
          processedSel += match
        }
      }
      else {
        processedSel += match
      }
    }
    
    return {
      len: sel.length,
      style: getNestedStyle(
        processedSel,
        transform_v2(value, props, widget, { ...context }).style
      ),
    }
  }
  else if (isfunction(style)) {
    return transform_v2(style(props), props, widget, { ...context })
  }
  else if (isArray(style)) {
    return { style: style.map(s => transform_v2(s, props, widget, { ...context }).style) }
  }
  else if (isobject(style)) {
    if (isEmptyObj(style)) return { }
    
    let currOutObj: WidgetStyle & object | undefined = undefined
    const outArray: WidgetStyle[] = []
    
    // TODO Iterate over string until replacer gives
    //  2+ object props, not primitive nesting, 2+ array items
    for (const [prop, subStyle] of Object.entries(style)) {
      const nested = simplifyWidgetStyle(
        transform_v2(Pair.of(prop, subStyle), props, widget, { ...context }).style
      )
      
      console.log('nested', nested)
      
      if (isArray(nested)) {
        if (currOutObj) outArray.push(currOutObj)
        currOutObj = undefined
        outArray.push(...nested)
      }
      else if (nested instanceof Pair) {
        (currOutObj ??= { })[nested.k] = nested.v
      }
      else if (isobject(nested)) {
        Object.assign((currOutObj ??= { }), nested)
      }
    }
    
    if (currOutObj) outArray.push(currOutObj)
    
    if (outArray.length === 0) return { style: undefined }
    if (outArray.length === 1) return { style: outArray[0] }
    return { style: outArray }
  }
  else {
    return { style }
  }
}





