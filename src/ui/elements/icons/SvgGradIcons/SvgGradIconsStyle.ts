import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import Elem = ElementStyle.Elem
import CssProp = ElementStyle.CssProp




export namespace SvgGradIconsStyle {
  
  
  export const El = function(){
    const icon = new Elem('rrainuiGradIcon', {},{
      size: new CssProp('--icon-size'),
      firstColor: new CssProp('--icon-grad-first-color'),
      secondColor: new CssProp('--icon-grad-second-color'),
    })
    return { root: icon, icon } as const
  }()
  
  
  
  
  export const normal = (t: AppTheme.Theme)=>css`
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('auto')}
      ${El.icon.props.firstColor.set(t.containerAccent.contentGradIcon[0])}
      ${El.icon.props.secondColor.set(t.containerAccent.contentGradIcon[1])}
    }
  `
  
  
}