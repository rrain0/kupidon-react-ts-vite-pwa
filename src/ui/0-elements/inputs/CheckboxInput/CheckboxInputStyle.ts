import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import Elem = WidgetStyle0.Elem
import CssProp = WidgetStyle0.CssProp
import CssPropEnum = WidgetStyle0.CssPropEnum
import CssAttr = WidgetStyle0.CssAttr
import CssPseudo = WidgetStyle0.CssPseudo
import CssWidget = WidgetStyle0.CssWidget
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import hoverable = EmotionCommon.hoverable
import flexC = EmotionCommon.flexC
import resetInput = EmotionCommon.resetInput
import absTlwh = EmotionCommon.absTlwh
import reset = EmotionCommon.reset
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row




export namespace CheckboxInputStyle {
  
  const RippleEl = function() {
    const frame = new Elem(RippleS6.W.els.rippleFrame.n, { }, {
      mode: new CssPropEnum(
        RippleS6.W.els.ripple.ps!.mode.n,
        ['center', 'pointer']
      ),
      color: new CssProp(RippleS6.W.els.ripple.ps!.color.n),
    })
    const ripple = new Elem(RippleS6.W.els.ripple.n, { }, { })
    
    return { frame, ripple } as const
  }()
  export const El = function() {
    const frame = new Elem('rrainuiFrame', { }, {
      color: CssProp.color,
    })
    const input = new Elem('rrainuiInput', {
      normal: CssPseudo.empty,
      checked: CssPseudo.checked,
      hover: CssPseudo.hover,
      active: CssPseudo.active,
      focus: CssPseudo.focus,
      focusVisible: CssPseudo.focusVisible,
      anyFocus: CssPseudo.anyFocus,
      readOnly: CssPseudo.readOnly,
      disabled: CssPseudo.disabled,
      error: CssAttr.dataError,
    }, { })
    const iconBox = new Elem('rrainuiIconBox', { }, { })
    const iconBoxChecked = new Elem('rrainuiIconBoxChecked', { }, { })
    const iconChecked = new Elem(SvgIconS6.W.els.icon.n, { }, {
      color: new CssProp(SvgIconS6.W.els.icon.ps!.color.n),
    })
    const ripple = RippleEl.frame
    
    return { frame, input, iconBox, iconBoxChecked, iconChecked, ripple } as const
  }()
  
  export const W = CssWidget
    .ofRoot('frame', El.frame)
    .add('frame', '>', 'input', El.input)
    .add('frame', '>', 'iconBox', El.iconBox)
    .add('frame', '>', 'iconBoxChecked', El.iconBoxChecked)
    .add('iconBoxChecked', '>', 'iconChecked', El.iconChecked)
    .add('frame', '>', 'ripple', El.ripple)
  
  
  
  
  const base = css`
    // state: normal
    ${W.use.s.normal().e.frame().thisUse} {
      ${reset};
    }
    ${W.use.s.normal().e.input().thisUse} {
      ${resetInput};
      ${absTlwh};
      opacity: 0;
      cursor: pointer;
    }
    ${W.use.s.normal().e.iconBox().thisUse} {
      pointer-events: none;
      ${flexC};
    }
    ${W.use.s.normal().e.iconBoxChecked().thisUse} {
      pointer-events: none;
      display: none;
    }
    // state: checked
    ${W.use.s.checked().e.iconBox().thisUse} {
      display: none;
    }
    ${W.use.s.checked().e.iconBoxChecked().thisUse} {
      ${flexC};
    }
    // state: disabled
    ${W.use.s.disabled().e.ripple().thisUse} {
      display: none;
    }
  `
  
  
  
  const addCheckboxStyle = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.iconBox().thisUse},
    ${W.use.s.normal().e.iconBoxChecked().thisUse} {
      width: 22px;
      height: 22px;
      border-radius: 4px;
      padding: 2px;
      position: relative;
      
      ::after {
        content: '';
        ${absTlwh};
        border: 2px solid;
        border-color: ${t.inputRadio.bgFc};
        border-radius: inherit;
      }
    }
    ${W.use.s.normal().e.iconChecked().thisUse} {
      width: 100%;
      height: 100%;
      ${W.e.iconChecked.e.p.color.set(t.inputRadio.bgFc)};
    }
    // state: active, focus, focus-visible
    ${W.use.s.anyFocus().e.iconBox().thisUse},
    ${W.use.s.anyFocus().e.iconBoxChecked().thisUse} {
      ::after {
        border-width: 2.5px;
      }
    }
    // state: error
    ${W.use.s.error().e.iconBox().thisUse},
    ${W.use.s.error().e.iconBoxChecked().thisUse} {
      ::after {
        border-color: #ff8787;
      }
    }
  `
  
  
  
  // shape: round, size: normal, color: normal
  export const roundNormalNormal = (t: AppTheme.Theme) => css`
    ${base};
    ${addCheckboxStyle(t)};
    // state: normal
    ${W.use.s.normal().e.frame().thisUse} {
      height: 50px;
      width: 50px;
      background: none;
      border-radius: 999999px;
      padding: 14px;
      ${flexC};
      ${W.e.frame.e.p.color.set(t.boxNormal.bg)};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.p.mode.set('center')};
      ${W.e.ripple.e.p.color.set(t.ripple.ctOnTrans)};
    }
    // state: hover
    ${hoverable} {
      ${W.use.s.hover().e.frame().thisUse} {
        background: ${t.boxTransNormal.bgf};
      }
    }
    // state: active, focus, focus-visible
    ${W.use.s.anyFocus().e.frame().thisUse} {
      background: ${t.boxTransNormal.bgf};
    }
  `
  
  
  
  
  export const rectBigNormal = (t: AppTheme.Theme) => css`
    ${base};
    ${addCheckboxStyle(t)};
    // state: normal
    ${W.use.s.normal().e.frame().thisUse} {
      width: 100%;
      min-height: 50px;
      border-radius: 15px;
      background: none;
      padding: 8px 10px;
      ${Txt.s18WideLh150};
      ${row};
      align-items: center;
      ${W.e.frame.e.p.color.set(t.page.ct2)};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.p.mode.set('cursor')};
      ${W.e.ripple.e.p.color.set(t.ripple.ctOnTrans)};
    }
    // state: hover
    ${hoverable} {
      ${W.use.s.hover().e.frame().thisUse} {
        background: ${t.boxTransNormal.bgf};
      }
    }
    // state: focus-visible
    ${W.use.s.focusVisible().e.frame().thisUse} {
      background: ${t.boxTransNormal.bgf};
    }
  `
  
  
  
}