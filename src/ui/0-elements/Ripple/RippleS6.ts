import { AdditionalProps } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle, WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import {
  WidgetElem, WidgetProp, WidgetPropValueType,
} from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { AttachRootElemParams, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import abs = WidgetStyleCommon.abs



export namespace RippleS6 {
  
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const frame = WidgetElem.of({
      ...up, className: 'rruiRippleFrame',
    })
    const ripple = WidgetElem.of({
      upElem: frame, upSelector: '>', className: 'rruiRippleRipple',
      props: {
        color: AdditionalProps.varColor,
        mode: WidgetProp.ofName<'center' | 'pointer'>('--ripple-mode'),
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
  
  
  
  export namespace Parts {
    export const base = {
      rippleFrame: {
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
        // TODO Style bgColor: '@rippleColor'
        // TODO Style bgColor: 'varRippleColor'
        bgColor: `var(${W.els.ripple.ps!.color.n})`,
      },
    } satisfies WidgetStyleObj
    
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
            rippleColor: t.ripple.ctOnTransparent,
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
            rippleColor: t.ripple.ctOnTransparent,
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
  
  
}



