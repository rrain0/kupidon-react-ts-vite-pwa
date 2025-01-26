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
      
      export namespace Rect {
        
        // type: filled, shape: rect, size: big
        export const baseSizeBig: WidgetStyle = [base, {
          button: {
            w: 'full', hMin: 50, r: 15, p: [8, 6],
            ...Txt.large2,
          },
        }]
        
        // type: filled, shape: rect, add size: normal
        export const addSizeNormal: WidgetStyle = [baseSizeBig, {
          button: {
            w: 'full', hMin: 34, r: 10, p: [8, 14],
            ...Txt.normal2,
          },
        }]
        
        export const addColorMain: AppWidgetStyle = t => ({
          buttonBgColor: t.buttonMain.bg[0],
          buttonColor: t.buttonMain.ct[0],
          rippleRippleColor: t.ripple.ct,
          inFocus: {
            buttonBgColor: t.buttonMain.bgFocus[0],
          },
          disabled: {
            buttonBgColor: t.elementDisabled.bg[0],
            buttonColor: t.elementDisabled.ct[0],
          },
        })
        
        export const addColorAccent: AppWidgetStyle = t => ({
          buttonBgColor: t.buttonAccent.bg[0],
          buttonColor: t.buttonAccent.ct[0],
          rippleRippleColor: t.ripple.ct,
          inFocus: {
            buttonBgColor: t.buttonAccent.bgFocus[0],
            buttonColor: t.buttonAccent.ctFocus[0],
          },
          disabled: {
            buttonBgColor: t.elementDisabled.bg[0],
            buttonColor: t.elementDisabled.ct[0],
          },
        })
        
        export const addColorAccent2: AppWidgetStyle = t => ({
          buttonBgColor: t.buttonAccent.bg2[0],
          buttonColor: t.buttonAccent.ct2,
          rippleRippleColor: t.ripple.ct,
          inFocus: {
            buttonBgColor: t.buttonAccent.bgFocus[0],
            buttonColor: t.buttonAccent.ctFocus[0],
          },
          disabled: {
            buttonBgColor: t.elementDisabled.bg[0],
            buttonColor: t.elementDisabled.ct[0],
          },
        })
        
        export const addColorNormal: AppWidgetStyle = t => ({
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
        
        export const addColorDanger: AppWidgetStyle = t => ({
          buttonBgColor: t.elementDanger.bg[0],
          buttonColor: t.elementDanger.ct[0],
          rippleRippleColor: t.ripple.ct,
          inFocus: {
            buttonBgColor: t.elementDanger.bgFocus[0],
          },
          disabled: {
            buttonBgColor: t.elementDisabled.bg[0],
            buttonColor: t.elementDisabled.ct[0],
          },
        })
        
        export namespace Big {
          export const main: AppWidgetStyle = t => [baseSizeBig, addColorMain(t)]
          export const accent: AppWidgetStyle = t => [baseSizeBig, addColorAccent(t)]
          export const normal: AppWidgetStyle = t => [baseSizeBig, addColorNormal(t)]
          export const danger: AppWidgetStyle = t => [baseSizeBig, addColorDanger(t)]
          export const accent2: AppWidgetStyle = t => [baseSizeBig, addColorAccent2(t)]
        }
        
        export namespace Normal {
          export const main: AppWidgetStyle = t => [baseSizeBig, addSizeNormal, addColorMain(t)]
          export const accent: AppWidgetStyle = t => [baseSizeBig, addSizeNormal, addColorAccent(t)]
          export const normal: AppWidgetStyle = t => [baseSizeBig, addSizeNormal, addColorNormal(t)]
          export const danger: AppWidgetStyle = t => [baseSizeBig, addSizeNormal, addColorDanger(t)]
          export const accent2: AppWidgetStyle = t => [baseSizeBig, addSizeNormal, addColorAccent2(t)]
        }
        
      }
      
    }
    
    export namespace Text {
      
      export namespace Rect {
        
        export const baseSizeBig: WidgetStyle = [Filled.Rect.baseSizeBig, {
          buttonBg: null,
        }]
        
        export const addSizeNormal: WidgetStyle = {
          button: {
            w: 'auto', hMin: 30, r: 10, p: [4, 6], g: 4,
            ...Txt.normal1,
          },
        }
        
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
          export const normal: AppWidgetStyle = t => [baseSizeBig, addSizeNormal, addColorNormal(t)]
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
          export const normal: AppStyle = t => W.t(SWidget.Filled.Rect.Big.main(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Rect.Big.danger(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Rect.Big.accent2(t))
        }
        export namespace Normal {
          export const main: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.main(t))
          export const accent: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.accent(t))
          export const accent2: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.accent2(t))
          export const normal: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.main(t))
          export const danger: AppStyle = t => W.t(SWidget.Filled.Rect.Normal.danger(t))
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


