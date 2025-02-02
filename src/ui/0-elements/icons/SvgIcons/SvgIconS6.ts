import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { AdditionalProps } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle,
  WidgetStyle, WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'




export namespace SvgIconS6 {
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const icon = WidgetElem.of({
      ...up, className: 'rruiIcon',
      props: { 
        size: AdditionalProps.varSize,
        sz: AdditionalProps.varSize,
        color: AdditionalProps.varColor,
        colorAcc: AdditionalProps.varAccentColor,
      },
    })
    return { icon } as const
  }
  
  
  const WidgetElems = buildWidgetElems()
  
  export const W = Widget.of({
    rootElem: WidgetElems.icon,
    elems: WidgetElems,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace S {
    
    export const base: WidgetStyleObj = {
      icon: {
        sz: 'auto',
      },
    }
    
    export const baseColor: AppWidgetStyle = t => ({
      icon: {
        color: '#6A6A6A',
        colorAcc: '#006A6A',
      },
    })
    
    export namespace Normal {
      export const normal: AppWidgetStyle = t => [base, baseColor, {
        iconColor: t.boxNormal.ct1b[0],
        iconColorAcc: t.boxNormal.ct1b[0],
      }]
    }
    
  }
  
  
}
