import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { Transformed4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'





// Media selector
// '@media (hover: hover) and (pointer: fine)'
const getMediaSelector = (media: string) => media && `@media ${media}`
// Element selector
// '.elemClass'
const getElemSelector = (elemName: string): string => elemName && `.${elemName}`
// Pseudo element selector
// '::elem'
const getPseudoElemSelector = (elemName: string): string => elemName && `::${elemName}`
// Attr selector
// '[direction=vertical]'
const getAttrSelector = (attr: string, value = '') => {
  const nameValue = (() => {
    const name = attr
    if (!name) return ''
    if (!value) return name
    return `${name}=${value}`
  })()
  
  return nameValue && `[${nameValue}]`
}
// Pseudo class selector
// ':hover'
const getPseudoSelector = (pseudo: string) => pseudo && `:${pseudo}`
// Prop-value selector
// 'background: black;'
const getPropValueSelector = (prop: string, value: string = '') => {
  return value && `${prop}: ${value};`
}



const getWidgetElemSelector = (elem: WidgetElem): string => {
  let sel = getElemSelector(elem.className)
  if (elem.upElem) sel = getWidgetElemSelector(elem.upElem) + (elem.upSelector ?? '') + sel
  return sel
}
const getWidgetElemSelectorUnderRoot = (elem: WidgetElem): string => {
  let sel = getElemSelector(elem.className)
  if (elem.upElem) sel = getWidgetElemSelectorUnderRoot(elem.upElem) + (elem.upSelector ?? '') + sel
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



export type SelectPropValueTf5 = {
  selector: string[]
  propValue: string
}
export function transform5(dataList: Transformed4[]): SelectPropValueTf5[] {
  const selectorProp = dataList.map(data => {
    
    const selector = data.medias.map(m => getMediaSelector(m.media))
    
    
    const elemsData = data.elems.map(elem => {
      const stateSel = elem.states.map(s => {
        if (s.type === 'pseudoElem') {
          return getPseudoElemSelector(s.pseudoElem.pseudoElem)
        }
        if (s.type === 'pseudo') {
          return getPseudoSelector(s.pseudo.pseudo)
        }
        if (s.type === 'attr') {
          return getAttrSelector(s.attr.attr, s?.value?.value)
        }
        throw new Error(`Unknown element state: ${s}`)
      }).join('')
      
      const el = elem.elem
      if (el) {
        const [root, sel] = getRootAndElemSelector(el)
        return { root, sel, stateSel }
      }
      return { root: '', sel: '', stateSel }
    })
    
    
    let elemsStatesSel = ''
    elemsData.forEach((elem, i, arr) => {
      if (i === arr.length - 1) {
        elemsStatesSel = `${elem.root}${elemsStatesSel}${elem.sel}${elem.stateSel}`
      }
      else {
        if (elem.sel && elem.stateSel) elemsStatesSel += `:has(${elem.sel}${elem.stateSel})`
        else elemsStatesSel += elem.stateSel
      }
    })
    // TODO Style - optional &
    if (elemsStatesSel) elemsStatesSel = `&${elemsStatesSel}`
    selector.push(elemsStatesSel)
    
    
    const prop = data.prop.prop
    const value = data.prop.value?.value
    let propValue = ''
    if (prop && value !== undefined && value !== '') {
      const p = prop.prop
      const v = (() => {
        if (prop.transformValue) return prop.transformValue(value) + ''
        return `${value}`
      })()
      propValue = getPropValueSelector(p, v)
    }
    
    
    return { selector, propValue } as SelectPropValueTf5
  })
  return selectorProp
}




