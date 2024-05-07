import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import Elem = ElementStyle.Elem
import CssProp = ElementStyle.CssProp




export namespace SvgIconsStyle {
  
  
  export const El = function(){
    const icon = new Elem('rrainuiIcon',{},{
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