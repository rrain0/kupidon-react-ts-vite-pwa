import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { RippleS } from 'src/ui/elements/Ripple/RippleS'
import { AppTheme } from 'src/util/theme/AppTheme'
import Elem = WidgetStyle.Elem
import CssWidget = WidgetStyle.CssWidget
import CssPseudo = WidgetStyle.CssPseudo
import CssAttr = WidgetStyle.CssAttr




export namespace SelectItemS {
  
  
  import abs = EmotionCommon.abs
  export const W = (() => {
    const frame = new Elem('rrainuiSelectItemFrame', {
      normal: CssPseudo.empty,
      selected: CssAttr.dataSelected,
    }, { })
    
    const border = new Elem('rrainuiBorder', { }, { })
    const rippleFrame = new Elem(RippleS.W.e.frame.e.name, { }, { })
    const rippleRipple = new Elem(RippleS.W.e.ripple.e.name, { }, { })
    
    const selectItemWidget = CssWidget
      .ofRoot('frame', frame)
      .add('frame', '>', 'border', border)
      .add('border', '>', 'rippleFrame', rippleFrame)
      .add('rippleFrame', '>', 'rippleRipple', rippleRipple)
    
    return selectItemWidget
  })()
  
  
  
  const base = css`
    // normal
    ${W.use.s.normal().e.frame().thisUse} {
      cursor: pointer;
      width: 300px;
      min-height: 80px;
      height: fit-content;
      --br: 20px;
      border-radius: var(--br);
      
      background: #eeeeee;
      
      position: relative;
      display: grid;
      grid-auto-flow: column;
      place-items: stretch center;
      gap: 10px;
      overflow: hidden;
    }
    ${W.use.s.normal().e.border().thisUse} {
      pointer-events: none;
      ${abs};
      border-radius: inherit;
      border: none;
    }
    ${W.use.s.normal().e.rippleFrame().thisUse} {
      ${RippleS.P.baseNormalFrame};
    }
    ${W.use.s.normal().e.rippleRipple().thisUse} {
      ${RippleS.P.baseNormalRipple};
    }
    
    // selected
    ${W.use.s.selected().e.border().thisUse} {
      border-width: 2px;
      border-style: solid;
      border-color: #444444;
    }
  `
  
  
  export const normal = (t: AppTheme.Theme) => css`
    ${base};
    
    // normal
    ${W.use.s.normal().e.frame().thisUse} {
      width: 100%;
    }
    
    ${W.use.s.normal().e.rippleFrame().thisUse} {
    
    }
    ${W.use.s.normal().e.rippleRipple().thisUse} {
      ${RippleS.P.testNormalRipple(t)};
    }
  `
  
  
}



