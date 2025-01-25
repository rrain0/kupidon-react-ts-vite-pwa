import { ObjectU } from '@util/common/ObjectU.ts'
import { StringU } from '@util/common/StringU.ts'
import { RippleStyle } from 'src/_old0/ui/0-elements/Ripple0/RippleStyle.ts'
import { CssAttrs } from 'src/mini-libs/widget-style-4/css/CssAttr.ts'
import { CssElem } from 'src/mini-libs/widget-style-4/css/CssElem.ts'
import { CssProp, CssProps } from 'src/mini-libs/widget-style-4/css/CssProp.ts'
import { CssPropEnum } from 'src/mini-libs/widget-style-4/css/CssPropEnum.ts'
import { CssPseudos } from 'src/mini-libs/widget-style-4/css/CssPseudo.ts'
import { CssWidget } from 'src/mini-libs/widget-style-4/widget/CssWidget.ts'
import {
  WidgetElem,
  WidgetMultiAnyTransformer, WidgetMultiPropTransformer,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import {
  AdditionalProps,
  CommonStates,
} from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { AppWidgetStyle, WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import capitalize = StringU.capitalize
import resetButton = WidgetStyleCommon.resetButton
import row = WidgetStyleCommon.row
import abs = WidgetStyleCommon.abs
import Txt = WidgetStyleCommon.Txt
import ObjectPrefixKeys = ObjectU.ObjectPrefixCapitalizeKeys




export namespace ButtonS6 {
  
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const button = WidgetElem.of({
      className: 'rruiButton',
      ...up,
      states: CommonStates,
    })
    const border = WidgetElem.of({
      className: 'rruiBorder',
      upElem: button, upSelector: '>',
    })
    const rippleElems = RippleS6.buildWidgetElems({ upElem: border, upSelector: '>' })
    return {
      button,
      border,
      ...ObjectPrefixKeys('ripple', rippleElems),
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
  
  
  export namespace ST {
    
    export const base: WidgetStyle = {
      button: {
        ...resetButton,
        pos: 'rel',
        ...row,
        alignItems: 'center',
        justifyContent: 'center',
        overflowWrap: 'anywhere',
        overflow: 'hidden',
        transition: 'background linear 300ms',
      },
      border: {
        ...abs,
        pointerEvents: 'none',
        r: 'inherit',
      },
      ripple: RippleS6.ST.base,
    }
    
    export namespace Filled {
      
      export namespace Rect {
        
        // type: filled, shape: rect, size: big
        export const baseBig: WidgetStyle = {
          ...base,
          // TODO Style - prevent style rewriting when add after 'base' - make array of objects
          button: { ...base.button,
            // TODO Style - p: [8, 16]
            w: 'full', hMin: 50, r: 15, pv: 8, ph: 16,
            ...Txt.large2,
          },
        }
        
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
        
        export namespace Big {
          export const main: AppWidgetStyle = t => ({
            ...baseBig,
            ...addColorMain(t),
          })
        }
        
      }
      
    }
    
  }
  
  
  
  export namespace S {
    export namespace Filled {
      export namespace Rect {
        export namespace Big {
          export const main = (t: AppTheme.Theme) => W.t(ST.Filled.Rect.Big.main(t))
        }
      }
    }
  }
  
  
}


