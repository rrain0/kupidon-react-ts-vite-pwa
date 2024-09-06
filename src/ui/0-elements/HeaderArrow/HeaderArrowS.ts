import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS'
import { AppTheme } from 'src/util/theme/AppTheme'
import CssWidget = WidgetStyle.CssWidget
import Elem = WidgetStyle.Elem
import CssPseudo = WidgetStyle.CssPseudo
import row = EmotionCommon.row


export namespace HeaderArrowS {
  
  export const W = (() => {
    const button = new Elem('button', {
      normal: CssPseudo.empty,
    }, { })
    const header = new Elem('header', { }, { })
    const arrow = new Elem('arrow', { }, { })
    
    return CssWidget
      .ofRoot('button', button)
      .add('button', '>', 'header', header)
      .add('button', '>', 'arrow', arrow)
  })()
  
  
  export namespace Part {
    export const base = (t: AppTheme.Theme) => css`
      ${ButtonS.textRectNormalNormal(t)};
      // normal
      ${W.u({ e: 'button', s: 'normal' }).thisUse} {
        ${row};
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
      ${W.u({ e: 'arrow', s: 'normal' }).thisUse} {
        ${SvgIconS.El.icon.props.color.name}: ${t.page.content1[0]};
        height: 26px;
      }
    `
  }
  
  
}



