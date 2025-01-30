import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle.ts'
import CssWidget = WidgetStyle.CssWidget
import CssPseudo = WidgetStyle.CssPseudo
import Elem = WidgetStyle.Elem
import CssProp = WidgetStyle.CssProp
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import CssProp0 = WidgetStyle0.CssProp
import Elem0 = WidgetStyle0.Elem0




// TODO remove
export namespace SvgIconS {
  
  
  export const W = (() => {
    const icon = new Elem('rruiIcon', {
      normal: CssPseudo.empty,
    }, {
      size: new CssProp('--size'),
      color: new CssProp('--color'),
      accentColor: new CssProp('--accent-color'),
    })
    const iconWidget = CssWidget.ofRoot('icon', icon)
    return iconWidget
  })()
  
  
  
  
  
  export const El = function() {
    const icon = new Elem0('rruiIcon', { }, {
      size: new CssProp0('--size'),
      color: new CssProp0('--color'),
      accentColor: new CssProp0('--accent-color'),
    })
    return { root: icon, icon } as const
  }()
  
  
}
