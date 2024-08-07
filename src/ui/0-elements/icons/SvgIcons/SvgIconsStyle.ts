import { css } from '@emotion/react'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import Elem0 = WidgetStyle.Elem0
import CssProp = WidgetStyle.CssProp




export namespace SvgIconsStyle {
  
  
  export const El = function(){
    const icon = new Elem0('rrainuiIcon',{},{
      size: new CssProp('--icon-size'),
      color: new CssProp('--icon-color'),
      accentColor: new CssProp('--icon-accent-color'),
    })
    return { root: icon, icon } as const
  }()
  
  
  
  
  export const normal = (t: AppTheme.Theme)=>css`
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('auto')}
      ${El.icon.props.color.set('black')}
      ${El.icon.props.accentColor.set('black')}
    }
  `
  
  
}