import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import Theme = AppTheme.Theme
import Elem = WidgetStyle.Elem
import CssPropEnum = WidgetStyle.CssPropEnum
import CssProp = WidgetStyle.CssProp
import CssWidget = WidgetStyle.CssWidget




export namespace RippleStyle {
  
  export namespace El0 {
    export const frameClassName = 'rrainuiRippleFrame'
    export const viewClassName = 'rrainuiRippleRipple'
    
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
    ${El0.frame} {
    
    }
    ${El0.view} {

    }
  `
  
  
  
  
  export const El = function(){
    const frame = new Elem('rrainuiRippleFrame', { }, {
      mode: new CssPropEnum('--ripple-mode', ['center', 'cursor']),
      color: new CssProp('--ripple-color'),
    })
    const ripple = new Elem('rrainuiRippleRipple', { }, { })
    
    return { frame, ripple } as const
  }()
  
  export const W = CssWidget
    .ofRoot('frame', El.frame)
    .add('frame', '>', 'ripple', El.ripple)
  
  
  
}