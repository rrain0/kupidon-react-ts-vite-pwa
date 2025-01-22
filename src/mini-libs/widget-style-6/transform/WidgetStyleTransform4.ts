import { ArrayU } from '@util/common/ArrayU.ts'
import { Transformed3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import lastI = ArrayU.lastI





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
const getPropValueSelector = (prop: string, value: string = '') => value && `${prop}: ${value};`



export type SelectPropValueTf4 = {
  selector: string[]
  propValue: string
}
export function transform4(dataList: Transformed3[]): SelectPropValueTf4[] {
  const selectorProp = dataList.map(data => {
    
    const selector = data.medias.map(m => getMediaSelector(m.media))
    
    selector.push('')
    const elems = data.elems
    for (let elI = elems.length - 1; elI >= 0; elI--) {
      const element = elems[elI]
      
      const ss = element.states
      for (let si = ss.length - 1; si >= 0; si--) {
        const s = ss[si]
        if (s.type === 'pseudoElem') {
          const lastSel = selector.at(-1)!
          selector[lastI(selector)] = `${getPseudoElemSelector(s.pseudoElem.pseudoElem)}${lastSel}`
        }
        if (s.type === 'pseudo') {
          const lastSel = selector.at(-1)!
          selector[lastI(selector)] = `${getPseudoSelector(s.pseudo.pseudo)}${lastSel}`
        }
        else if (s.type === 'attr') {
          const lastSel = selector.at(-1)!
          selector[lastI(selector)] = `${getAttrSelector(s.attr.attr, s?.value?.value)}${lastSel}`
        }
      }
      
      const el = element.elem
      if (el) {
        const lastSel = selector.at(-1)!
        selector[lastI(selector)] = `${getElemSelector(el.elem)}${lastSel}`
      }
    }
    
    
    const prop = data.prop.prop
    const value = data.prop.value?.value
    let propValue = ''
    if (prop && value) {
      const p = prop.prop
      const v = prop.transformValue?.(value) ?? `${value}`
      propValue = getPropValueSelector(p, v)
    }
    
    
    return { selector, propValue } as SelectPropValueTf4
  })
  return selectorProp
}




