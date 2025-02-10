import { AttachRootElemParams, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { AdditionalProps } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { WidgetElem, WidgetProp } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'




export namespace SvgGradIconS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const gradIcon = WidgetElem.of({
      className: 'rruiGradIcon', ...up,
      props: { 
        size: AdditionalProps.varSize,
        sz: AdditionalProps.varSize,
        color0: WidgetProp.ofName('--grad-icon-color-0'),
        color1: WidgetProp.ofName('--grad-icon-color-1'),
      },
    })
    return { gradIcon } as const
  }
  
  
  const WidgetElems = buildWidgetElems()
  
  export const W = Widget.of({
    rootElem: WidgetElems.gradIcon,
    elems: WidgetElems,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace S0 {
    
    export const base: WidgetStyle = {
      gradIcon: {
        sz: 'auto',
      },
    }
    
    export const baseColor: AppWidgetStyle = t => ({
      gradIcon: {
        color0: '#6A6A6A',
        color1: '#006A6A',
      },
    })
    
    export namespace Normal {
      export const normal: AppWidgetStyle = t => [base, baseColor, {
        gradIconColor0: t.gradIcon.ct[0],
        gradIconColor1: t.gradIcon.ct[1],
      }]
    }
    
  }
  
  
  
  export namespace Parts {
    export const base: WidgetStyle = {
      gradIcon: {
        sz: 'full',
      },
    }
    
    export namespace Type {
      
      export namespace icon {
        export namespace Shape {
          export namespace icon {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: icon, shape: icon, size: auto
              export const auto: WidgetStyle = [base, {
                gradIcon: {
                  sz: 'full',
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          gradIcon: {
            color0: '#6A6A6A',
            color1: '#006A6A',
          },
        })
        export namespace Color {
          // type: icon, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            gradIconColor0: t.gradIcon.ct[0],
            gradIconColor1: t.gradIcon.ct[1],
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
  
  
}
