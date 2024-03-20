import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { CommonStyle } from 'src/views/CommonStyle'
import Theme = AppTheme.Theme
import bgcInBorder = EmotionCommon.bgcInBorder
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable



export namespace TextareaStyle {
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const frameClassName = 'rrainuiFrame'
    export const textareaClassName = 'rrainuiTextarea'
    export const borderClassName = 'rrainuiBorder'
    
    export const frameClass = '.'+frameClassName
    export const textareaClass = '.'+textareaClassName
    export const borderClass = '.'+borderClassName
    
    export const frame = '&'+frameClass
    export const frameDisabled = frame+`:has(>${textareaClass}:disabled)`
    export const frameError = frame+`:has(>${textareaClass}${Attr.error})`
    
    export const textarea = frame+'>'+textareaClass
    export const textareaHover = frame+'>'+textareaClass+':hover'
    export const textareaActive = frame+'>'+textareaClass+':active'
    export const textareaFocus = frame+'>'+textareaClass+':focus'
    export const textareaFocusVisible = frame+'>'+textareaClass+':focus-visible'
    export const textareaReadOnly = frame+'>'+textareaClass+':read-only'
    export const textareaDisabled = frame+'>'+textareaClass+':disabled'
    export const textareaError = frame+'>'+textareaClass+Attr.error
    
    export const border = frame+'>'+borderClass
    export const borderHover = textareaHover+'~'+borderClass
    export const borderActive = textareaActive+'~'+borderClass
    export const borderFocus = textareaFocus+'~'+borderClass
    export const borderFocusVisible = textareaFocusVisible+'~'+borderClass
    export const borderReadOnly = textareaReadOnly+'~'+borderClass
    export const borderDisabled = textareaDisabled+'~'+borderClass
    export const borderError = textareaError+'~'+borderClass
  }
  export namespace Prop {
    export const color = CommonStyle.Prop0.prop.color
  }
  
  
  
  
  export const normal = (t:Theme)=>css`
    // normal
    ${El.frame} {
      border-radius: 15px;
      background: ${t.input.bgc[0]};
    }
    ${El.textarea} {
      width: 100%;
      min-height: 150px;
      //height: fit-content;
      //resize: vertical;
      resize: none;
      overflow: hidden;
      padding: 8px 16px;
      ${Txt.large2};
      color: ${t.input.content[0]};
      ${Prop.color}: ${t.input.content[0]};

      ::placeholder {
        color: ${t.input.placeholder[0]};
      }
    }
    ${El.border} {
      border: 2px solid transparent;
      background-image: linear-gradient(
              to right,
              ${t.input.borderHover[0]},
              ${t.input.border[0]},
              ${t.input.border[1]}
      );
      background-size: 200% 100%;
      background-position: 100% 0;
      transition: background-position 0.8s ease-out;
      ${bgcInBorder};
    }
    
    // hover
    ${hoverable} {
      ${El.borderHover}{
        background-position: 0 0;
      }
    }
    
    // focus
    ${El.borderFocus} {
      background-position: 0 0;
    }
    
    // focus-visible
    ${El.borderFocusVisible}{
      background-position: 0 0;
    }
    
    // disabled
    ${El.frameDisabled} {
      cursor: auto;
      color: ${t.input.content[0]};
      ${Prop.color}: ${t.input.content[0]};
    }
    ${El.borderDisabled} {
      border-color: ${t.input.content[0]};
    }
    
    // error
    ${El.frameError} {
      background: ${t.input.bgcError[0]};
    }
  `
  
  
  export const small = (t:Theme)=>css`
    ${normal(t)};
    ${El.textarea} {
      width: 100%;
      padding: 8px 12px;
      ${Txt.small1};
    }
    ${El.border} {
      border-width: 1px;
    }
  `
  
  
}