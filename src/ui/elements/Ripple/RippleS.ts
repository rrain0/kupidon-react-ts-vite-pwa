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
  
  
  
  
  const opacity = '66'
  
  export namespace P {
    
    export const baseNormalFrame = css`
      pointer-events: none;
      ${abs};
      overflow: hidden;
    `
    export const baseNormalRipple = css`
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
    `
    
    
    export const filledNormalRipple = (t: AppTheme.Theme) => css`
      ${W.e.ripple.p.color.set(t.ripple.content[0] + opacity)}
    `
    
    
    export const textNormalRipple = (t: AppTheme.Theme) => css`
      ${W.e.ripple.p.color.set(t.ripple.contentOnTransparent[0] + opacity)}
    `
    
    
    export const iconNormalRipple = (t: AppTheme.Theme) => css`
      ${W.e.ripple.p.mode.set('center')}
      ${W.e.ripple.p.color.set(t.ripple.contentOnTransparent[0] + opacity)}
    `
    
    
    export const testNormalRipple = (t: AppTheme.Theme) => css`
      ${W.e.ripple.p.color.set('#ff0000' + opacity)}
    `
  }
  
  
  
  
  const base = css`
    // normal
    ${W.use.s.normal().e.frame().thisUse} {
      ${P.baseNormalFrame};
    }
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${P.baseNormalRipple};
    }
  `
  
  
  
  export const filled = (t: AppTheme.Theme) => css`
    ${base};
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${P.filledNormalRipple(t)}
    }
  `
  
  
  export const text = (t: AppTheme.Theme) => css`
    ${base};
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${P.textNormalRipple(t)}
    }
  `
  
  
  export const icon = (t: AppTheme.Theme) => css`
    ${base};
    // normal
    ${W.use.s.normal().e.ripple().thisUse} {
      ${P.iconNormalRipple(t)};
    }
  `
  
  
  
}



