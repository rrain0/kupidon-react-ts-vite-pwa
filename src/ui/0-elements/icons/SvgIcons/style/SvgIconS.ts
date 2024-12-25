import { css } from '@emotion/react'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import CssWidget = WidgetStyle.CssWidget
import CssPseudo = WidgetStyle.CssPseudo
import Elem = WidgetStyle.Elem
import CssProp = WidgetStyle.CssProp
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import CssProp0 = WidgetStyle0.CssProp
import Elem0 = WidgetStyle0.Elem0




export namespace SvgIconS {
  
  export const W = (() => {
    const icon = new Elem('rrainuiIcon', {
      normal: CssPseudo.empty,
    }, {
      size: new CssProp('--icon-size'),
      color: new CssProp('--icon-color'),
      accentColor: new CssProp('--icon-accent-color'),
    })
    const iconWidget = CssWidget.ofRoot('icon', icon)
    return iconWidget
  })()
  
  
  
  export const base = css`
    // normal
    ${W.use.s.normal().e.icon().thisUse} {
       ${W.e.icon.p.size.set('auto')}
       ${W.e.icon.p.color.set('black')}
       ${W.e.icon.p.accentColor.set('black')}
    }
  `
  
  
  export const normal = (t: AppTheme.Theme) => css`
    ${base};
    
    // normal
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.p.color.set(t.boxNormal.content1b[0])}
      ${W.e.icon.p.accentColor.set(t.boxNormal.content1b[0])}
    }
  `
  
  
  
  // TODO remove
  export const El = function() {
    const icon = new Elem0('rrainuiIcon', { }, {
      size: new CssProp0('--icon-size'),
      color: new CssProp0('--icon-color'),
      accentColor: new CssProp0('--icon-accent-color'),
    })
    return { root: icon, icon } as const
  }()
  
  
}
