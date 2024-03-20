import { css } from '@emotion/react'
import { AppTheme } from 'src/utils/theme/AppTheme'
import Theme = AppTheme.Theme




export namespace RippleStyle {
  
  export namespace El {
    export const frameClassName = 'rrainuiRippleFrame'
    export const viewClassName = 'rrainuiRippleView'
    
    export const frameClass = '.'+frameClassName
    export const viewClass = '.'+viewClassName
    
    export const framePath = frameClass
    export const frame = '&'+frameClass
    
    export const viewPath = framePath+'>'+viewClass
    export const view = frame+'>'+viewClass
  }
  export namespace Prop {
    export const mode = '--ripple-mode'
    export const modeVar = `var(${mode})`
    
    export const color = '--ripple-color'
    export const colorVar = `var(${color})`
  }
  
  
  
  
  export const normal = (t:Theme)=>css`
    ${El.frame} {
    
    }
    ${El.view} {

    }
  `
  
  
  
}