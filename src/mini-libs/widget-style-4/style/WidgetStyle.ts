
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { CssElem } from 'src/mini-libs/widget-style-4/css/CssElem.ts'
import isnumber = TypeU.isnumber
import isobject = TypeU.isobject
import { CssPseudos } from 'src/mini-libs/widget-style-4/css/CssPseudo.ts'
import { CssAttr } from 'src/mini-libs/widget-style-4/css/CssAttr.ts'
import { useThis } from 'src/mini-libs/widget-style-4/css/CssState.ts'
import { transformers } from 'src/mini-libs/widget-style-4/style/Transformers.ts'
import { CssWidget } from 'src/mini-libs/widget-style-4/widget/CssWidget.ts'
import uncapitalize = StringU.uncapitalize
import camelCaseToUpperCase = StringU.camelCaseToKebabCase




export function testDevWidgetStyle4() {
  {
    const frame = new CssElem('rruiFrame', {
      hover: CssPseudos.hover,
    }, { })
    const box = new CssElem('rruiBox', {
      hover: CssPseudos.hover,
    }, { })
    
    const widget = CssWidget
      .ofRoot('frame', frame)
      .add('frame', '>', 'box', box)
    
    // .frame > .box
    const s: Style = {
      background: '#c0ffee',
      size: 'full',
      frameHoverBg: 'green', // frame: { hover: { bg: 'green' } }
      boxSz: '50%', // { box: { sz: '50%' } }
      boxBg: 'white', // { box: { bg: 'white' } }
      frameHoverBoxBg: 'indianred', // frame: { hover: { box: { bg: 'green' } } }
      // not registered property will be kebab-cased and passed to styles
      flexGrow: '1',
      // not supported yet
      //afterBg: 'red',
      // not supported yet
      //hoverBoxSz: '60%', // frame: { hover: { box: { sz: '60%' } } }
    }
    
    const widgetStyle = new WidgetStyle(widget)
    const transformData = widgetStyle.styleToTransformData(s)
    console.log('transformData', transformData)
    const unpackedTransformData = widgetStyle.transformDataToUnpackedTransformData(transformData)
    console.log('unpackedTransformData', unpackedTransformData)
    const styleString = widgetStyle.unpackedTransformDataToStyleString(unpackedTransformData)
    console.log('styleString:', '\n' + styleString)
    
  }
}





export type StyleValue =
  | string // pass as is if there are no special values or transformations
  | number // transform to fractions or pixels
  | null // set empty value (background: none, color: transparent)
  | undefined // remove value definition

export interface Style {
  [prop: string]: StyleValue /* | Style */
}

export type TransformData = {
  elem?: string | undefined
  state?: string | undefined
  prop?: string | undefined
  value?: StyleValue | undefined
  media?: string | undefined
}

export type Transformer = (data: TransformData[]) => TransformData[][]
export type Transformers = Record<string, Transformer>


export class WidgetStyle {
  
  constructor(
    readonly widget: CssWidget<any>,
  ) { }
  
  
  
  styleToTransformData(style: Style): TransformData[][] {
    const data: TransformData[][] = []
    
    Object.entries(style).forEach(([styleSelector, value]) => {
      const d: TransformData[] = []
      
      loop: while (true) {
        if (!styleSelector.length) break
        styleSelector = uncapitalize(styleSelector)
        
        // Check element
        {
          const elemNames = Object.keys(this.widget.elements)
          for (const elemName of elemNames) {
            if (styleSelector.startsWith(elemName)) {
              styleSelector = styleSelector.slice(elemName.length)
              d.push({ elem: elemName })
              continue loop
            }
          }
        }
        
        // Check element state
        {
          const e = d.at(-1)?.elem
          if (e) {
            const stateNames = Object.keys(this.widget.elements[e].element.states)
            for (const stateName of stateNames) {
              if (styleSelector.startsWith(stateName)) {
                styleSelector = styleSelector.slice(stateName.length)
                if (!d.length) d.push({ })
                d.at(-1)!.state = stateName
                continue loop
              }
            }
          }
        }
        
        // Check property
        {
          if (!d.length) d.push({ })
          d.at(-1)!.prop = camelCaseToUpperCase(styleSelector)
          d.at(-1)!.value = value
          styleSelector = ''
        }
        
        //throw new Error(`Unknown style selector "${styleSelector}"`)
      }
      
      data.push(d)
    })
    
    return data
  }
  
  transformDataToUnpackedTransformData(transformData: TransformData[][]): TransformData[][] {
    return transformData.flatMap(d => {
      return transformers.hover(d).flatMap(it => transformers[d.at(-1)!.prop!]?.(it) ?? [it])
    })
  }
  
  // use WidgetElement selector
  // todo add other elements' states
  // todo batch nearest props' classes
  unpackedTransformDataToStyleString(transformData: TransformData[][]): string {
    const selectorToPropValues: [selector: string, propValue: string][] = []
    transformData.forEach(dd => {
      let propValue = ''
      let selector = ''
      let selectTargetElem: ((selectorUnderRoot: string) => string) | undefined = undefined
      let media = ''
      let pseudoElem = ''
      const underRootSelectors: string[] = []
      
      dd.toReversed().forEach(d => {
        if (d.prop && d.value) {
          propValue = `${d.prop}: ${d.value};`
        }
        if (d.media) {
          media = `@media ${d.media}`
        }
        if (d.elem) {
          if (['::before', '::after'].includes(d.elem)) {
            pseudoElem = d.elem
          }
          else {
            const elem = this.widget.elements[d.elem]
            if (!selectTargetElem) {
              selectTargetElem = sel => elem.useWithRootStateSelector(sel, {
                ...d.state && { [d.state]: true },
              })
            }
            else {
              underRootSelectors.push(elem.useStateUnderRoot({
                ...d.state && { [d.state]: true },
              }))
            }
          }
        }
      })
      if (selectTargetElem) {
        // @ts-expect-error
        selector = `${selectTargetElem(underRootSelectors.join(''))}`
      }
      if (media) propValue = `${media} { ${propValue} }`
      selector += pseudoElem
      if (selector) selector = useThis(selector)
      
      selectorToPropValues.push([selector, propValue])
    })
    
    const groupedBySelector: Record<string, string[]> = { }
    selectorToPropValues.forEach(([selector, propValue]) => {
      groupedBySelector[selector] ??= []
      groupedBySelector[selector].push(propValue)
    })
    
    let style = ''
    Object.entries(groupedBySelector).forEach(([selector, propValues]) => {
      const propValuesStr = '\n' + propValues.join('\n') + '\n'
      style += `${selector} { ${propValuesStr} }\n`
    })
    
    return style
  }
  
}


