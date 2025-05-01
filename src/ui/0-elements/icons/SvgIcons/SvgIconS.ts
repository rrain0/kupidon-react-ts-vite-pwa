import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import CssProp0 = WidgetStyle0.CssProp
import Elem0 = WidgetStyle0.Elem0


// TODO Style - remove
export namespace SvgIconS {
  
  export const El = function() {
    const icon = new Elem0('rruiIcon', { }, {
      size: new CssProp0('--size'),
      color: new CssProp0('--color'),
      accentColor: new CssProp0('--color-accent'),
    })
    return { root: icon, icon } as const
  }()
  
}
