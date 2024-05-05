import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import Elem = ElementStyle.Elem
import CssProp = ElementStyle.CssProp




export namespace SvgGradIconsStyle {
  
  
  export const El = function(){
    const icon = new Elem('rrainuiIcon', {})
    return { root: icon, icon } as const
  }()
  export const Prop = {
    size: new CssProp('--icon-size'),
    firstColor: new CssProp('--icon-grad-first-color'),
    secondColor: new CssProp('--icon-grad-second-color'),
  } as const
  
  
  
  
  export const normal = (t: AppTheme.Theme)=>css`
    ${El.icon.thiz()} {
      ${Prop.size.name}: auto;
      ${Prop.firstColor.name}: ${t.containerAccent.contentGradIcon[0]};
      ${Prop.secondColor.name}: ${t.containerAccent.contentGradIcon[1]};
    }
  `
  
  
}