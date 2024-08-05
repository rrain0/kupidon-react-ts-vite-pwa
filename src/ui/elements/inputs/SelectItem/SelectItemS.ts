import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle'
import { RippleS } from 'src/ui/elements/Ripple/RippleS'
import { AppTheme } from 'src/util/theme/AppTheme'
import Elem = WidgetStyle.Elem
import CssWidget = WidgetStyle.CssWidget
import CssPseudo = WidgetStyle.CssPseudo
import CssAttr = WidgetStyle.CssAttr
import abs = EmotionCommon.abs
import center = EmotionCommon.center
import colC = EmotionCommon.colC
import row = EmotionCommon.row




export namespace SelectItemS {
  
  
  export const W = (() => {
    
    const frame = new Elem('rrainuiSelectItemFrame', {
      normal: CssPseudo.empty,
      selected: CssAttr.dataSelected,
    }, { })
    
    const border = new Elem('rrainuiBorder', { }, { })
    const ripple = new Elem('', { }, { })
    
    const addIconBox = new Elem('rrainuiAddIconBox', { }, { })
    const addIcon = new Elem('', { }, { })
    
    const indicatorFrame = new Elem('rrainuiIndicatorFrame', { }, { })
    const indicatorBox = new Elem('rrainuiIndicatorBox', { }, { })
    const indicator0 = new Elem('rrainuiIndicator0', { }, { })
    const indicator1 = new Elem('rrainuiIndicator1', { }, { })
    const indicator2 = new Elem('rrainuiIndicator2', { }, { })
    
    const editBtn = new Elem('rrainuiEditIconBox', { }, { })
    const editBtnRipple = new Elem('', { }, { })
    const editIcon = new Elem('', { }, { })
    
    const content = new Elem('rrainuiContent', { }, { })
    
    const selectItemWidget = CssWidget
      .ofRoot('frame', frame)
      
      .add('frame', '>', 'border', border)
      .add('border', '>', 'ripple', ripple)
      
      .add('frame', '>', 'addIconBox', addIconBox)
      .add('addIconBox', '>', 'addIcon', addIcon)
      
      .add('frame', '>', 'indicatorFrame', indicatorFrame)
      .add('indicatorFrame', '>', 'indicatorBox', indicatorBox)
      .add('indicatorBox', '>', 'indicator0', indicator0)
      .add('indicatorBox', '>', 'indicator1', indicator1)
      .add('indicatorBox', '>', 'indicator2', indicator2)
      
      .add('frame', '> * >', 'editBtn', editBtn)
      .add('editBtn', '>', 'editBtnRipple', editBtnRipple)
      .add('editBtn', '>', 'editIcon', editIcon)
      
      .add('frame', '>', 'content', content)
    
    return selectItemWidget
  })()
  
  
  
  
  export const base = css`
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
    ${W.use.s.normal().e.ripple().thisUse}{
      ${RippleS.base}
    }
    
    ${W.use.s.normal().e.addIconBox().thisUse} {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      
      place-self: center;
      //background: #ff000011;
      ${center};
      padding: 2px;
    }
    ${W.use.s.normal().e.addIcon().thisUse}{
      /* SvgIconsStyle */
    }
    
    ${W.use.s.normal().e.indicatorFrame().thisUse}{
      pointer-events: none;
      ${abs};
      ${colC};
      padding: 6px;
    }
    ${W.use.s.normal().e.indicatorBox().thisUse}{
      width: 75%;
      align-self: center;
      height: 6px;
      ${row};
      gap: 6px;
    }
    ${W.use.s.normal().e.indicator0().thisUse}{
      flex: 1;
      height: 100%;
      border-radius: 999999px;
      background: #dddddd;
    }
    ${W.use.s.normal().e.indicator1().thisUse}{
      flex: 1;
      height: 100%;
      border-radius: 999999px;
      background: #999999;
    }
    ${W.use.s.normal().e.indicator2().thisUse}{
      flex: 1;
      height: 100%;
      border-radius: 999999px;
      background: #444444;
    }
    
    ${W.use.s.normal().e.editBtn().thisUse}{
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      border-radius: var(--br);
      ${center};
      padding: 11px;
      overflow: hidden;
    }
    ${W.use.s.normal().e.editBtnRipple().thisUse}{
      ${RippleS.base}
    }
    ${W.use.s.normal().e.editIcon().thisUse}{
      ${SvgIconsStyle.El.icon.props.color.set('#444444')}
    }
    ${W.use.s.normal().e.content().thisUse}{
      width: 100%;
      min-height: 100%;
      padding: 20px 26px;
      ${center};
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
    ${W.use.s.normal().e.ripple().thisUse}{
      ${RippleS.filled(t)}
    }
  `
  
  
}



