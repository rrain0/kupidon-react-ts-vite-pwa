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
  WidgetMultiAnyTransformer, WidgetStyle,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { CommonStates, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import capitalize = StringU.capitalize
import resetButton = WidgetStyleCommon.resetButton
import row = WidgetStyleCommon.row
import abs = WidgetStyleCommon.abs
import Txt = WidgetStyleCommon.Txt




export namespace ButtonS6 {
  
  namespace WidgetElems {
    export const button = WidgetElem.of({
      className: 'rruiButton',
      states: CommonStates,
    })
    export const border = WidgetElem.of({
      className: 'rruiBorder',
    })
  }
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
  
  export const W = Widget.of({
    rootElem: WidgetElems.button,
    elems: WidgetElems,
    states: WidgetStates,
  })
  
  
  export namespace ST {
    
    export const base = {
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
        borderRadius: 'inherit',
      },
      ripple: { /* ripple base */ },
      
      disabled: {
        button: {
          cursor: 'not-allowed',
        },
      },
    } satisfies WidgetStyle
    
    export namespace Filled {
      export namespace Rect {
        // type: filled, shape: rect, size: big
        export const big: WidgetStyle = {
          ...base,
          // TODO Style - prevent style rewriting when add after 'base' - make array of objects
          button: { ...base.button,
            w: 'full',
            hMin: 50,
            r: 15,
            pv: 8, ph: 16,
            ...Txt.large2,
          },
          border: { ...base.button,
            border: null,
          },
        }
      }
    }
  }
  
  
  
  
  
  export const buildButtonWidget = (rootConfig?: {
    widget: CssWidget<any>,
    upElementName: string,
    upSelector: string,
    widgetName: string,
  }): CssWidget<any> => {
    
    const button = new CssElem('rruibutton', {
      normal: CssPseudos.empty,
      hover: CssPseudos.hover,
      active: CssPseudos.active,
      focus: CssPseudos.focus,
      focusVisible: CssPseudos.focusVisible,
      readOnly: CssPseudos.readOnly,
      disabled: CssPseudos.disabled,
      error: CssAttrs.dataError,
    }, {
      color: CssProps.color,
    })
    const border = new CssElem('rruiBorder', { }, { })
    const ripple = new CssElem(RippleStyle.El0.frameClassName, { }, {
      mode: new CssPropEnum(RippleStyle.Prop.mode, ['center', 'cursor']),
      color: new CssProp(RippleStyle.Prop.color),
    })
    
    const withPrefix = (str: string) => {
      if (!rootConfig?.widgetName) return str
      return `${rootConfig.widgetName}${capitalize(str)}`
    }
    
    const buttonWidget = (
      rootConfig
        ? rootConfig.widget.add(
          rootConfig.upElementName,
          rootConfig.upSelector,
          // @ts-ignore
          withPrefix('button'),
          button,
        )
        : CssWidget.ofRoot('button', button)
    )
      // @ts-ignore
      .add(withPrefix('button'), '>', withPrefix('border'), border)
      // @ts-ignore
      .add(withPrefix('border'), '>', withPrefix('ripple'), ripple)
    
    return buttonWidget
  }
  
  export const W0 = buildButtonWidget()
  
  
}


