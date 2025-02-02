import { AdditionalProps } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import {
  AppWidgetStyle,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import {
  WidgetElem, WidgetProp,
} from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import abs = WidgetStyleCommon.abs



export namespace RippleS6 {
  
  export type RippleMode = 'center' | 'pointer'
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const frame = WidgetElem.of({
      ...up, className: 'rruiRippleFrame',
    })
    const ripple = WidgetElem.of({
      upElem: frame, upSelector: '>', className: 'rruiRippleRipple',
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
        r: 'round',
        /*background-image: radial-gradient(
         closest-side circle at center,
         transparent, var(--bg-color) 90%, transparent
         );*/
        color: '#ffffff66',
        mode: 'pointer',
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
  
}



