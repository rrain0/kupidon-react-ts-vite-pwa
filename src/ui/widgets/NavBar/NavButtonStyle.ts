import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { SvgGradIconsStyle } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIconsStyle.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable




export namespace NavButtonStyle {
  
  
  
  
  export const Attr = {
    ...ButtonStyle.Attr,
  } as const
  
  export const El = function(){
    const btn = ButtonStyle.El.btn
    const icon = btn.toElem('>', SvgIconsStyle.El.icon)
    const gradIcon = btn.toElem('>', SvgGradIconsStyle.El.root)
    return { ...ButtonStyle.El, gradIcon, icon } as const
  }()
  
  
  
  
  
  export const nav = (t:AppTheme.Theme)=>css`
    ${ButtonStyle.common};
    // normal
    ${El.btn.thiz()} {
      height: 100%;
      flex: 1;
      ${col};
      align-items: center;
      gap: 3px;
      padding: 5px 0 2px;

      background: none;
      ${El.btn.props.color.set(t.buttonNav.content[0])}
      
      ${Txt.small5};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.mode.set('center')}
      ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
    }
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('100%')}
      ${El.icon.props.color.set(t.buttonNav.content[0])}
    }
    ${El.gradIcon.thiz()} {
      ${El.gradIcon.props.size.set('100%')}
      ${El.gradIcon.props.firstColor.set(t.buttonNav.content[0])}
      ${El.gradIcon.props.secondColor.set(t.buttonNav.content[0])}
    }
    
    // link active
    // IT IS WORKING !!!: a.active &.btnDotClass > iconDotClass
    a.active ${El.icon.thiz()} {
      ${El.icon.props.color.set(t.buttonNav.contentAccent[0])}
    }
    a.active ${El.gradIcon.thiz()} {
      ${El.gradIcon.props.firstColor.set(t.containerNormal.contentGradIcon[0])}
      ${El.gradIcon.props.secondColor.set(t.containerNormal.contentGradIcon[1])}
    }
    a.active ${El.btn.thiz()} {
      ${El.btn.props.color.set(t.buttonNav.contentAccent[0])}
    }
    
    // hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonNav.bgcFocus[0]};
    }}

    // focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonNav.bgcFocus[0]};
    }
  `
  
  
  
  
}