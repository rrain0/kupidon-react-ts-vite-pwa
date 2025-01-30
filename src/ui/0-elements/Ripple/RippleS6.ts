import { AdditionalProps } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import {
  AppStyle,
  AppWidgetStyle,
  WidgetStyle, WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import {
  WidgetElem, WidgetProp, WidgetPropValueType,
} from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import abs = WidgetStyleCommon.abs
import round = WidgetStyleCommon.round



export namespace RippleS6 {
  
  
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
        mode: WidgetProp.ofName<'center' | 'pointer'>('--mode'),
      },
    })
    return { frame, ripple } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const modeProp = WidgetElems.ripple.ps!.mode
  export type RippleMode = WidgetPropValueType<typeof modeProp>
  
  export const W = Widget.of({ rootElem: WidgetElems.frame, elems: WidgetElems })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace S {
    
    export const base: WidgetStyleObj = {
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
  
  
}



