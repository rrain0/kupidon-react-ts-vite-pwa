
import { TypeU } from '@util/common/TypeU.ts'
import { CssElem } from 'src/mini-libs/widget-style/dev/css/CssElem.ts'
import isnumber = TypeU.isnumber
import isobject = TypeU.isobject
import { CssPseudos } from 'src/mini-libs/widget-style/dev/css/CssPseudo.ts'
import { CssAttr } from 'src/mini-libs/widget-style/dev/css/CssAttr.ts'
import { transformers } from 'src/mini-libs/widget-style/dev/style/Transformers.ts'
import { CssWidget } from 'src/mini-libs/widget-style/dev/widget/CssWidget.ts'




export function testDevWidgetStyle() {
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
      // not supported yet
      //hoverBoxSz: '60%', // frame: { hover: { box: { sz: '60%' } } }
    }
    
    const widgetStyle = new WidgetStyle(widget)
    const transformData = widgetStyle.styleToTransformData(s)
    console.log('transformData', transformData)
    const unpackedTransformData = widgetStyle.transformDataToUnpackedTransformData(transformData)
    console.log('unpackedTransformData', unpackedTransformData)
    
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
        styleSelector = styleSelector[0].toLowerCase() + styleSelector.slice(1)
        
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
          d.at(-1)!.prop = styleSelector
          d.at(-1)!.value = value
          break loop
        }
        
        //throw new Error(`Unknown style selector "${styleSelector}"`)
      }
      
      data.push(d)
    })
    
    return data
  }
  
  transformDataToUnpackedTransformData(transformData: TransformData[][]): TransformData[][] {
    return transformData.flatMap(d => {
      return transformers.hover(d).flatMap(it => transformers[d.at(-1)!.prop!](it))
    })
  }
  
}







export namespace WidgetStyle2Test {
  
  
  export type StyleValue =
    | string // pass as is if there are no special values or transformations
    | number // transform to fractions or pixels
    | null // set empty value (background: none, color: transparent)
    | undefined // remove value definition
  
  export interface Style {
    [prop: string]: StyleValue | Style
  }
  
  
  
  export type TransformData0 = {
    media?: string | undefined
    selector?: string | undefined
    prop?: string | undefined
    value?: StyleValue | undefined
  }
  
  export type Transformer = (data: TransformData0) => TransformData0[]
  
  export type Transformers = Record<string, Transformer>
  
  const hoverableMedia = '(hover: hover) and (pointer: fine)'
  
  // todo think about merging media & selector
  export const simpleTransformers = {
    width: d => {
      if (d.prop) return [d]
      d.prop = 'width'
      if (isnumber(d.value)) d.value = `${d.value}px`
      if (d.value === 'full') d.value = '100%'
      return [d]
    },
    height: d => {
      if (d.prop) return [d]
      d.prop = 'height'
      if (isnumber(d.value)) d.value = `${d.value}px`
      if (d.value === 'full') d.value = '100%'
      return [d]
    },
    background: d => {
      if (d.prop) return [d]
      d.prop = 'background'
      if (d.value === null) d.value = 'none'
      return [d] as const
    },
    hover: d => {
      d.media = hoverableMedia
      d.selector = d.selector + ':hover'
      return [d] as const
    },
    active: d => {
      d.selector = d.selector + ':active'
      return [d] as const
    },
    focus: d => {
      d.selector = d.selector + ':focus'
      return [d] as const
    },
    focusVisible: d => {
      d.selector = d.selector + ':focus-visible'
      return [d] as const
    },
    error: d => {
      d.selector = d.selector + '[data-error]'
      return [d] as const
    },
  } satisfies Transformers
  
  export const complexTransformers = {
    // width: <value>; height: <value>;
    size: d => {
      const w = simpleTransformers.width({ ...d })
      const h = simpleTransformers.height({ ...d })
      return [...w, ...h] as const
    },
    // :where(:active,:focus,:focus-visible)
    anyFocus: d => {
      const a = simpleTransformers.active({ ...d })
      const f = simpleTransformers.focus({ ...d })
      const fv = simpleTransformers.focusVisible({ ...d })
      return [...a, ...f, ...fv] as const
    },
    // :where(:hover,:focus-visible)
    inFocus: d => {
      const h = simpleTransformers.hover({ ...d })
      const fv = simpleTransformers.focusVisible({ ...d })
      return [...h, ...fv] as const
    },
    
  } satisfies Transformers
  
  export const elementTransformers = {
    frame: d => {
      d.selector = d.selector + '.frame'
      return [d] as const
    },
    box: d => {
      d.selector = d.selector + ' > .box'
      return [d] as const
    },
  } satisfies Transformers
  
  export const transformers: Transformers = {
    width: simpleTransformers.width,
    w: simpleTransformers.width,
    height: simpleTransformers.height,
    h: simpleTransformers.height,
    background: simpleTransformers.background,
    bg: simpleTransformers.background,
    size: complexTransformers.size,
    sz: complexTransformers.size,
    hover: simpleTransformers.hover,
    hov: simpleTransformers.hover,
    error: simpleTransformers.error,
    err: simpleTransformers.error,
    anyFocus: complexTransformers.anyFocus,
    anyFc: complexTransformers.anyFocus,
    inFocus: complexTransformers.inFocus,
    inFc: complexTransformers.inFocus,
    
    frame: elementTransformers.frame,
    ['']: elementTransformers.frame,
    box: elementTransformers.box,
  }
  
  
  const deconstruct = (
    style: Style,
    // todo use as lexemes tree
    keys: string[],
    transformers: Transformers,
    data: TransformData0[] = [{ }],
    transformed = '',
  ): string => {
    // LOOP !!!
    Object.entries(style).forEach(([styleSelector, value]) => {
      let d = data.map(it => {
        it = { ...it }
        if (!isobject(value)) it.value = value
        return it
      })
      
      // LOOP !!!
      loop: while (true) {
        if (!styleSelector.length) break
        styleSelector = styleSelector[0].toLowerCase() + styleSelector.slice(1)
        for (const key of keys) {
          if (styleSelector.startsWith(key)) {
            styleSelector = styleSelector.slice(key.length)
            // LOOP !!!
            d = d.flatMap(it => transformers[key](it))
            continue loop
          }
        }
        throw new Error(`Unknown style selector "${styleSelector}"`)
      }
      
      console.log('d', d)
      
      if (isobject(value)) transformed = deconstruct(value, keys, transformers, d, transformed)
    })
    
    return transformed
  }
  
  
  export const transform = (style: Style): string => {
    const keys = Object.keys(transformers).sort().reverse()
    return deconstruct(style, keys, transformers)
  }
  
  
}


