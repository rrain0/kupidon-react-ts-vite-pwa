import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import Elem = WidgetStyle0.Elem
import CssPropEnum = WidgetStyle0.CssPropEnum
import CssProp = WidgetStyle0.CssProp



// TODO Style - remove old ripple style
export namespace RippleStyle {
  
  export const El = function() {
    const frame = new Elem(RippleS6.W.els.rippleFrame.n, { }, {
      mode: new CssPropEnum(
        RippleS6.W.els.ripple.ps!.mode.n,
        ['center', 'pointer']
      ),
      color: new CssProp(RippleS6.W.els.ripple.ps!.color.n),
    })
    const ripple = new Elem(RippleS6.W.els.ripple.n, { }, { })
    
    return { frame, ripple } as const
  }()
  
}