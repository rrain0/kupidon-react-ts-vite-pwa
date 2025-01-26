import { css } from '@emotion/react'
import { RippleStyle } from 'src/_old0/ui/0-elements/Ripple0/RippleStyle.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgGradIconsStyle } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import DataAttr = WidgetStyle0.DataAttr
import Pseudo00 = WidgetStyle0.Pseudo0
import Elem00 = WidgetStyle0.Elem0
import CssPropEnum0 = WidgetStyle0.CssPropEnum
import CssProp0 = WidgetStyle0.CssProp
import CssPropColor = WidgetStyle0.CssPropColor




export namespace NavButtonStyle {
  
  
  
  
  export const Attr = {
    error: DataAttr.error,
  } as const
  
  const ButtonEl = function() {
    const btn = new Elem00(ButtonS6.W.els.button.n, {
      hover: Pseudo00.hover,
      active: Pseudo00.active,
      focus: Pseudo00.focus,
      focusVisible: Pseudo00.focusVisible,
      disabled: Pseudo00.disabled,
      error: Attr.error,
    }, {
      color: CssPropColor,
    })
    const border = btn.toElem('>', new Elem00(ButtonS6.W.els.border.n, {}, {}))
    const ripple = border.toElem('>', new Elem00(RippleStyle.El0.frameClassName, {}, {
      mode: new CssPropEnum0(RippleStyle.Prop.mode, ['center', 'cursor']),
      color: new CssProp0(RippleStyle.Prop.color),
    }))
    return { root: btn, btn, border, ripple } as const
  }()
  export const El = function() {
    const btn = ButtonEl.btn
    const icon = btn.toElem('>', SvgIconS.El.icon)
    const gradIcon = btn.toElem('>', SvgGradIconsStyle.El.root)
    return { ...ButtonEl, gradIcon, icon } as const
  }()
  
  
  
  
  
  export const nav = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.base()}
    // normal
    ${El.btn.thiz()} {
      height: 100%;
      flex: 1;
      ${col};
      align-items: center;
      gap: 3px;
      padding: 5px 0 2px;

      background: none;
      ${El.btn.props.color.set(t.navButton.ct[0])}
      
      ${Txt.small5};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.mode.set('center')}
      ${El.ripple.props.color.set(t.ripple.ctOnTransparent2)}
    }
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('100%')}
      ${El.icon.props.color.set(t.navButton.ct[0])}
    }
    ${El.gradIcon.thiz()} {
      ${El.gradIcon.props.size.set('100%')}
      ${El.gradIcon.props.firstColor.set(t.navButton.ct[0])}
      ${El.gradIcon.props.secondColor.set(t.navButton.ct[0])}
    }
    
    // link active
    // IT IS WORKING !!!: a.active &.btnDotClass > iconDotClass
    a.active ${El.icon.thiz()} {
      ${El.icon.props.color.set(t.navButton.cta[0])}
    }
    a.active ${El.gradIcon.thiz()} {
      ${El.gradIcon.props.firstColor.set(t.iconGradient.ct[0])}
      ${El.gradIcon.props.secondColor.set(t.iconGradient.ct[1])}
    }
    a.active ${El.btn.thiz()} {
      ${El.btn.props.color.set(t.navButton.cta[0])}
    }
    
    // hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.navButton.bgFocus[0]};
    }}

    // focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.navButton.bgFocus[0]};
    }
  `
  
  
  
  
}
