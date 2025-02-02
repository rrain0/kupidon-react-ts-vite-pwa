import { AppStyle, AppWidgetStyle, WidgetStyle, WidgetStyleObj } from 'mini-libs/widget-style-6/WidgetStyle'
import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgGradIconS6 } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'



export namespace IconButtonS6 {
  
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
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
  
  const W = Widget.of({
    rootElem: WidgetElems.button,
    elems: WidgetElems,
    states: WidgetStates,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace S {
    
    export const base: WidgetStyleObj = {
      ...ButtonS6.S.base,
      ...SvgIconS6.S.base,
      ...SvgGradIconS6.S.base,
    }
    
    // Transparent
    export namespace Trans {
      
      export namespace Color {
        // type: trans, color: normal2
        export const normal2: AppWidgetStyle = t => [ButtonS6.S.Text.Color.normal2, {
          iconColor: t.buttonNormal.bg[0],
          // todo gradIcon
        }]
      }
      
      export namespace Round {
        // type: text, shape: round, size: big
        export const sizeBig: WidgetStyle = [base, {
          button: { sz: 50, r: 'round', p: 11 },
          rippleRipple: { mode: 'center' },
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
      
      export namespace Color {
        // type: filled, color: normal2
        export const normal2: AppWidgetStyle = t => [ButtonS6.S.Filled.Color.normal2, {
          iconColor: t.buttonNormal.ct[0],
          // todo gradIcon
        }]
        // type: filled, color: accent
        export const accent: AppWidgetStyle = t => [ButtonS6.S.Filled.Color.accent, {
          iconColor: t.buttonAccent.ct[0],
          // todo gradIcon
        }]
      }
      
      export namespace Round {
        
        // type: filled, shape: round, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: { sz: 50, r: 'round', p: 11 },
          rippleRipple: { mode: 'center' },
        }]
        // type: filled, shape: round, size: big2
        export const sizeBig2: WidgetStyle = [sizeNormal, {
          buttonP: 14,
          iconSz: 'full',
        }]
        
        export namespace Normal {
          export const accent: AppWidgetStyle = [sizeNormal, Color.accent]
          export const normal2: AppWidgetStyle = [sizeNormal, Color.normal2]
        }
        export namespace Big2 {
          export const accent: AppWidgetStyle = [sizeBig2, Color.accent]
          export const normal2: AppWidgetStyle = [sizeBig2, Color.normal2]
        }
        
      }
      
    }
    
  }
  
}