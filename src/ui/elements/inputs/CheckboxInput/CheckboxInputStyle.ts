import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import Elem = WidgetStyle.Elem
import CssProp = WidgetStyle.CssProp
import CssAttr = WidgetStyle.CssAttr
import CssPseudo = WidgetStyle.CssPseudo
import CssWidget = WidgetStyle.CssWidget
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { RippleStyle } from 'src/ui/elements/Ripple0/RippleStyle.ts'
import hoverable = EmotionCommon.hoverable
import center = EmotionCommon.center
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import reset = EmotionCommon.reset




export namespace CheckboxInputStyle {
  
  
  import Txt = EmotionCommon.Txt
  import row = EmotionCommon.row
  export const El = function(){
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
    const iconChecked = new Elem(SvgIconsStyle.El.icon.name, { }, {
      color: SvgIconsStyle.El.icon.props.color
    })
    const ripple = RippleStyle.El.frame
    
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
      position: relative;
      overflow-wrap: anywhere;
      cursor: pointer;
      
      transition: background linear 300ms;
    }
    ${W.use.s.normal().e.input().thisUse} {
      ${resetInput};
      ${abs};
      opacity: 0;
      cursor: pointer;
    }
    ${W.use.s.normal().e.iconBox().thisUse} {
      grid-area: 1;
      pointer-events: none;
      ${center};
    }
    ${W.use.s.normal().e.iconBoxChecked().thisUse} {
      grid-area: 1;
      pointer-events: none;
      display: none;
    }
    // state: checked
    ${W.use.s.checked().e.iconBox().thisUse} {
      display: none;
    }
    ${W.use.s.checked().e.iconBoxChecked().thisUse} {
      ${center};
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
        ${abs};
        border: 2px solid;
        border-color: ${t.inputRadio.bgFocus[0]};
        border-radius: inherit;
      }
    }
    ${W.use.s.normal().e.iconChecked().thisUse} {
      width: 100%;
      height: 100%;
      ${W.e.iconChecked.e.p.color.set(t.inputRadio.bgFocus[0])};
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
      ${center};
      ${W.e.frame.e.p.color.set(t.buttonNormal.bg[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.p.mode.set('center')};
      ${W.e.ripple.e.p.color.set(t.ripple.contentOnTransparent[0]+'88')};
    }
    // state: hover
    ${hoverable} {
      ${W.use.s.hover().e.frame().thisUse} {
        background: ${t.buttonTransparent.bgFocus[0]};
      }
    }
    // state: active, focus, focus-visible
    ${W.use.s.anyFocus().e.frame().thisUse} {
      background: ${t.buttonTransparent.bgFocus[0]};
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
      ${Txt.large2};
      ${row};
      align-items: center;
      ${W.e.frame.e.p.color.set(t.page.content2[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.p.mode.set('cursor')};
      ${W.e.ripple.e.p.color.set(t.ripple.contentOnTransparent[0]+'88')};
    }
    // state: hover
    ${hoverable} {
      ${W.use.s.hover().e.frame().thisUse} {
        background: ${t.buttonTransparent.bgFocus[0]};
      }
    }
    // state: focus-visible
    ${W.use.s.focusVisible().e.frame().thisUse} {
      background: ${t.buttonTransparent.bgFocus[0]};
    }
  `
  
  
  
}