import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import Theme = AppTheme.Theme
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable




export namespace IconButtonStyle {
  
  export const Attr = {
    ...ButtonStyle.Attr,
  } as const
  
  export const El = function(){
    const btn = ButtonStyle.El.btn
    const icon = btn.toElem('>', SvgIconsStyle.El.icon)
    return { ...ButtonStyle.El, icon } as const
  }()
  
  
  
  
  
  export const icon = (t:Theme) => css`
    ${ButtonStyle.common};
    // normal
    ${El.btn.thiz()} {
      height: 50px;
      width: 50px;
      //border-radius: 26%;
      border-radius: 999999px;
      padding: 14px;
      
      background: ${t.buttonMain.bgc[0]};
      color: ${t.buttonMain.content[0]};
      ${El.btn.props.color.set(t.buttonMain.content[0])}
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.mode.set('center')}
      ${El.ripple.props.color.set(t.ripple.content[0])}
    }
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('100%')}
      ${El.icon.props.color.set(t.buttonMain.content[0])}
    }
    
    // hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonMain.bgcFocus[0]};
    }}

    // focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonMain.bgcFocus[0]};
    }
    
    // disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${El.btn.props.color.set(t.elementDisabled.content[0])}
    }
    ${El.icon.thiz('disabled')} {
      ${El.icon.props.color.set(t.elementDisabled.content[0])}
    }
  `
  
  
  
  export const iconTransparent = (t:Theme) => css`
    ${icon(t)};
    // normal
    ${El.btn.thiz()} {
      border-radius: 999999px;
      background: none;
      color: ${t.buttonAccent.bgc[0]};
      ${El.btn.props.color.set(t.buttonAccent.bgc[0])}
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
    }
    ${El.icon.thiz()} {
      ${El.icon.props.color.set(t.buttonAccent.bgc[0])}
    }

    // hover
    ${hoverable} { ${El.btn.thiz('hover')} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    } }

    // focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }
  `
  
  
  export const iconBigTransparent = (t:Theme) => css`
    ${iconTransparent(t)};
    ${El.btn.thiz()} {
      padding: 11px;
    }
  `
  
  
  
  
  
  
  
  
  
  export const nav = (t:Theme)=>css`
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
      color: ${t.navButton.content[0]};
      ${El.btn.props.color.set(t.navButton.content[0])}
      
      ${Txt.small5};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.mode.set('center')}
      ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
    }
    ${El.icon.thiz()} {
      ${El.icon.props.size.set('100%')}
      ${El.icon.props.color.set(t.navButton.content[0])}
    }
    
    // link active
    // IT IS WORKING !!!: a.active &.btnDotClass > iconDotClass
    a.active ${El.icon.thiz()} {
      ${El.icon.props.color.set(t.navButton.contentAccent[0])}
    }
    a.active ${El.btn.thiz()} {
      ${El.btn.props.color.set(t.navButton.contentAccent[0])}
    }
    
    // hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.navButton.bgcFocus[0]};
    }}

    // focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.navButton.bgcFocus[0]};
    }
  `
  
  
  
  
}