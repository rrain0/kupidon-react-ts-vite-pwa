import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { CommonStyle } from 'src/views/CommonStyle'
import rowWrap = EmotionCommon.rowWrap
import col = EmotionCommon.col
import bgcInBorder = EmotionCommon.bgcInBorder
import hoverable = EmotionCommon.hoverable




export namespace RadioInputGroupStyle {
  
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const radioGroupClassName = 'rrainuiRadioGroup'
    export const borderClassName = 'rrainuiBorder'
    
    export const radioGroupClass = '.'+radioGroupClassName
    export const borderClass = '.'+borderClassName
    
    export const radioGroup = '&'+radioGroupClass
    export const radioGroupHover = radioGroup+':hover'
    export const radioGroupFocusVisible = radioGroup+':focus-visible'
    export const radioGroupError = radioGroup+Attr.error
    
    export const border = radioGroup+'>'+borderClass
    export const borderHover = radioGroupHover+'>'+borderClass
    export const borderFocusVisible = radioGroupFocusVisible+'>'+borderClass
    export const borderError = radioGroupError+'>'+borderClass
  }
  export namespace Prop {
    export const color = CommonStyle.Prop0.prop.color
  }
  
  
  export const rowGroup = (t: AppTheme.Theme) => css`
    // normal
    ${El.radioGroup} {
      min-height: 50px;
      width: 100%;
      ${rowWrap};
      gap: 4px 32px;
      justify-content: start;
      align-items: center;
      border-radius: 15px;
    }
    ${El.border} {
      border: 2px solid transparent;
      background-size: 200% 100%;
      background-position: 100% 0;
      transition: background-position 0.8s ease-out;
      ${bgcInBorder};
    }
    
    // hover
    ${hoverable}{
      ${El.borderHover} {
        background-position: 0 0;
      }
    }

    // focus-visible
    // правда фокус оно всё равно не ловит
    ${El.borderFocusVisible} {
      background-position: 0 0;
    }
    
    // error
    ${El.radioGroupError} {
      background: ${t.input.bgcError[0]};
    }
    ${El.borderError} {
      background-image: linear-gradient(
              to right,
              ${t.input.borderHover[0]},
              ${t.input.border[0]},
              ${t.input.border[1]}
      );
    }
  `
  
  
  
  export const colGroup = (t: AppTheme.Theme) => css`
    // normal
    ${El.radioGroup} {
      width: 100%;
      ${col};
      //gap: 4px 32px;
      //justify-content: start;
      align-items: stretch;
      border-radius: 15px;
    }
    ${El.border} {
      border: 2px solid transparent;
      background-size: 200% 100%;
      background-position: 100% 0;
      transition: background-position 0.8s ease-out;
      ${bgcInBorder};
    }

    // hover
    ${hoverable}{
      ${El.borderHover} {
        background-position: 0 0;
      }
    }

    // focus-visible
    // правда фокус оно всё равно не ловит
    ${El.borderFocusVisible} {
      background-position: 0 0;
    }
    
    // error
    ${El.radioGroupError} {
      background: ${t.input.bgcError[0]};
    }
    ${El.borderError} {
      background-image: linear-gradient(
              to right,
              ${t.input.borderHover[0]},
              ${t.input.border[0]},
              ${t.input.border[1]}
      );
    }
  `
  
  
  
}