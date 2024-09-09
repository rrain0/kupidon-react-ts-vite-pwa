import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { AppTheme } from 'src/util/theme/AppTheme'
import Elem = WidgetStyle.Elem
import CssPseudo = WidgetStyle.CssPseudo
import CssAttr = WidgetStyle.CssAttr
import CssProp = WidgetStyle.CssProp
import CssPropEnum = WidgetStyle.CssPropEnum
import CssWidget = WidgetStyle.CssWidget




export namespace WidgetS {
  
  // Widget elements
  export namespace El {
    export const mainElem = new Elem('mainElem', {
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
    export const elem = new Elem('elem', { }, {
      mode: new CssPropEnum('--mode', ['center', 'cursor']),
      elemColor: new CssProp('--elemColor'),
    })
  }
  
  // Widget
  export const W = CssWidget
    .ofRoot('mainElem', El.mainElem)
    .add('mainElem', '>', 'elem', El.elem)
  
  // Style variants parts
  export namespace P {
    export const base = css`
      // define base css that does not depend on theme
    `
    export namespace Outlined { }
    export namespace Filled { }
  }
  
  // Ready to use styles
  export namespace S {
    export const normal = (t: AppTheme.Theme) => css`
      ${P.base};
      // normal
      ${W.u({ e: 'mainElem', s: 'normal' }).thisUse} {
        // override base styles
      }
    `
  }
  
}


