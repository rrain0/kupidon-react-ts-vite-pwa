import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import row = EmotionCommon.row
import flexC = EmotionCommon.flexC



export namespace RadioInputStyle {
  
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const frameClassName = 'rrainuiFrame'
    export const inputClassName = 'rrainuiInput'
    export const iconWrapClassName = 'rrainuiIconWrap'
    export const iconClassName = SvgIconS6.W.els.icon.n
    export const borderClassName = 'rrainuiBorder'
    export const rippleFrameClassName = RippleS6.W.els.rippleFrame.n
    
    export const frameClass = '.'+frameClassName
    export const inputClass = '.'+inputClassName
    export const iconWrapClass = '.'+iconWrapClassName
    export const iconClass = '.'+iconClassName
    export const borderClass = '.'+borderClassName
    export const rippleFrameClass = '.'+rippleFrameClassName
    
    export const frame = '&'+frameClass
    export const frameHover = frame+`:has(>${inputClass}:hover)`
    export const frameDisabled = frame+`:has(>${inputClass}:disabled)`
    export const frameError = frame+`:has(>${inputClass}${Attr.error})`
    
    export const input = frame+'>'+inputClass
    export const inputHover = frame+'>'+inputClass+':hover'
    export const inputFocusVisible = frame+'>'+inputClass+':focus-visible'
    export const inputChecked = frame+'>'+inputClass+':checked'
    export const inputDisabled = frame+'>'+inputClass+':disabled'
    export const inputError = frame+'>'+inputClass+Attr.error
    
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
    export const color = WidgetStyle0.Prop0.prop.color
    export const activeIconColor = '--active-icon-color'
    export const inactiveIconColor = '--inactive-icon-color'
    export const rippleColor = RippleS6.W.els.ripple.ps!.color.n
  }
  
  
  
  export const radio = (t: AppTheme.Theme) => css`
    // normal
    ${El.frame} {
      border-radius: 15px;
      ${row};
      gap: 16px;
      padding: 8px 10px 8px 10px;
      
      ${Txt.s18WideLh150};
      color: ${t.page.ct2};
      ${Prop.color}: ${t.page.ct2};
    }
    ${El.ripple}{
      ${Prop.rippleColor}: ${t.ripple.ctOnTrans};
    }
    ${El.iconWrap}{
      /*align-self: start;*/
      /* ${flexC}; */
      width: 26px;
      height: 26px;
      --size: auto;
      ${Prop.activeIconColor}: ${t.inputRadio.bgFc};
      ${Prop.inactiveIconColor}: ${t.inputRadio.bgFc};
    }
    
    // hover
    ${hoverable}{
      ${El.borderHover}{
        background: ${t.boxTransNormal.bgf};
      }
    }
    
    // focus-visible
    ${El.borderFocusVisible}{
      background: ${t.boxTransNormal.bgf};
    }
  `
  
  
  
}