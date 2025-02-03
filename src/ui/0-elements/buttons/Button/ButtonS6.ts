import { ObjectU } from '@util/common/ObjectU.ts'
import {
  WidgetElem,
} from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import {
  AppStyle,
  AppWidgetStyle,
  WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import resetButton = WidgetStyleCommon.resetButton
import row = WidgetStyleCommon.row
import abs = WidgetStyleCommon.abs
import Txt = WidgetStyleCommon.Txt
import ObjectPrefixCapitalizeKeys = ObjectU.ObjectPrefixCapitalizeKeys




export namespace ButtonS6 {
  
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const button = WidgetElem.of({
      ...up, className: 'rruiButton',
    })
    const border = WidgetElem.of({
      upElem: button, upSelector: '>', className: 'rruiBorder',
    })
    const rippleElems = RippleS6.buildWidgetElems({ upElem: border, upSelector: '>' })
    return {
      button,
      border,
      ...ObjectPrefixCapitalizeKeys('ripple', rippleElems),
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = {
    inFocus: WidgetState.of([WidgetElems.button, CommonStates.inFocus]),
    disabled: WidgetState.of([WidgetElems.button, CommonStates.disabled]),
    error: WidgetState.of([WidgetElems.button, CommonStates.error]),
  }
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.button,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace S {
    
    export const base: WidgetStyleObj = {
      button: [resetButton, {
        pos: 'rel',
        ...row,
        alignItems: 'center',
        justifyContent: 'center',
        overflowWrap: 'anywhere',
        overflow: 'hidden',
        transition:
          'background linear 300ms,' +
          'color linear 300ms,' +
          'border-color linear 300ms',
      }],
      border: {
        ...abs,
        pointerEvents: 'none',
        r: 'inherit',
      },
      ripple: RippleS6.S.base,
    }
    
    export namespace Filled {
      
      export const baseColor: AppWidgetStyle = t => ({
        buttonBgColor: t.buttonNormal.bg[0],
        buttonColor: t.buttonNormal.ct[0],
        rippleRippleColor: t.ripple.ct,
        inFocus: {
          buttonBgColor: t.buttonNormal.bgFocus[0],
          buttonColor: t.buttonNormal.ctFocus[0],
        },
        disabled: {
          buttonBgColor: t.elementDisabled.bg[0],
          buttonColor: t.elementDisabled.ct[0],
        },
      })
      
      
      
      export namespace Color {
        // type: filled, color: normal
        export const normal: AppWidgetStyle = t => [baseColor, {
          buttonBgColor: t.buttonNormal.bg[0],
          buttonColor: t.buttonNormal.ct[0],
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFocus[0],
            buttonColor: t.buttonNormal.ctFocus[0],
          },
        }]
        // type: filled, color: main
        export const main: AppWidgetStyle = t => [baseColor, {
          buttonBgColor: t.buttonMain.bg[0],
          buttonColor: t.buttonMain.ct[0],
          inFocus: {
            buttonBgColor: t.buttonMain.bgFocus[0],
            buttonColor: t.buttonMain.ctFc,
          },
        }]
        // type: filled, color: accent
        export const accent: AppWidgetStyle = t => [baseColor, {
          buttonBgColor: t.buttonAccent.bg[0],
          buttonColor: t.buttonAccent.ct[0],
          inFocus: {
            buttonBgColor: t.buttonAccent.bgFocus[0],
            buttonColor: t.buttonAccent.ctFocus[0],
          },
        }]
        // type: filled, color: danger
        export const danger: AppWidgetStyle = t => [baseColor, {
          buttonBgColor: t.elementDanger.bg[0],
          buttonColor: t.elementDanger.ct[0],
          inFocus: {
            buttonBgColor: t.elementDanger.bgFocus[0],
            buttonColor: t.elementDanger.ctFocus,
          },
        }]
        // type: filled, color: normal2
        export const normal2: AppWidgetStyle = t => [baseColor, {
          buttonBgColor: t.buttonNormal.bg2,
          buttonColor: t.buttonNormal.ct[0],
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFocus2,
            buttonColor: t.buttonNormal.ctFocus[0],
          },
        }]
        // type: filled, color: accent2
        export const accent2: AppWidgetStyle = t => [baseColor, {
          buttonBgColor: t.buttonAccent2.bg,
          buttonColor: t.buttonAccent2.ct,
          inFocus: {
            buttonBgColor: t.buttonAccent2.bgFc,
            buttonColor: t.buttonAccent2.ctFc,
          },
        }]
      }
      
      export namespace Rect {
        
        // type: filled, shape: rect, size: big
        export const sizeBig: WidgetStyle = [base, {
          button: {
            w: 'full', hMin: 50, r: 15, p: [8, 6],
            ...Txt.lg18lh150,
          },
        }]
        // type: filled, shape: rect, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: {
            w: 'full', hMin: 34, r: 10, p: [8, 14],
            ...Txt.md14,
          },
        }]
        
        
        export namespace Big {
          export const main: AppWidgetStyle = [sizeBig, Color.main]
          export const accent: AppWidgetStyle = [sizeBig, Color.accent]
          export const normal: AppWidgetStyle = [sizeBig, Color.normal]
          export const danger: AppWidgetStyle = [sizeBig, Color.danger]
          export const normal2: AppWidgetStyle = [sizeBig, Color.normal2]
          export const accent2: AppWidgetStyle = [sizeBig, Color.accent2]
        }
        
        export namespace Normal {
          export const main: AppWidgetStyle = [sizeNormal, Color.main]
          export const accent: AppWidgetStyle = [sizeNormal, Color.accent]
          export const normal: AppWidgetStyle = [sizeNormal, Color.normal]
          export const danger: AppWidgetStyle = [sizeNormal, Color.danger]
          export const normal2: AppWidgetStyle = [sizeNormal, Color.normal2]
          export const accent2: AppWidgetStyle = [sizeNormal, Color.accent2]
        }
        
      }
      
      export namespace Rounded {
        
        // type: filled, shape: rounded, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: {
            wMin: 90, w: 'ct', hMin: 40, r: 'round', p: [8, 20], g: '0.6em',
            ...Txt.md15thin,
          },
        }]
        // type: filled, shape: rounded, size: normal2
        export const sizeNormal2: WidgetStyle = [sizeNormal, {
          buttonPh: 16,
        }]
        // type: filled, shape: rounded, size: small
        export const sizeSmall: WidgetStyle = [base, {
          button: {
            w: 'ct', hMin: 30, r: 'round', p: [4, 16],
            ...Txt.md15thin,
          },
        }]
        
        export namespace Normal {
          export const main: AppWidgetStyle = [sizeNormal, Color.main]
          export const accent: AppWidgetStyle = [sizeNormal, Color.accent]
          export const normal: AppWidgetStyle = [sizeNormal, Color.normal]
          export const danger: AppWidgetStyle = [sizeNormal, Color.danger]
          export const normal2: AppWidgetStyle = [sizeNormal, Color.normal2]
          export const accent2: AppWidgetStyle = [sizeNormal, Color.accent2]
        }
        export namespace Normal2 {
          export const main: AppWidgetStyle = [sizeNormal2, Color.main]
          export const accent: AppWidgetStyle = [sizeNormal2, Color.accent]
          export const normal: AppWidgetStyle = [sizeNormal2, Color.normal]
          export const danger: AppWidgetStyle = [sizeNormal2, Color.danger]
          export const normal2: AppWidgetStyle = [sizeNormal, Color.normal2]
          export const accent2: AppWidgetStyle = [ sizeNormal2, Color.accent2]
        }
        export namespace Small {
          export const main: AppWidgetStyle = [sizeSmall, Color.main]
          export const accent: AppWidgetStyle = [sizeSmall, Color.accent]
          export const normal: AppWidgetStyle = [sizeSmall, Color.normal]
          export const danger: AppWidgetStyle = [sizeSmall, Color.danger]
          export const normal2: AppWidgetStyle = [sizeSmall, Color.normal2]
          export const accent2: AppWidgetStyle = [sizeSmall, Color.accent2]
        }
        
      }
      
    }
    
    // TODO Style - on hover change only border and text color, not bg color
    export namespace Outlined {
      
      export const baseColor: AppWidgetStyle = t => ({
        buttonColor: t.buttonNormal.bg[0],
        borderBdColor: t.buttonNormal.bg[0],
        rippleRippleColor: t.ripple.ctOnTransparent,
        inFocus: {
          buttonBgColor: t.buttonNormal.bgFocus[0],
          buttonColor: t.buttonNormal.ctFocus[0],
        },
        disabled: {
          buttonBgColor: t.elementDisabled.bg[0],
          buttonColor: t.elementDisabled.ct[0],
        },
      })
      
      export namespace Color {
        // type: outlined, color: normal
        export const normal: AppWidgetStyle = t => [baseColor, {
          buttonColor: t.buttonNormal.bg[0],
          borderBdColor: t.buttonNormal.bg[0],
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFocus[0],
            buttonColor: t.buttonNormal.ctFocus[0],
          },
        }]
        // type: outlined, color: accent
        export const accent: AppWidgetStyle = t => [baseColor, {
          buttonColor: t.buttonAccent.bg[0],
          borderBdColor: t.buttonAccent.bg[0],
          inFocus: {
            buttonBgColor: t.buttonAccent.bgFocus[0],
            buttonColor: t.buttonAccent.ctFocus[0],
            borderBdColor: t.buttonAccent.bgFocus[0],
          },
        }]
      }
      
      export namespace Rounded {
        
        // type: outlined, shape: rounded, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: {
            wMin: 90, w: 'ct', hMin: 40, r: 'round', p: [8, 20], g: '0.6em',
            ...Txt.md15thin,
          },
          border: {
            bd: '1px solid',
          },
          hover: {
            borderBd: null,
          },
        }]
        // type: outlined, shape: rounded, size: small
        export const sizeSmall: WidgetStyle = [base, {
          button: {
            w: 'ct', hMin: 30, r: 'round', p: [4, 16],
            ...Txt.md15thin,
          },
          border: {
            bd: '1px solid',
          },
          hover: {
            borderBd: null,
          },
        }]
        
        export namespace Normal {
          export const normal: AppWidgetStyle = [sizeNormal, Color.normal]
          export const accent: AppWidgetStyle = [sizeNormal, Color.accent]
        }
        export namespace Small {
          export const normal: AppWidgetStyle = [sizeSmall, Color.normal]
          export const accent: AppWidgetStyle = [sizeSmall, Color.accent]
        }
        
      }
      
    }
    
    export namespace Text {
      
      export const baseColor: AppWidgetStyle = t => ({
        buttonColor: t.page.ct2,
        rippleRippleColor: t.ripple.ctOnTransparent,
        inFocus: {
          buttonBgColor: t.buttonTransparent.bgFocus[0],
        },
        disabled: {
          buttonBgColor: t.elementDisabled.bg[0],
          buttonColor: t.elementDisabled.ct[0],
        },
      })
      
      export namespace Color {
        // type: text, color: normal
        export const normal: AppWidgetStyle = t => [baseColor, {
          buttonColor: t.page.ct2,
          rippleRippleColor: t.ripple.ctOnTransparent,
          inFocus: {
            buttonBgColor: t.buttonTransparent.bgFocus[0],
          },
        }]
        // type: text, color: normal2
        export const normal2: AppWidgetStyle = t => [baseColor, {
          buttonColor: t.buttonNormal.bg[0],
          rippleRippleColor: t.ripple.ctOnTransparent,
          inFocus: {
            buttonBgColor: t.buttonTransparent.bgFocus[0],
          },
        }]
      }
      
      export namespace Rect {
        // type: text, shape: rect, size: big
        export const sizeBig: WidgetStyle = [base, {
          button: {
            w: 'full', hMin: 50, r: 15, p: [8, 6],
            ...Txt.lg18lh150,
          },
          buttonBg: null,
        }]
        // type: text, shape: rect, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: {
            w: 'auto', hMin: 30, r: 10, p: [4, 6], g: 4,
            ...Txt.md16,
          },
        }]
        
        
        export namespace Big {
          export const normal: AppWidgetStyle = [sizeBig, Color.normal]
          export const normal2: AppWidgetStyle = [sizeBig, Color.normal2]
        }
        export namespace Normal {
          export const normal: AppWidgetStyle = [sizeNormal, Color.normal]
          export const normal2: AppWidgetStyle = [sizeNormal, Color.normal2]
        }
      }
      
      export namespace Rounded {
        // type: text, shape: rounded, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: {
            wMin: 90, w: 'ct', hMin: 40, r: 'round', p: [8, 20], g: '0.6em',
            ...Txt.lg18,
          },
        }]
        // type: text, shape: rounded, size: small
        export const sizeSmall: WidgetStyle = [base, {
          button: {
            w: 'ct', hMin: 30, r: 'round', p: [4, 16],
            ...Txt.lg16b,
          },
        }]
        // type: text, shape: rounded, size: normal2
        export const sizeNormal2: WidgetStyle = [sizeNormal, {
          button: {
            pH: 16,
            ...Txt.lg16b,
          },
        }]
        // type: text, shape: rounded, size: normal2Uppercase
        export const sizeNormal2Uppercase: WidgetStyle = [sizeNormal2, {
          button: {
            textTransform: 'uppercase',
          },
        }]
        
        export namespace Normal {
          export const normal: AppWidgetStyle = [sizeNormal, Color.normal]
          export const normal2: AppWidgetStyle = [sizeNormal, Color.normal2]
        }
        export namespace Small {
          export const normal: AppWidgetStyle = [sizeSmall, Color.normal]
          export const normal2: AppWidgetStyle = [sizeSmall, Color.normal2]
        }
        export namespace Normal2 {
          export const normal: AppWidgetStyle = [sizeNormal2, Color.normal]
          export const normal2: AppWidgetStyle = [sizeNormal2, Color.normal2]
        }
        export namespace Normal2Uppercase {
          export const normal: AppWidgetStyle = [sizeNormal2Uppercase, Color.normal]
          export const normal2: AppWidgetStyle = [sizeNormal2Uppercase, Color.normal2]
        }
      }
      
    }
    
  }
  
}


