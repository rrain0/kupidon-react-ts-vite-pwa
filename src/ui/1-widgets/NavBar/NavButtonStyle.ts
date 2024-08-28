import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { SvgGradIconsStyle } from 'src/ui/0-elements/icons/SvgGradIcons/style/SvgGradIconsS.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable




export namespace NavButtonStyle {
  
  
  
  
  export const Attr = {
    ...ButtonS.Attr0,
  } as const
  
  export const El = function(){
    const btn = ButtonS.El0.btn
    const icon = btn.toElem('>', SvgIconS.El.icon)
    const gradIcon = btn.toElem('>', SvgGradIconsStyle.El.root)
    return { ...ButtonS.El0, gradIcon, icon } as const
  }()
  
  
  
  
  
  export const nav = (t:AppTheme.Theme)=>css`
    ${ButtonS.addBase};
    // normal
    ${El.btn.thiz()} {
      height: 100%;
      flex: 1;
      ${col};
      align-items: center;
      gap: 3px;
      padding: 5px 0 2px;

      background: none;
      ${El.btn.props.color.set(t.navButton.content[0])}
      
      ${Txt.small5};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.mode.set('center')}
      ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0]+'88')}
    }
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('100%')}
      ${El.icon.props.color.set(t.navButton.content[0])}
    }
    ${El.gradIcon.thiz()} {
      ${El.gradIcon.props.size.set('100%')}
      ${El.gradIcon.props.firstColor.set(t.navButton.content[0])}
      ${El.gradIcon.props.secondColor.set(t.navButton.content[0])}
    }
    
    // link active
    // IT IS WORKING !!!: a.active &.btnDotClass > iconDotClass
    a.active ${El.icon.thiz()} {
      ${El.icon.props.color.set(t.navButton.contentAccent[0])}
    }
    a.active ${El.gradIcon.thiz()} {
      ${El.gradIcon.props.firstColor.set(t.iconGradient.content[0])}
      ${El.gradIcon.props.secondColor.set(t.iconGradient.content[1])}
    }
    a.active ${El.btn.thiz()} {
      ${El.btn.props.color.set(t.navButton.contentAccent[0])}
    }
    
    // hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.navButton.bgFocus[0]};
    }}

    // focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.navButton.bgFocus[0]};
    }
  `
  
  
  
  
}