import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { CommonStyle } from 'src/views/CommonStyle'
import Theme = AppTheme.Theme
import bgcInBorder = EmotionCommon.bgcInBorder
import PartialUndef = TypeUtils.PartialUndef
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable



export namespace InputStyle {
  
  
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const frameClassName = 'rrainuiFrame'
    export const inputClassName = 'rrainuiInput'
    export const borderClassName = 'rrainuiBorder'
    
    export const frameClass = '.'+frameClassName
    export const inputClass = '.'+inputClassName
    export const borderClass = '.'+borderClassName
    
    export const frame = '&'+frameClass
    export const frameError = frame+`:has(>${inputClass}${Attr.error})`
    
    export const input = frame+'>'+inputClass
    export const inputHover = frame+'>'+inputClass+':hover'
    export const inputActive = frame+'>'+inputClass+':active'
    export const inputFocus = frame+'>'+inputClass+':focus'
    export const inputFocusVisible = frame+'>'+inputClass+':focus-visible'
    export const inputReadOnly = frame+'>'+inputClass+':read-only'
    export const inputDisabled = frame+'>'+inputClass+':disabled'
    export const inputError = frame+'>'+inputClass+Attr.error
    
    export const border = frame+'>'+borderClass
    export const borderHover = inputHover+'~'+borderClass
    export const borderActive = inputActive+'~'+borderClass
    export const borderFocus = inputFocus+'~'+borderClass
    export const borderFocusVisible = inputFocusVisible+'~'+borderClass
    export const borderReadOnly = inputReadOnly+'~'+borderClass
    export const borderDisabled = inputDisabled+'~'+borderClass
    export const borderError = inputError+'~'+borderClass
  }
  export namespace Prop {
    export const color = CommonStyle.Prop0.prop.color
  }
  
  
  
  namespace Shape {
    export const normal = css`
      // normal
      ${El.frame} {
        height: 50px;
        border-radius: 15px;
      }
      ${El.input} {
        padding: 4px 16px;
        ${Txt.large2};
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
        ${El.inputHover} {}
        ${El.borderHover} {
          background-position: 0 0;
        }
      }
      
      // active
      ${El.inputActive} {}
      ${El.borderActive} {}
      
      // focus
      ${El.inputFocus} {}
      ${El.borderFocus} {}

      // focus-visible
      ${El.inputFocusVisible} {}
      ${El.borderFocusVisible} {
        background-position: 0 0;
      }

      // read-only
      ${El.inputReadOnly} {}
      ${El.borderReadOnly} {}

      // disabled
      ${El.inputDisabled} {
        cursor: auto;
      }

      // error
      ${El.frameError}{}
      ${El.inputError} {}
      ${El.borderError} {}
    `
    
    export const small = css`
      ${normal};
      ${El.frame} {
        height: 40px;
      }
      ${El.input} {
        padding: 4px 12px;
        ${Txt.large1};
      }
      ${El.border} {
        border-width: 1px;
      }
    `
  }
  
  
  namespace Color {
    export const normal = (t:Theme)=>css`
      // normal
      ${El.frame} {
        background: ${t.input.bgc[0]};
      }
      ${El.input} {
        color: ${t.input.content[0]};
        ${Prop.color}: ${t.input.content[0]};
  
        ::placeholder {
          color: ${t.input.placeholder[0]};
        }
      }
      ${El.border} {
        background-image: linear-gradient(
          to right,
          ${t.input.borderHover[0]},
          ${t.input.border[0]},
          ${t.input.border[1]}
        );
      }

      // disabled
      ${El.inputDisabled} {
        color: ${t.input.content[0]};
        ${Prop.color}: ${t.input.content[0]};
      }
      ${El.borderDisabled} {
        border-color: ${t.input.content[0]};
      }

      // error
      ${El.frameError}{
        background: ${t.input.bgcError[0]};
      }
    `
    
    /* background-image: linear-gradient(
         to right,
         ${t.input.error.border[0]},
         ${t.input.error.border[0]},
         ${t.input.error.border[0]}
       );
     */
  }
  
  
  
  
  
  export const inputNormal = (t:Theme)=>css`
    ${Shape.normal};
    ${Color.normal(t)};
  `
  export const inputSmall = (t:Theme)=>css`
    ${Shape.small};
    ${Color.normal(t)};
  `
  
  
  export const clickable = css`
    ${El.input},${El.inputReadOnly},${El.inputDisabled} {
      cursor: pointer;
    }
  `
  
  
  export type InputStyleProps = {
    size: 'normal'|'small'
    textSize: 'normal'|'small'|'smaller'
    clickable: boolean
    static: boolean
  }
  export type InputStylePartialProps = PartialUndef<InputStyleProps>
  export const input = (props?:InputStylePartialProps|undefined) =>
  (t:Theme) =>
  css`
    ${props?.clickable && clickable};
    
    ${inputNormal(t)};
    ${{
      'small': Shape.small,
    }[props?.size??'normal']};
    
    ${El.input} {
      ${{
        'normal': Txt.large2,
        'small': Txt.large1,
        'smaller': Txt.small2,
      }[props?.textSize??'']};
    }
    
    ${props?.static && css`
      ${El.frame} {
        cursor: auto;
        color: ${t.input.content[0]};
      }

      ${El.border} {
        border-color: ${t.page.content2[0]};
      }
    `}
  `
  
  
}