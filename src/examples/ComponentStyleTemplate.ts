import { css } from '@emotion/react'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import DataAttr = ElementStyle.DataAttr
import Elem = ElementStyle.Elem
import Pseudo = ElementStyle.Pseudo
import CssProp = ElementStyle.CssProp
import CssPropEnum = ElementStyle.CssPropEnum




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
    })
    const secondary = main.toElem('>', new Elem('rrainuiSecondary',{}))
    return { root: main, main, secondary } as const
  }()
  
  export const Prop = {
    prop: new CssProp('--prop'),
    propEnum: new CssPropEnum('--prop-enum', ['black', 'white']),
  } as const
  
  
  
  export const defolt = css`
    ${El.main.thiz()}{
    
    }
  `
  
  
  
}