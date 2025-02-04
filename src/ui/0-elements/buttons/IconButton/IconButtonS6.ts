import {
  AppStyle,
  AppWidgetStyle,
  combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'mini-libs/widget-style-6/WidgetStyle'
import { AttachRootElemParams, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgGradIconS6 } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'



export namespace IconButtonS6 {
  
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const buttonElems = ButtonS6.buildWidgetElems(up)
    const iconElems = SvgIconS6.buildWidgetElems({
      upElem: buttonElems.button, upSelector: '>',
    })
    const gradIconElems = SvgGradIconS6.buildWidgetElems({
      upElem: buttonElems.button, upSelector: '>',
    })
    
    return { ...buttonElems, ...iconElems, ...gradIconElems } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = ButtonS6.W.states!
  
  export const W = Widget.of({
    rootElem: WidgetElems.button,
    elems: WidgetElems,
    states: WidgetStates,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace S0 {
    
    export const base: WidgetStyle = [
      ButtonS6.Parts.base,
      SvgIconS6.Parts.base,
      SvgGradIconS6.Parts.base,
    ]
    
    // Transparent
    export namespace Trans {
      
      export const baseColor: AppWidgetStyle = t => [
        ButtonS6.Parts.Type.text.baseColor, 
        SvgIconS6.Parts.Type.icon.baseColor, 
        SvgGradIconS6.Parts.Type.icon.baseColor,
      ]
      
      export namespace Color {
        // type: trans, color: normal2
        export const normal2: AppWidgetStyle = t => [
          baseColor, 
          ButtonS6.Parts.Type.text.Color.normal2, 
          {
            iconColor: t.buttonNormal.bg[0],
            // todo gradIcon
          },
        ]
      }
      
      export namespace Round {
        // type: text, shape: round, size: big
        export const sizeBig: WidgetStyle = [base, {
          button: { sz: 50, r: 'round', p: 11 },
          ripple: { mode: 'center' },
          iconSz: 'full',
        }]
        // type: text, shape: round, size: big2
        export const sizeBig2: WidgetStyle = [sizeBig, {
          button: { p: 14 },
          iconSz: 'full',
        }]
        
        export namespace Big {
          export const normal2: AppWidgetStyle = [sizeBig, Color.normal2]
        }
        export namespace Big2 {
          export const normal2: AppWidgetStyle = [sizeBig2, Color.normal2]
        }
      }
      
    }
    
    export namespace Filled {
      
      export const baseColor: AppWidgetStyle = t => [
        ButtonS6.Parts.Type.text.baseColor, SvgIconS6.Parts.Type.icon.baseColor, SvgGradIconS6.Parts.Type.icon.baseColor,
      ]
      
      export namespace Color {
        // type: filled, color: accent
        export const accent: AppWidgetStyle = t => [baseColor, ButtonS6.Parts.Type.filled.Color.accent, {
          iconColor: t.buttonAccent.ct[0],
          // todo gradIcon
        }]
        // type: filled, color: normal2
        export const normal2: AppWidgetStyle = t => [baseColor, ButtonS6.Parts.Type.filled.Color.normal2, {
          iconColor: t.buttonNormal.ct[0],
          // todo gradIcon
        }]
      }
      
      export namespace Round {
        
        // type: filled, shape: round, size: normal
        export const sizeBig: WidgetStyle = [base, {
          button: { sz: 50, r: 'round', p: 11 },
          ripple: { mode: 'center' },
        }]
        // type: filled, shape: round, size: big2
        export const sizeBig2: WidgetStyle = [sizeBig, {
          buttonP: 14,
          iconSz: 'full',
        }]
        
        export namespace Big {
          export const accent: AppWidgetStyle = [sizeBig, Color.accent]
          export const normal2: AppWidgetStyle = [sizeBig, Color.normal2]
        }
        export namespace Big2 {
          export const accent: AppWidgetStyle = [sizeBig2, Color.accent]
          export const normal2: AppWidgetStyle = [sizeBig2, Color.normal2]
        }
        
      }
      
    }
    
  }
  
  
  export namespace Parts {
    export const base: WidgetStyle = [
      ButtonS6.Parts.base,
      SvgIconS6.Parts.base,
      SvgGradIconS6.Parts.base,
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
          SvgGradIconS6.Parts.Type.icon.baseColor,
        ]
        export namespace Color {
          // type: trans, color: normal2
          export const normal2: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.text.Color.normal2,
            {
              iconColor: t.buttonNormal.bg[0],
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
          SvgGradIconS6.Parts.Type.icon.baseColor,
        ]
        export namespace Color {
          // type: filled, color: normal2
          export const normal2: AppWidgetStyle = t => [
            baseColor, ButtonS6.Parts.Type.filled.Color.normal2,
            {
              iconColor: t.buttonNormal.ct[0],
              // todo gradIcon
            },
          ]
          // type: filled, color: accent
          export const accent: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.filled.Color.accent,
            {
              iconColor: t.buttonAccent.ct[0],
              // todo gradIcon
            },
          ]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}