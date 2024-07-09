import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { WidgetStyle } from '@util/mini-libs/widget-style/WidgetStyle.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { RippleStyle } from 'src/ui/elements/Ripple/RippleStyle.ts'
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable



export namespace RadioInputStyle {
  
  import row = EmotionCommon.row
  import center = EmotionCommon.center
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const frameClassName = 'rrainuiFrame'
    export const inputClassName = 'rrainuiInput'
    export const iconWrapClassName = 'rrainuiIconWrap'
    export const iconClassName = SvgIconsStyle.El.icon.name
    export const borderClassName = 'rrainuiBorder'
    export const rippleFrameClassName = RippleStyle.El0.frameClassName
    
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
    export const color = WidgetStyle.Prop0.prop.color
    export const activeIconColor = '--active-icon-color'
    export const inactiveIconColor = '--inactive-icon-color'
    export const rippleColor = RippleStyle.Prop.color
  }
  
  
  
  export const radio = (t: AppTheme.Theme) => css`
    // normal
    ${El.frame} {
      border-radius: 15px;
      ${row};
      gap: 16px;
      padding: 8px 10px 8px 10px;
      
      ${Txt.large2};
      color: ${t.page.content2[0]};
      ${Prop.color}: ${t.page.content2[0]};
    }
    ${El.ripple}{
      ${Prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.iconWrap}{
      /*align-self: start;*/
      /* ${center}; */
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