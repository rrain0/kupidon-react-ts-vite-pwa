import { ObjectU } from '@util/common/ObjectU.ts'
import {
  WidgetElem,
  WidgetMultiAnyTransformer,
} from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import {
  AdditionalProps,
  CommonStates,
} from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { AppStyle, AppWidgetStyle, WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
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
      // TODO Style - shorten className after refactor
      className: 'rrainuiButton',
      //className: 'rruiButton',
      ...up,
      states: CommonStates,
    })
    const border = WidgetElem.of({
      // TODO Style - shorten className after refactor
      className: 'rrainuiBorder',
      //className: 'rruiBorder',
      upElem: button, upSelector: '>',
    })
    const rippleElems = RippleS6.buildWidgetElems({ upElem: border, upSelector: '>' })
    return {
      button,
      border,
      ...ObjectPrefixCapitalizeKeys('ripple', rippleElems),
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  namespace WidgetStates {
    // TODO Style - simplify
    export const inFocus = WidgetMultiAnyTransformer.of({
      transform: () => [[WidgetElems.button, CommonStates.inFocus]],
    })
    export const disabled = WidgetMultiAnyTransformer.of({
      transform: () => [[WidgetElems.button, CommonStates.disabled]],
    })
    export const error = WidgetMultiAnyTransformer.of({
      transform: () => [[WidgetElems.button, CommonStates.error]],
    })
  }
  namespace WidgetProps {
    export const color = AdditionalProps.colorAndVarColor
  }
  
  export const W = Widget.of({
    rootElem: WidgetElems.button,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  
  export namespace SWidget {
    
    export const base: WidgetStyle = {
      button: [resetButton, {
        pos: 'rel',
        ...row,
        alignItems: 'center',
        justifyContent: 'center',
        overflowWrap: 'anywhere',
        overflow: 'hidden',
        transition: 'background linear 300ms',
      }],
      border: {
        ...abs,
        pointerEvents: 'none',
        r: 'inherit',
      },
      ripple: RippleS6.SWidget.base,
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
        export const normal: AppWidgetStyle = t => ({
          buttonBgColor: t.buttonNormal.bg[0],
          buttonColor: t.buttonNormal.ct[0],
          rippleRippleColor: t.ripple.ct,
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFocus[0],
            buttonColor: t.buttonNormal.ctFocus[0],
          },
        })
        // type: filled, color: main
        export const main: AppWidgetStyle = t => [baseColor(t), {
          buttonBgColor: t.buttonMain.bg[0],
          buttonColor: t.buttonMain.ct[0],
          inFocus: {
            buttonBgColor: t.buttonMain.bgFocus[0],
            buttonColor: t.buttonMain.ctFc,
          },
        }]
        // type: filled, color: accent
        export const accent: AppWidgetStyle = t => [baseColor(t), {
          buttonBgColor: t.buttonAccent.bg[0],
          buttonColor: t.buttonAccent.ct[0],
          inFocus: {
            buttonBgColor: t.buttonAccent.bgFocus[0],
            buttonColor: t.buttonAccent.ctFocus[0],
          },
        }]
        // type: filled, color: danger
        export const danger: AppWidgetStyle = t => [baseColor(t), {
          buttonBgColor: t.elementDanger.bg[0],
          buttonColor: t.elementDanger.ct[0],
          inFocus: {
            buttonBgColor: t.elementDanger.bgFocus[0],
            buttonColor: t.elementDanger.ctFocus,
          },
        }]
        // type: filled, color: normal2
        export const normal2: AppWidgetStyle = t => [baseColor(t), {
          buttonBgColor: t.buttonNormal.bg2,
          buttonColor: t.buttonNormal.ct[0],
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFocus2,
            buttonColor: t.buttonNormal.ctFocus[0],
          },
        }]
        // type: filled, color: accent2
        export const accent2: AppWidgetStyle = t => [baseColor(t), {
          buttonBgColor: t.buttonAccent.bg2[0],
          buttonColor: t.buttonAccent.ct2,
          inFocus: {
            buttonBgColor: t.buttonAccent.bgFocus[0],
            buttonColor: t.buttonAccent.ctFocus[0],
          },
        }]
        // TODO Style - extract to preview
        // type: filled, color: previewNormal
        export const previewNormal: AppWidgetStyle = t => [baseColor(t), {
          buttonBgColor: t.previewButtonNorm.bg,
          buttonColor: t.previewButtonNorm.ct,
          rippleRippleColor: t.previewButtonNorm.ctRipple,
          inFocus: {
            buttonBgColor: t.previewButtonNorm.bgFc,
            buttonColor: t.previewButtonNorm.ctFc,
          },
        }]
        // TODO Style - extract to preview
        // type: filled, color: previewMain
        export const previewMain: AppWidgetStyle = t => [baseColor(t), {
          buttonBg: {
            color: t.previewButtonMain.bg,
            im: `linear-gradient(
              to bottom,
              ${t.previewButtonMain.bgGrad[0]} 25%,
              ${t.previewButtonMain.bgGrad[1]} 50% 100%
            )`,
            pos: '0 0',
            sz: '100% 200%',
          },
          buttonColor: t.previewButtonMain.ct,
          rippleRippleColor: t.previewButtonMain.ctRipple,
          inFocus: {
            buttonTransition: 'background-position 0.3s',
            buttonBgPos: '0 100%',
          },
        }]
        
      }
      
      export namespace Rect {
        
        // type: filled, shape: rect, size: big
        export const sizeBig: WidgetStyle = [base, {
          button: {
            w: 'full', hMin: 50, r: 15, p: [8, 6],
            ...Txt.large2,
          },
        }]
        // type: filled, shape: rect, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: {
            w: 'full', hMin: 34, r: 10, p: [8, 14],
            ...Txt.normal2,
          },
        }]
        
        
        export namespace Big {
          export const main: AppWidgetStyle = t => [sizeBig, Color.main(t)]
          export const accent: AppWidgetStyle = t => [sizeBig, Color.accent(t)]
          export const normal: AppWidgetStyle = t => [sizeBig, Color.normal(t)]
          export const danger: AppWidgetStyle = t => [sizeBig, Color.danger(t)]
          export const normal2: AppWidgetStyle = t => [sizeBig, Color.normal2(t)]
          export const accent2: AppWidgetStyle = t => [sizeBig, Color.accent2(t)]
        }
        
        export namespace Normal {
          export const main: AppWidgetStyle = t => [sizeNormal, Color.main(t)]
          export const accent: AppWidgetStyle = t => [sizeNormal, Color.accent(t)]
          export const normal: AppWidgetStyle = t => [sizeNormal, Color.normal(t)]
          export const danger: AppWidgetStyle = t => [sizeNormal, Color.danger(t)]
          export const normal2: AppWidgetStyle = t => [sizeNormal, Color.normal2(t)]
          export const accent2: AppWidgetStyle = t => [ sizeNormal, Color.accent2(t)]
        }
        
      }
      
      export namespace Rounded {
        
        // type: filled, shape: rounded, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: {
            wMin: 90, w: 'ct', hMin: 40, r: 'round', p: [8, 20], g: '0.6em',
            ...Txt.small1,
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
            ...Txt.small1,
          },
        }]
        
        export namespace Normal {
          export const main: AppWidgetStyle = t => [sizeNormal, Color.main(t)]
          export const accent: AppWidgetStyle = t => [sizeNormal, Color.accent(t)]
          export const normal: AppWidgetStyle = t => [sizeNormal, Color.normal(t)]
          export const danger: AppWidgetStyle = t => [sizeNormal, Color.danger(t)]
          export const normal2: AppWidgetStyle = t => [sizeNormal, Color.normal2(t)]
          export const accent2: AppWidgetStyle = t => [sizeNormal, Color.accent2(t)]
        }
        export namespace Normal2 {
          export const main: AppWidgetStyle = t => [sizeNormal2, Color.main(t)]
          export const accent: AppWidgetStyle = t => [sizeNormal2, Color.accent(t)]
          export const normal: AppWidgetStyle = t => [sizeNormal2, Color.normal(t)]
          export const danger: AppWidgetStyle = t => [sizeNormal2, Color.danger(t)]
          export const normal2: AppWidgetStyle = t => [sizeNormal, Color.normal2(t)]
          export const accent2: AppWidgetStyle = t => [ sizeNormal2, Color.accent2(t)]
        }
        export namespace Small {
          export const main: AppWidgetStyle = t => [sizeSmall, Color.main(t)]
          export const accent: AppWidgetStyle = t => [sizeSmall, Color.accent(t)]
          export const normal: AppWidgetStyle = t => [sizeSmall, Color.normal(t)]
          export const danger: AppWidgetStyle = t => [sizeSmall, Color.danger(t)]
          export const normal2: AppWidgetStyle = t => [sizeSmall, Color.normal2(t)]
          export const accent2: AppWidgetStyle = t => [ sizeSmall, Color.accent2(t)]
        }
        
      }
      
      // TODO Style - extract to IconButton
      export namespace Round {
        
        // type: filled, shape: round, size: normal
        export const sizeNormal: WidgetStyle = [base, {
          button: { sz: 50, r: 'round', p: 11 },
          rippleRipple: { mode: 'center' },
        }]
        // type: filled, shape: round, size: big2
        export const sizeBig2: WidgetStyle = [sizeNormal, {
          buttonP: 14,
        }]
        
        export namespace Normal {
          export const main: AppWidgetStyle = t => [sizeNormal, Color.main(t)]
          export const accent: AppWidgetStyle = t => [sizeNormal, Color.accent(t)]
          export const normal: AppWidgetStyle = t => [sizeNormal, Color.normal(t)]
          export const danger: AppWidgetStyle = t => [sizeNormal, Color.danger(t)]
          export const normal2: AppWidgetStyle = t => [sizeNormal, Color.normal2(t)]
          export const accent2: AppWidgetStyle = t => [sizeNormal, Color.accent2(t)]
        }
        export namespace Big2 {
          export const main: AppWidgetStyle = t => [sizeBig2, Color.main(t)]
          export const accent: AppWidgetStyle = t => [sizeBig2, Color.accent(t)]
          export const normal: AppWidgetStyle = t => [sizeBig2, Color.normal(t)]
          export const danger: AppWidgetStyle = t => [sizeBig2, Color.danger(t)]
          export const normal2: AppWidgetStyle = t => [sizeBig2, Color.normal2(t)]
          export const accent2: AppWidgetStyle = t => [sizeBig2, Color.accent2(t)]
        }
        
      }
      
    }
    
    export namespace Text {
      
      export namespace Rect {
        
        // type: text, shape: rect, size: big
        export const baseSizeBig: WidgetStyle = [Filled.Rect.sizeBig, {
          buttonBg: null,
        }]
        // type: text, shape: rect, size: normal
        export const baseSizeNormal: WidgetStyle = {
          button: {
            w: 'auto', hMin: 30, r: 10, p: [4, 6], g: 4,
            ...Txt.normal1,
          },
        }
        
        // type: text, shape: rect, add color: normal
        export const addColorNormal: AppWidgetStyle = t => ({
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
        
        export namespace Big {
          export const normal: AppWidgetStyle = t => [baseSizeBig, addColorNormal(t)]
        }
        
        export namespace Normal {
          export const normal: AppWidgetStyle = t => [baseSizeBig, baseSizeNormal, addColorNormal(t)]
        }
        
      }
      
    }
    
  }
  
  
  // TODO Style - Button showcase page
  
  // TODO Style - maybe cache it by theme + style in WeakMap or Map (to control size)
  export namespace S {
    export const base = () => W.t(SWidget.base)
    export namespace Filled {
      export namespace Rect {
        export namespace Big {
          export const main: AppStyle = t => W.t(SWidget.Filled.Rect.Big.main(t))
          export const accent: AppStyle = t => W.t(SWidget.Filled.Rect.Big.accent(t))
          export const normal: AppStyle = t => W.t(SWidget.Filled.Rect.Big.normal(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Rect.Big.danger(t))
          export const normal2: AppStyle = t => W.t(SWidget.Filled.Rect.Big.normal2(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Rect.Big.accent2(t))
        }
        export namespace Normal {
          export const main: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.main(t))
          export const accent: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.accent(t))
          export const normal: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.normal(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.danger(t))
          export const normal2: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.normal2(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.accent2(t))
        }
      }
      export namespace Rounded {
        export namespace Normal {
          export const main: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal.main(t))
          export const accent: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal.accent(t))
          export const normal: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal.normal(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal.danger(t))
          export const normal2: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal.normal2(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal.accent2(t))
        }
        export namespace Normal2 {
          export const main: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal2.main(t))
          export const accent: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal2.accent(t))
          export const normal: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal2.normal(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal2.danger(t))
          export const normal2: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal2.normal2(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Rounded.Normal2.accent2(t))
        }
        export namespace Small {
          export const main: AppStyle = t => W.t(SWidget.Filled.Rounded.Small.main(t))
          export const accent: AppStyle = t => W.t(SWidget.Filled.Rounded.Small.accent(t))
          export const normal: AppStyle = t => W.t(SWidget.Filled.Rounded.Small.normal(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Rounded.Small.danger(t))
          export const normal2: AppStyle = t => W.t(SWidget.Filled.Rounded.Small.normal2(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Rounded.Small.accent2(t))
        }
      }
      export namespace Round {
        export namespace Normal {
          export const main: AppStyle = t => W.t(SWidget.Filled.Round.Normal.main(t))
          export const accent: AppStyle = t => W.t(SWidget.Filled.Round.Normal.accent(t))
          export const normal: AppStyle = t => W.t(SWidget.Filled.Round.Normal.normal(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Round.Normal.danger(t))
          export const normal2: AppStyle = t => W.t(SWidget.Filled.Round.Normal.normal2(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Round.Normal.accent2(t))
        }
        export namespace Big2 {
          export const main: AppStyle = t => W.t(SWidget.Filled.Round.Big2.main(t))
          export const accent: AppStyle = t => W.t(SWidget.Filled.Round.Big2.accent(t))
          export const normal: AppStyle = t => W.t(SWidget.Filled.Round.Big2.normal(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Round.Big2.danger(t))
          export const normal2: AppStyle = t => W.t(SWidget.Filled.Round.Big2.normal2(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Round.Big2.accent2(t))
        }
      }
    }
    export namespace Text {
      export namespace Rect {
        export namespace Big {
          export const normal: AppStyle = t => W.t(SWidget.Text.Rect.Big.normal(t))
        }
        export namespace Normal {
          export const normal: AppStyle = t => W.t(SWidget.Text.Rect.Normal.normal(t))
        }
      }
    }
  }
  
  
}


