import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import Elem = WidgetStyle.Elem
import CssPseudo = WidgetStyle.CssPseudo
import CssAttr = WidgetStyle.CssAttr
import CssProp = WidgetStyle.CssProp
import CssWidget = WidgetStyle.CssWidget



// TODO Style - remove after adding raw styles & :where(...) to WidgetStyle6
export namespace ButtonS {
  
  const El = function() {
    const button = new Elem(ButtonS6.W.els.button.n, {
      normal: CssPseudo.empty,
      hover: CssPseudo.hover,
      active: CssPseudo.active,
      focus: CssPseudo.focus,
      focusVisible: CssPseudo.focusVisible,
      readOnly: CssPseudo.readOnly,
      disabled: CssPseudo.disabled,
      error: CssAttr.dataError,
    }, {
      color: CssProp.color,
    })
    const border = new Elem(ButtonS6.W.els.bord.n, { }, { })
    const ripple = Elem.newEmpty()
    
    return { button, border, ripple } as const
  }()
  
  export const W = CssWidget
    .ofRoot('button', El.button)
    .add('button', '>', 'border', El.border)
    .add('border', '>', 'ripple', El.ripple)
  
  
}
