import { AdditionalProps } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { AppStyle, AppWidgetStyle, WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import {
  WidgetElem, WidgetProp,
} from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import abs = WidgetStyleCommon.abs
import round = WidgetStyleCommon.round



export namespace RippleS6 {
  
  export type RippleMode = 'center' | 'pointer'
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const frame = WidgetElem.of({
      className: 'rruiRippleFrame',
      ...up,
    })
    const ripple = WidgetElem.of({
      className: 'rruiRippleRipple',
      upElem: frame, upSelector: '>',
      props: {
        color: AdditionalProps.varColor,
        // values: 'center' | 'pointer'
        mode: WidgetProp.ofName('--mode'),
      },
    })
    return { frame, ripple } as const
  }
  
  const WidgetElems = buildWidgetElems()
  
  export const W = Widget.of({ rootElem: WidgetElems.frame, elems: WidgetElems })
  
  
  export namespace SWidget {
    
    export const base: WidgetStyle = {
      frame: {
        ...abs,
        pointerEvents: 'none',
        r: 'inherit',
        overflow: 'hidden',
      },
      ripple: {
        pos: 'abs',
        translate: '-50% -50%',
        ...round,
        /*background-image: radial-gradient(
         closest-side circle at center,
         transparent, var(--bg-color) 90%, transparent
         );*/
        color: '#ffffff66',
        mode: 'pointer',
        // TODO Style bgColor: '@rippleColor'
        // TODO Style bgColor: 'varRippleColor'
        bgColor: `var(${W.els.ripple.ps!.color.n})`,
      },
    }
    
    export namespace OnFilled {
      export const accent: AppWidgetStyle = t => [base, {
        rippleColor: t.ripple.ct,
      }]
      export const normal: AppWidgetStyle = t => [base, {
        rippleColor: t.ripple.ctOnTransparent,
      }]
    }
    
    export const onText: AppWidgetStyle = t => [base, {
      rippleColor: t.ripple.ctOnTransparent,
    }]
    
    export const forIcon: AppWidgetStyle = t => [base, {
      rippleMode: 'center',
      rippleColor: t.ripple.ctOnTransparent,
    }]
    
  }
  
  
  export namespace S {
    export const base = () => W.t(SWidget.base)
    export namespace OnFilled {
      export const normal: AppStyle = t => W.t(SWidget.OnFilled.normal(t))
      export const accent: AppStyle = t => W.t(SWidget.OnFilled.accent(t))
    }
    export const onText: AppStyle = t => W.t(SWidget.onText(t))
    export const forIcon: AppStyle = t => W.t(SWidget.forIcon(t))
  }
  
  
  
}



