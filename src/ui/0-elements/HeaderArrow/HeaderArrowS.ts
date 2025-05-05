import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import CssWidget = WidgetStyle.CssWidget
import Elem = WidgetStyle.Elem
import CssPseudo = WidgetStyle.CssPseudo
import row = EmotionCommon.row
import Txt = EmotionCommon.Txt



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
      ${ButtonS6.t(ButtonS6.S.text.rect.md.normal)(t)};
      // normal
      ${W.u({ e: 'button', s: 'normal' }).thisUse} {
        min-height: 44px;
        width: 100%;
        ${row};
        gap: 8px;
        justify-content: space-between;
        align-items: center;
      }
      ${W.u({ e: 'header', s: 'normal' }).thisUse} {
        ${Hdrs.page(t)};
        text-align: left;
      }
      ${W.u({ e: 'arrow', s: 'normal' }).thisUse} {
        ${SvgIconS6.W.els.icon.ps!.color.n}: ${t.page.ct};
        flex-shrink: 0;
        height: 26px;
        width: 26px;
      }
    `
  }
  
  export const page = (t: AppTheme.Theme) => Part.base(t)
  
  
  export const normal = (t: AppTheme.Theme) => css`
    ${Part.base(t)};
    ${W.u({ e: 'header', s: 'normal' }).thisUse} {
      height: fit-content;
      ${Txt.s18BoldWideLhNorm};
      color: ${t.page.ct};
      align-self: center;
      text-align: center;
      position: relative;
      line-height: normal;
    }
    ${W.u({ e: 'arrow', s: 'normal' }).thisUse} {
      height: 24px;
      width: 24px;
    }
  `
  
  
  export const secondary = (t: AppTheme.Theme) => css`
    ${Part.base(t)};
    ${W.u({ e: 'button', s: 'normal' }).thisUse} {
      width: fit-content;
      gap: 2px;
    }
    ${W.u({ e: 'header', s: 'normal' }).thisUse} {
      height: fit-content;
      ${Txt.s17};
      // TODO Theme
      color: #858585;
      align-self: center;
      text-align: center;
      position: relative;
    }
    ${W.u({ e: 'arrow', s: 'normal' }).thisUse} {
      // TODO Theme
      ${SvgIconS6.W.els.icon.ps!.color.n}: #858585;
      height: 18px;
      width: 18px;
    }
  `
  
  
}



