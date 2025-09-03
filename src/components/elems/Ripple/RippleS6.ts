import { AdditionalProps } from '@libs/widget-style-6/WidgetEntities.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from '@libs/widget-style-6/WidgetStyle.ts'
import {
  WidgetElem, WidgetProp, WidgetPropValueType,
} from '@libs/widget-style-6/WidgetEntity.ts'
import { AttachRootElemParams, Widget } from '@libs/widget-style-6/Widget.ts'
import { WidgetStyleCommon } from 'src/styles/common/WidgetStyleCommon.ts'
import absTrbl = WidgetStyleCommon.absTrbl



export namespace RippleS6 {
  
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const rippleFrame = WidgetElem.of({
      className: 'rruiRippleFrame', ...up,
    })
    const ripple = WidgetElem.of({
      upElem: rippleFrame, upSelector: '>', className: 'rruiRippleRipple',
      props: {
        color: AdditionalProps.varColor,
        mode: WidgetProp.ofName<'center' | 'pointer'>('--ripple-mode'),
      },
    })
    return { rippleFrame, ripple } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const modeProp = WidgetElems.ripple.ps!.mode
  export type RippleMode = WidgetPropValueType<typeof modeProp>
  
  export const W = Widget.of({ rootElem: WidgetElems.rippleFrame, elems: WidgetElems })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  
  export namespace Parts {
    export const base: WidgetStyle = {
      rippleFrame: {
        ...absTrbl,
        pointerEvents: 'none',
        r: 'inherit',
        overflow: 'hidden',
      },
      ripple: {
        pos: 'abs',
        pointerEvents: 'none',
        translate: '-50% -50%',
        r: 'round',
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
    
    export namespace Type {
      
      export namespace onFilled {
        export namespace Shape {
          export namespace round {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: onFilled, shape: round, size: full
              export const full: WidgetStyle = [base, { }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({ })
        export namespace Color {
          // type: onFilled, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            rippleColor: t.ripple.ctOnTrans,
          }]
          // type: onFilled, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
            rippleColor: t.ripple.ct,
          }]
        }
      }
      
      export namespace onTrans {
        export namespace Shape {
          export namespace round {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: onTrans, shape: round, size: full
              export const full: WidgetStyle = [base, { }]
              // type: onTrans, shape: round, size: icon
              export const icon: WidgetStyle = [full, {
                rippleMode: 'center',
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({ })
        export namespace Color {
          // type: onTrans, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            rippleColor: t.ripple.ctOnTrans,
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
  
  
}



