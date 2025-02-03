import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { Hs } from 'src/ui/0-elements/basic-elements/Hs'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
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
      ${ButtonS6.t(ButtonS6.S.Text.Rect.Normal.normal)(t)};
      // normal
      ${W.u({ e: 'button', s: 'normal' }).thisUse} {
        ${row};
        height: 44px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
      ${W.u({ e: 'header', s: 'normal' }).thisUse} {
        ${Hs.page(t)};
      }
      ${W.u({ e: 'arrow', s: 'normal' }).thisUse} {
        ${SvgIconS6.W.els.icon.ps!.color.n}: ${t.page.ct1};
        height: 26px;
      }
    `
  }
  
  export const page = (t: AppTheme.Theme) => Part.base(t)
  
  
  export const normal = (t: AppTheme.Theme) => css`
    ${Part.base(t)};
    ${W.u({ e: 'header', s: 'normal' }).thisUse} {
      font-weight: 500;
      font-size: 18px;
      line-height: normal;
      letter-spacing: 0.05em;
      min-height: 1.5em;
      color: ${t.page.ct1};
      align-self: center;
      text-align: center;
      position: relative;
      top: 0.13em;
    }
    ${W.u({ e: 'arrow', s: 'normal' }).thisUse} {
      height: 1.5em;
    }
  `
  
  
}



