import { css } from '@emotion/react'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { WidgetStyle } from '@util/mini-libs/widget-style/WidgetStyle.ts'
import Elem = WidgetStyle.Elem
import CssProp = WidgetStyle.CssProp
import CssAttr = WidgetStyle.CssAttr
import CssPseudo = WidgetStyle.CssPseudo
import CssWidget = WidgetStyle.CssWidget
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { RippleStyle } from 'src/ui/elements/Ripple/RippleStyle.ts'
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import center = EmotionCommon.center
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import centerAll = EmotionCommon.centerAll




export namespace CheckboxInputStyle {
  
  
  export const W = function(){
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
      readOnly: CssPseudo.readOnly,
      disabled: CssPseudo.disabled,
      error: CssAttr.dataError,
    }, { })
    const iconBox = new Elem('rrainuiIconBox', { }, { })
    const iconBoxChecked = new Elem('rrainuiIconBoxChecked', { }, { })
    // todo icon, ripple
    
    const inputWidget = CssWidget
      .ofRoot('frame', frame)
      .add('frame', '>', 'input', input)
      .add('frame', '>', 'iconBox', iconBox)
      .add('frame', '>', 'iconBoxChecked', iconBoxChecked)
    
    return inputWidget
  }()
  
  
  
  export namespace Attr0 {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const frameClassName = ButtonStyle.El.btn.name
    export const inputClassName = 'rrainuiInput'
    export const iconWrapClassName = 'rrainuiIconWrap'
    export const iconClassName = SvgIconsStyle.El.icon.name
    export const borderClassName = ButtonStyle.El.border.name
    export const rippleFrameClassName = ButtonStyle.El.ripple.name
    
    export const frameClass = '.'+frameClassName
    export const inputClass = '.'+inputClassName
    export const iconWrapClass = '.'+iconWrapClassName
    export const iconClass = '.'+iconClassName
    export const borderClass = '.'+borderClassName
    export const rippleFrameClass = '.'+rippleFrameClassName
    
    export const frame = '&'+frameClass
    export const frameHover = frame+`:has(>${inputClass}:hover)`
    export const frameDisabled = frame+`:has(>${inputClass}:disabled)`
    export const frameError = frame+`:has(>${inputClass}${Attr0.error})`
    
    export const input = frame+'>'+inputClass
    export const inputHover = frame+'>'+inputClass+':hover'
    export const inputFocusVisible = frame+'>'+inputClass+':focus-visible'
    export const inputChecked = frame+'>'+inputClass+':checked'
    export const inputDisabled = frame+'>'+inputClass+':disabled'
    export const inputError = frame+'>'+inputClass+Attr0.error
    
    export const iconWrap = frame+'>'+iconWrapClass
    export const iconWrapHover = inputHover+'~'+iconWrapClass
    export const iconWrapChecked = inputChecked+'~'+iconWrapClass
    export const iconWrapDisabled = inputDisabled+'~'+iconWrapClass
    export const iconWrapError = inputError+'~'+iconWrapClass
    
    export const icon = iconWrap+'>'+iconWrapClass
    export const iconChecked = iconWrapChecked+'>'+iconWrapClass
    
    export const border = frame+'>'+borderClass
    export const borderHover = inputHover+'~'+borderClass
    export const borderFocusVisible = inputFocusVisible+'~'+borderClass
    export const borderDisabled = inputDisabled+'~'+borderClass
    export const borderError = inputError+'~'+borderClass
    
    export const ripple = frame+'>*>'+rippleFrameClass
    export const rippleDisabled = inputDisabled+'~*>'+rippleFrameClass
  }
  export namespace Prop {
    export const color = WidgetStyle.Prop0.prop.color
    export const activeIconColor = '--active-icon-color'
    export const inactiveIconColor = '--inactive-icon-color'
    export const rippleColor = RippleStyle.Prop.color
  }
  
  
  
  
  const basic = (t: AppTheme.Theme) => css`
    ${ButtonStyle.textRectBigNormal(t)};
    
    // state: normal
    /* ${W.use.s.normal().e.frame().thisUse} {
      width: 60px;
      height: 60px;
      ${centerAll};
    } */
    ${W.use.s.normal().e.input().thisUse} {
      ${resetInput};
      ${abs};
      opacity: 0;
      cursor: pointer;
    }
    ${W.use.s.normal().e.iconBox().thisUse} {
      display: flex;
      ${SvgIconsStyle.El.icon.sel()} {
        ${SvgIconsStyle.El.icon.props.color.name}: var(${CheckboxInputStyle.Prop.inactiveIconColor})
      }
    }
    ${W.use.s.normal().e.iconBoxChecked().thisUse} {
      display: none;
      ${SvgIconsStyle.El.icon.sel()} {
        ${SvgIconsStyle.El.icon.props.color.name}: var(${CheckboxInputStyle.Prop.activeIconColor})
      }
    }
    
    // state: checked
    ${W.use.s.checked().e.iconBox().thisUse} {
      display: none;
    }
    ${W.use.s.checked().e.iconBoxChecked().thisUse} {
      display: flex;
    }
  `
  
  
  // size: normal, color: normal
  export const normalNormal = (t: AppTheme.Theme) => css`
    ${basic(t)};
    
    // state: normal
    ${W.use.s.normal().e.frame().thisUse} {
      padding: 6px;
    }
    ${W.use.s.normal().e.iconBox().thisUse} {
      width: 100%;
      height: 100%;
    }
    ${W.use.s.normal().e.iconBoxChecked().thisUse} {
      width: 100%;
      height: 100%;
    }
  `
  
  
  
  
  
  const normal = (t: AppTheme.Theme) => css`
    // normal
    ${El.frame} {
      border-radius: 15px;
      padding: 8px 6px;
      gap: 8px;
      
      ${Txt.large2};
      color: ${t.page.content2[0]};
      ${Prop.color}: ${t.page.content2[0]};
    }
    ${El.ripple}{
      ${Prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.iconWrap}{
      width: 26px;
      height: 26px;
      ${Prop.activeIconColor}: ${t.inputRadio.bgcFocus[0]};
      ${Prop.inactiveIconColor}: ${t.inputRadio.bgcFocus[0]};
    }
    
    // hover
    ${hoverable}{
      ${El.borderHover}{
        background: ${t.buttonTransparent.bgcFocus[0]};
      }
    }
    
    // focus-visible
    ${El.borderFocusVisible}{
      background: ${t.buttonTransparent.bgcFocus[0]};
    }
  `
  
  
  
}