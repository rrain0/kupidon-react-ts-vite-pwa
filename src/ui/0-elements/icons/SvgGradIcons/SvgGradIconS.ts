import { css } from '@emotion/react'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import Elem = WidgetStyle0.Elem0
import CssProp = WidgetStyle0.CssProp



// TODO Style - remove after NavButton Refactor
export namespace SvgGradIconsStyle {
  
  
  export const El = function() {
    const icon = new Elem('rruiGradIcon', {}, {
      size: new CssProp('--size'),
      firstColor: new CssProp('--grad-icon-color-0'),
      secondColor: new CssProp('--grad-icon-color-1'),
    })
    return { root: icon, icon } as const
  }()
  
  
  
  
  export const normal = (t: AppTheme.Theme) => css`
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('auto')}
      ${El.icon.props.firstColor.set(t.gradIcon.ct[0])}
      ${El.icon.props.secondColor.set(t.gradIcon.ct[1])}
    }
  `
  
  
}
