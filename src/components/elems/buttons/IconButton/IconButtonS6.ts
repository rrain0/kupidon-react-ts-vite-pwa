import {
  AppStyle,
  AppWidgetStyle,
  combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from '@libs/widget-style-6/WidgetStyle'
import { AttachRootElemParams, Widget } from '@libs/widget-style-6/Widget.ts'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import { GradSvgIconS6 } from 'src/components/elems/icons/GradSvgIcons/GradSvgIconS6.ts'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'



export namespace IconButtonS6 {
  
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const buttonElems = ButtonS6.buildWidgetElems(up)
    const iconElems = SvgIconS6.buildWidgetElems({
      upElem: buttonElems.button, upSelector: '>',
    })
    const gradIconElems = GradSvgIconS6.buildWidgetElems({
      upElem: buttonElems.button, upSelector: '>',
    })
    
    return { ...buttonElems, ...iconElems, ...gradIconElems } as const
  }
  
  export function buildWidgetStates(elems: ReturnType<typeof buildWidgetElems>) {
    return ButtonS6.buildWidgetStates(elems)
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = buildWidgetStates(WidgetElems)
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.button,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  
  export namespace Parts {
    export const base: WidgetStyle = [
      ButtonS6.Parts.base,
      SvgIconS6.Parts.base,
      GradSvgIconS6.Parts.base,
    ]
    
    export namespace Type {
      
      export namespace trans {
        export namespace Shape {
          export namespace round {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: trans, shape: round, size: lg
              export const lg: WidgetStyle = [base, {
                button: { sz: 50, r: 'round', p: 11 },
                ripple: { mode: 'center' },
                iconSz: 'full',
              }]
              // type: trans, shape: round, size: lg2
              export const lg2: WidgetStyle = [lg, {
                button: { p: 14 },
                iconSz: 'full',
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => [
          ButtonS6.Parts.Type.text.baseColor,
          SvgIconS6.Parts.Type.icon.baseColor,
          GradSvgIconS6.Parts.Type.icon.baseColor,
        ]
        export namespace Color {
          // type: trans, color: normal
          export const normal: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.text.Color.normal,
            {
              iconColor: t.boxTransNormal.ct,
              // todo gradIcon
            },
          ]
          // type: trans, color: secondary
          export const secondary: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.text.Color.secondary,
            {
              iconColor: t.boxTransSec.ct,
              // todo gradIcon
            },
          ]
        }
      }
      
      export namespace filled {
        export namespace Shape {
          export namespace round {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: filled, shape: round, size: lg
              export const lg: WidgetStyle = [base, {
                button: { sz: 50, r: 'round', p: 11 },
                ripple: { mode: 'center' },
              }]
              // type: filled, shape: round, size: lg2
              export const lg2: WidgetStyle = [lg, {
                buttonP: 14,
                iconSz: 'full',
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => [
          ButtonS6.Parts.Type.text.baseColor,
          SvgIconS6.Parts.Type.icon.baseColor,
          GradSvgIconS6.Parts.Type.icon.baseColor,
        ]
        export namespace Color {
          // type: filled, color: normal2
          export const normal2: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.filled.Color.normal2,
            {
              iconColor: t.boxNormal.ct,
              // todo gradIcon
            },
          ]
          // type: filled, color: normal4
          export const normal4: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.filled.Color.normal4, {
              iconColor: t.boxNormal4.ct,
              // todo gradIcon
            },
          ]
          // type: filled, color: accent
          export const accent: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.filled.Color.accent,
            {
              iconColor: t.boxAccent.ct,
              // todo gradIcon
            },
          ]
          // type: filled, color: accent4
          export const accent4: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.filled.Color.accent4,
            {
              iconColor: t.boxAccentCt4.ct,
              gradIconColor0: t.boxAccentCt4.ctGrad[0],
              gradIconColor1: t.boxAccentCt4.ctGrad[1],
            },
          ]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}