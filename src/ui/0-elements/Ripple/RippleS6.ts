import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/AppWidgetStyle.ts'
import {
  newWidgetElem,
  newWidgetProp,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { newWidget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import abs = WidgetStyleCommon.abs
import round = WidgetStyleCommon.round



export namespace RippleS6 {
  
  namespace WidgetElems {
    export const frame = newWidgetElem({ className: '.rruiRippleFrame' })
    export const ripple = newWidgetElem({
      className: '.rruiRippleRipple',
      upSelector: '>', upElem: frame,
      props: {
        color: newWidgetProp('--color'),
        // values: 'center' | 'pointer'
        mode: newWidgetProp('--mode'),
      },
    })
  }
  
  const W = newWidget(WidgetElems.frame, WidgetElems)
  
  
  export namespace S {
    
    export const base: WidgetStyle = {
      frame: {
        ...abs,
        pointerEvents: 'none',
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
        bgColor: `var(${W.elems.ripple.props!.color})`,
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
    
    export namespace OnText {
      export const normal: AppWidgetStyle = t => ({ ...base,
        rippleColor: t.ripple.ctOnTransparent,
      })
    }
    
    export namespace OnIcon {
      export const normal: AppWidgetStyle = t => ({ ...base,
        rippleMode: 'center',
        rippleColor: t.ripple.ctOnTransparent,
      })
    }
    
  }
  
  
  
}



