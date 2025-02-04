import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import Elem = WidgetStyle.Elem
import CssWidget = WidgetStyle.CssWidget
import CssPseudo = WidgetStyle.CssPseudo
import abs = EmotionCommon.abs
import colC = EmotionCommon.colC
import row = EmotionCommon.row




export namespace SelectMeterS {
  
  
  export const W = (() => {
    const indicatorBox = new Elem('rruiMeterFrame', {
      normal: CssPseudo.empty,
    }, { })
    const indicator0 = new Elem('rruiMeter0', { }, { })
    const indicator1 = new Elem('rruiMeter1', { }, { })
    const indicator2 = new Elem('rruiMeter2', { }, { })
    
    
    return CssWidget
      .ofRoot('indicatorBox', indicatorBox)
      .add('indicatorBox', '>', 'indicator0', indicator0)
      .add('indicatorBox', '>', 'indicator1', indicator1)
      .add('indicatorBox', '>', 'indicator2', indicator2)
  })()
  
  
  
  
  export const base = css`
    // normal
    ${W.use.s.normal().e.indicatorBox().thisUse} {
      pointer-events: none;
      width: fit-content;
      height: auto;
      ${row};
      gap: 6px;
    }
    ${W.use.s.normal().e.indicator0().thisUse} {
      width: 8px;
      height: 8px;
      border-radius: 999999px;
      background: #dddddd;
    }
    ${W.use.s.normal().e.indicator1().thisUse} {
      width: 8px;
      height: 8px;
      border-radius: 999999px;
      background: #999999;
    }
    ${W.use.s.normal().e.indicator2().thisUse} {
      width: 8px;
      height: 8px;
      border-radius: 999999px;
      background: #444444;
    }
  `
  
  
  export const normal = (t: AppTheme.Theme) => css`
    ${base};
    
    // normal
    ${W.use.s.normal().e.indicator0().thisUse}{
      background: ${t.boxNormal.ct4b[0]};
    }
    ${W.use.s.normal().e.indicator1().thisUse}{
      background: ${t.boxNormal.ct3e[0]};
    }
    ${W.use.s.normal().e.indicator2().thisUse}{
      background: ${t.boxNormal.ct1b[0]};
    }
  `
  
  
}



