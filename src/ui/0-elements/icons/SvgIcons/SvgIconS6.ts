import { AttachRootElemParams, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { AdditionalProps } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'




export namespace SvgIconS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const icon = WidgetElem.of({
      className: 'rruiIcon', ...up,
      props: { 
        size: AdditionalProps.varSize,
        sz: AdditionalProps.varSize,
        color: AdditionalProps.varColor,
        colorAcc: AdditionalProps.varColorAccent,
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
  
  
  
  export namespace Parts {
    export const base: WidgetStyle = {
      icon: {
        // '100%' instead of 'auto' because auto has 0 w / h on iOS
        sz: 'full',
      },
    }
    
    export namespace Type {
      
      export namespace icon {
        export namespace Shape {
          export namespace icon {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: icon, shape: icon, size: full
              export const full: WidgetStyle = [base, {
                icon: {
                  sz: 'full',
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          icon: {
            color: '#6A6A6A',
            colorAcc: '#006A6A',
          },
        })
        export namespace Color {
          // type: icon, color: ambient
          // Get colors from scope
          export const ambient: AppWidgetStyle = t => [baseColor, {
            iconColor: undefined,
            iconColorAcc: undefined,
          }]
          // type: icon, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            iconColor: t.boxDefault4.ct,
            iconColorAcc: t.boxDefault4.cta,
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}
