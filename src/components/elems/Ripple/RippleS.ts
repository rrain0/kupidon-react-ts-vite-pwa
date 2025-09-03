import { css } from '@emotion/react'
import { WidgetStyle } from '@libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { RippleS6 } from 'src/components/elems/Ripple/RippleS6.ts'
import Elem = WidgetStyle.Elem
import CssProp = WidgetStyle.CssProp
import CssWidget = WidgetStyle.CssWidget
import CssPseudo = WidgetStyle.CssPseudo
import absTlwh = EmotionCommon.absTlwh
import CssPropEnum = WidgetStyle.CssPropEnum



// TODO Style - Delete after removing ButtonS.ts
export namespace RippleS {
  
  const rippleModes = ['center', 'pointer'] as const
  type RippleMode = typeof rippleModes[number]
  
  
  export const W = (() => {
    const frame = new Elem(RippleS6.W.els.rippleFrame.n, {
      normal: CssPseudo.empty,
    }, { })
    const ripple = new Elem(RippleS6.W.els.ripple.n, { }, {
      color: CssProp.color,
      mode: new CssPropEnum('--mode', rippleModes),
    })
    
    const rippleWidget = CssWidget
      .ofRoot('frame', frame)
      .add('frame', '>', 'ripple', ripple)
    
    return rippleWidget
  })()
  
  
  
  
  
  // todo move opacity to theme
  const opacity = '66'
  
  
  export const base = css`
    // normal
    ${W.use.s.normal().e.frame().thisUse} {
      pointer-events: none;
      ${absTlwh};
      overflow: hidden;
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      position: absolute;
      translate: -50% -50%;
      border-radius: 999999px;
      /*background-image: radial-gradient(
        closest-side circle at center,
        transparent, var(--bg-color) 90%, transparent
      );*/
      ${W.e.ripple.p.color.set('#ffffff' + opacity)}
      ${W.e.ripple.p.mode.set('pointer')}
      background-color: ${W.e.ripple.p.color.get()};
    }
  `
  
  
  export const onFilledAccent = (t: AppTheme.Theme) => css`
    ${base};
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.p.color.set(t.ripple.ct)}
    }
  `
  
  
  export const onFilledNormal = (t: AppTheme.Theme) => css`
    ${base};
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.p.color.set(t.ripple.ctOnTrans + opacity)}
    }
  `
  
  
  export const onText = (t: AppTheme.Theme) => css`
    ${base};
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.p.color.set(t.ripple.ctOnTrans + opacity)}
    }
  `
  
  
  export const icon = (t: AppTheme.Theme) => css`
    ${base};
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.p.mode.set('center')}
      ${W.e.ripple.p.color.set(t.ripple.ctOnTrans + opacity)}
    }
  `
  
  
}



