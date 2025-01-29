import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { AdditionalProps, CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { AppStyle, AppWidgetStyle, WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'




export namespace SvgIconS6 {
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const icon = WidgetElem.of({
      className: 'rruiIcon',
      ...up,
      states: CommonStates,
      // TODO Style - think about it
      // 'color' & '--color' will be passed via WidgetProps
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
  
  
  export namespace SWidget {
    
    export const base: WidgetStyle = {
      icon: {
        sz: 'auto',
        color: '#6A6A6A',
        colorAcc: '#006A6A',
      },
    }
    
    export namespace Normal {
      export const normal: AppWidgetStyle = t => [base, {
        iconColor: t.boxNormal.ct1b[0],
        iconColorAcc: t.boxNormal.ct1b[0],
      }]
    }
    
  }
  
  
  export namespace S {
    export const base = () => W.t(SWidget.base)
    export namespace Normal {
      export const normal: AppStyle = t => W.t(SWidget.Normal.normal(t))
    }
  }
  
  
}
