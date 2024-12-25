import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import Elem = WidgetStyle.Elem
import CssPseudo = WidgetStyle.CssPseudo
import CssWidget = WidgetStyle.CssWidget
import row = EmotionCommon.row




export namespace LineProgressS {
  
  // Widget elements
  export namespace El {
    export const frame = new Elem('lineProgressFrame', {
      normal: CssPseudo.empty,
    }, { })
    export const line = new Elem('line', { }, { })
  }
  
  // Widget
  export const W = CssWidget
    .ofRoot('frame', El.frame)
    .add('frame', '>', 'line', El.line)
  
  // Style variants parts
  export namespace P {
    export const base = css`
      // normal
      ${W.u({ e: 'frame', s: 'normal' }).thisUse} {
        width: 100%;
        height: 8px;
        border-radius: 999999px;
        ${row};
      }
      ${W.u({ e: 'line', s: 'normal' }).thisUse} {
        width: 0;
        height: 100%;
        border-radius: inherit;
        transition: width 1000ms ease-in-out;
      }
    `
  }
  
  // Ready to use styles
  export namespace S {
    export const normal = (t: AppTheme.Theme) => css`
      ${P.base};
      // normal
      ${W.u({ e: 'frame', s: 'normal' }).thisUse} {
        background-color: ${t.boxNormal.c5}
      }
      ${W.u({ e: 'line', s: 'normal' }).thisUse} {
        background-color: ${t.boxAccent.bg3}
      }
    `
  }
  
}


