import { css } from '@emotion/react'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import Elem = WidgetStyle0.Elem0
import CssProp = WidgetStyle0.CssProp




export namespace SvgGradIconsStyle {
  
  
  export const El = function() {
    const icon = new Elem('rrainuiGradIcon', {}, {
      size: new CssProp('--size'),
      firstColor: new CssProp('--icon-grad-first-color'),
      secondColor: new CssProp('--icon-grad-second-color'),
    })
    return { root: icon, icon } as const
  }()
  
  
  
  
  export const normal = (t: AppTheme.Theme) => css`
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('auto')}
      ${El.icon.props.firstColor.set(t.iconGradient.ct[0])}
      ${El.icon.props.secondColor.set(t.iconGradient.ct[1])}
    }
  `
  
  
}
