import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/AppWidgetStyle.ts'
import {
  WidgetElem, WidgetProp, WidgetStyle,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import abs = WidgetStyleCommon.abs
import round = WidgetStyleCommon.round



export namespace RippleS6 {
  
  export type RippleMode = 'center' | 'pointer'
  
  namespace WidgetElems {
    export const frame = WidgetElem.of({
      className: 'rruiRippleFrame',
    })
    export const ripple = WidgetElem.of({
      className: 'rruiRippleRipple',
      upSelector: '>', upElem: frame,
      props: {
        color: WidgetProp.ofName('--color'),
        // values: 'center' | 'pointer'
        mode: WidgetProp.ofName('--mode'),
      },
    })
  }
  
  export const W = Widget.of({ rootElem: WidgetElems.frame, elems: WidgetElems })
  
  
  export namespace ST {
    
    export const base: WidgetStyle = {
      frame: {
        ...abs,
        pointerEvents: 'none',
        borderRadius: 'inherit',
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
        rippleColor: '#ffffff66',
        rippleMode: 'pointer',
        // TODO Style bgColor: '@rippleColor'
        // TODO Style bgColor: 'varRippleColor'
        bgColor: `var(${W.elems.ripple.props!.color.prop})`,
      },
    }
    
    export namespace OnFilled {
      export const accent: AppWidgetStyle = t => ({ ...base,
        rippleColor: t.ripple.ct,
      })
      export const normal: AppWidgetStyle = t => ({ ...base,
        rippleColor: t.ripple.ctOnTransparent,
      })
    }
    
    export const onText: AppWidgetStyle = t => ({ ...base,
      rippleColor: t.ripple.ctOnTransparent,
    })
    
    export const forIcon: AppWidgetStyle = t => ({ ...base,
      rippleMode: 'center',
      rippleColor: t.ripple.ctOnTransparent,
    })
    
  }
  
  
  // TODO Style
  export namespace S {
    export const base = () => W.t(ST.base)
    export namespace OnFilled {
      export const normal = (t: AppTheme.Theme) => W.t(ST.OnFilled.normal(t))
      export const accent = (t: AppTheme.Theme) => W.t(ST.OnFilled.accent(t))
    }
    export const onText = (t: AppTheme.Theme) => W.t(ST.onText(t))
    export const forIcon = (t: AppTheme.Theme) => W.t(ST.forIcon(t))
  }
  
  
  
}



