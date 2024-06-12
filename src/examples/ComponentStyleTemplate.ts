import { css } from '@emotion/react'
import { WidgetStyle } from '@util/mini-libs/widget-style/WidgetStyle.ts'
import DataAttr = WidgetStyle.DataAttr
import Elem = WidgetStyle.Elem0
import Pseudo = WidgetStyle.Pseudo0
import CssProp = WidgetStyle.CssProp
import CssPropEnum = WidgetStyle.CssPropEnum




export namespace ComponentStyle {
  
  
  
  
  const Attr = {
    error: DataAttr.error,
    someAttr: new DataAttr('some-attr', []),
  } as const
  
  const El = function(){
    const main =  new Elem('rrainuiMain',{
      hover: Pseudo.hover,
      active: Pseudo.active,
      focus: Pseudo.focus,
      focusVisible: Pseudo.focusVisible,
      disabled: Pseudo.disabled,
      error: Attr.error,
      activeFocusVisible: [Pseudo.active, Pseudo.focusVisible],
    },{
      prop: new CssProp('--prop'),
      propEnum: new CssPropEnum('--prop-enum', ['black', 'white']),
    })
    const secondary = main.toElem('>', new Elem('rrainuiSecondary',{},{}))
    return { root: main, main, secondary } as const
  }()
  
  
  
  export const defolt = css`
    ${El.main.thiz()}{
    
    }
  `
  
  
  
}