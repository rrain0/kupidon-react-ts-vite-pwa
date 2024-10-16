import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS'
import { RippleS } from 'src/ui/0-elements/Ripple/RippleS'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import {
  SelectItemIndicatorS
} from 'src/ui/0-elements/select-item/SelectItemIndicator/SelectItemIndicatorS'
import Elem = WidgetStyle.Elem
import CssWidget = WidgetStyle.CssWidget
import CssPseudo = WidgetStyle.CssPseudo
import CssAttr = WidgetStyle.CssAttr
import abs = EmotionCommon.abs
import center = EmotionCommon.center




export namespace SelectItemS {
  
  
  export const W = (() => {
    
    const frame = new Elem('rrainuiSelectItemFrame', {
      normal: CssPseudo.empty,
      selected: CssAttr.dataSelected,
    }, { })
    
    const border = new Elem('rrainuiBorder', { }, { })
    const ripple = Elem.newEmpty()
    
    const addIconBox = new Elem('rrainuiAddIconBox', { }, { })
    const addIcon = Elem.newEmpty()
    
    const indicator = Elem.newEmpty()
    
    const editBtn = new Elem('rrainuiEditIconBox', { }, { })
    const editBtnRipple = new Elem('', { }, { })
    const editIcon = new Elem('', { }, { })
    
    const content = new Elem('rrainuiContent', { }, { })
    
    return CssWidget
      .ofRoot('frame', frame)
      
      .add('frame', '>', 'border', border)
      .add('border', '>', 'ripple', ripple)
      
      .add('frame', '>', 'addIconBox', addIconBox)
      .add('addIconBox', '>', 'addIcon', addIcon)
      
      .add('frame', '>', 'indicator', indicator)
      
      .add('frame', '> * >', 'editBtn', editBtn)
      .add('editBtn', '>', 'editBtnRipple', editBtnRipple)
      .add('editBtn', '>', 'editIcon', editIcon)
      
      .add('frame', '>', 'content', content)
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
      
      background-color: #eeeeee;
      
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
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.base}
    }
    
    ${W.use.s.normal().e.addIconBox().thisUse} {
      place-self: center;
      width: 44px;
      height: 44px;
      border-radius: 10px;
      ${center};
      padding: 2px;
    }
    ${W.use.s.normal().e.addIcon().thisUse} {
      ${SvgIconS.base}
    }
    
    ${W.use.s.normal().e.indicator().thisUse} {
      ${SelectItemIndicatorS.base}
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
      ${SvgIconS.base}
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
      background-color: ${t.containerNormal.bg2[0]};
    }
    ${W.use.s.normal().e.ripple().thisUse}{
      ${RippleS.onFilledNormal(t)}
    }
    ${W.use.s.normal().e.addIcon().thisUse}{
      ${SvgIconS.normal(t)}
    }
    
    ${W.use.s.normal().e.indicator().thisUse} {
      ${SelectItemIndicatorS.normal(t)}
    }
    
    ${W.use.s.normal().e.editBtnRipple().thisUse} {
      ${RippleS.base}
    }
    ${W.use.s.normal().e.editIcon().thisUse} {
      ${SvgIconS.normal(t)}
    }
    
    // selected
    ${W.use.s.selected().e.border().thisUse} {
      border-color: ${t.containerNormal.content1b[0]};
    }
  `
  
  
}



