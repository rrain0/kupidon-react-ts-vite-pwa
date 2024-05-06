import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import Theme = AppTheme.Theme
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import Elem = ElementStyle.Elem
import CssProp = ElementStyle.CssProp




export namespace IconButtonStyle {
  
  export const Attr = {
    ...ButtonStyle.Attr,
  } as const
  
  export const El = function(){
    const btn = ButtonStyle.El.btn
    const icon = btn.toElem('>', new Elem(SvgIconsStyle.El.clazz.icon,{}))
    return { ...ButtonStyle.El, icon } as const
  }()
  
  export const Prop = {
    ...ButtonStyle.Prop,
    iconSize:    new CssProp(SvgIconsStyle.Prop.prop.size),
    iconColor:   new CssProp(SvgIconsStyle.Prop.prop.color),
  } as const
  
  
  
  
  
  
  
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
      ${Prop.color.name}: ${t.buttonMain.content[0]};
    }
    ${El.ripple.thiz()} {
      ${Prop.rippleMode.name}: center;
      ${Prop.rippleColor.name}: ${t.ripple.content[0]};
    }
    ${El.icon.thiz()} {
      ${Prop.iconSize.name}: 100%;
      ${Prop.iconColor.name}: ${t.buttonMain.content[0]};
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
      color: ${t.elementDisabled.content[0]};
      ${Prop.color.name}: ${t.elementDisabled.content[0]};
    }
    ${El.icon.thiz('disabled')} {
      ${Prop.iconColor.name}: ${t.elementDisabled.content[0]};
    }
  `
  
  
  
  export const iconTransparent = (t:Theme) => css`
    ${icon(t)};
    // normal
    ${El.btn.thiz()} {
      border-radius: 999999px;
      background: none;
      color: ${t.buttonAccent.bgc[0]};
      ${Prop.color.name}: ${t.buttonAccent.bgc[0]};
    }
    ${El.ripple.thiz()} {
      ${Prop.rippleColor.name}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.icon.thiz()} {
      ${Prop.iconColor.name}: ${t.buttonAccent.bgc[0]};
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
      color: ${t.buttonNav.content[0]};
      ${Prop.color.name}: ${t.buttonNav.content[0]};
      
      ${Txt.small5};
    }
    ${El.ripple.thiz()} {
      ${Prop.rippleMode.name}: center;
      ${Prop.rippleColor.name}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.icon.thiz()} {
      ${Prop.iconSize.name}: 100%;
      ${Prop.iconColor.name}: ${t.buttonNav.content[0]};
    }
    
    // link active
    // IT IS WORKING !!!: a.active &.btnDotClass > iconDotClass
    a.active ${El.icon.thiz()} {
      ${Prop.iconColor.name}: ${t.buttonNav.contentAccent[0]};
    }
    a.active ${El.btn.thiz()} {
      color: ${t.buttonNav.contentAccent[0]};
      ${Prop.color.name}: ${t.buttonNav.contentAccent[0]};
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