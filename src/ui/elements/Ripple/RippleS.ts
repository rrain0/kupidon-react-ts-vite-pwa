import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { AppTheme } from 'src/util/theme/AppTheme'
import Elem = WidgetStyle.Elem
import CssProp = WidgetStyle.CssProp
import CssWidget = WidgetStyle.CssWidget
import CssPseudo = WidgetStyle.CssPseudo
import abs = EmotionCommon.abs
import CssPropEnum = WidgetStyle.CssPropEnum




export namespace RippleS {
  
  export const rippleModes = ['center', 'pointer'] as const
  export type RippleMode = typeof rippleModes[number]
  
  
  export const W = (() => {
    const frame = new Elem('rrainuiRippleFrame', {
      normal: CssPseudo.empty,
    }, { })
    const ripple = new Elem('rrainuiRippleRipple', { }, {
      color: CssProp.color,
      mode: new CssPropEnum('--mode', rippleModes),
    })
    
    const rippleWidget = CssWidget
      .ofRoot('frame', frame)
      .add('frame', '>', 'ripple', ripple)
    
    return rippleWidget
  })()
  
  
  
  const base = css`
    // normal
    ${W.use.s.normal().e.frame().thisUse} {
      pointer-events: none;
      ${abs};
      overflow: hidden;
    }
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      position: absolute;
      translate: -50% -50%;
      border-radius: 999999px;
      /*background-image: radial-gradient(
        closest-side circle at center,
        transparent, var(--bg-color) 90%, transparent
      );*/
      ${W.e.ripple.p.color.set('#ffffffb3')}
      ${W.e.ripple.p.mode.set('pointer')}
      background-color: ${W.e.ripple.p.color.get()};
    }
  `
  
  
  export const normal = (t: AppTheme.Theme) => css`
    ${base};
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.p.color.set(t.ripple.content[0]+'b3')}
    }
  `
  
  
  
}



