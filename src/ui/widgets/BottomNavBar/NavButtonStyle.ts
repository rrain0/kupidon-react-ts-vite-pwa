import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import { SvgGradIconsStyle } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIconsStyle.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import Elem = ElementStyle.Elem
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import CssProp = ElementStyle.CssProp




export namespace NavButtonStyle {
  
  
  
  
  export const Attr = {
    ...ButtonStyle.Attr,
  } as const
  
  export const El = function(){
    const btn = ButtonStyle.El.btn
    const icon = btn.toElem('>', new Elem(SvgIconsStyle.El.clazz.icon,{}))
    const gradIcon = btn.toElem('>', new Elem(SvgGradIconsStyle.El.root.name,{}))
    return { ...ButtonStyle.El, gradIcon, icon } as const
  }()
  
  export const Prop = {
    ...ButtonStyle.Prop,
    
    iconSize:    new CssProp(SvgIconsStyle.Prop.prop.size),
    iconColor:   new CssProp(SvgIconsStyle.Prop.prop.color),
    
    gradIconSize:    SvgGradIconsStyle.Prop.size,
    gradIconFirstColor:   SvgGradIconsStyle.Prop.firstColor,
    gradIconSecondColor:   SvgGradIconsStyle.Prop.secondColor,
  } as const
  
  
  
  
  
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
      ${Prop.color.set(t.buttonNav.content[0])}
      
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
    ${El.gradIcon.thiz()} {
      ${Prop.gradIconSize.name}: 100%;
      ${Prop.gradIconFirstColor.name}: ${t.buttonNav.content[0]};
      ${Prop.gradIconSecondColor.name}: ${t.buttonNav.content[0]};
    }
    
    // link active
    // IT IS WORKING !!!: a.active &.btnDotClass > iconDotClass
    a.active ${El.icon.thiz()} {
      ${Prop.iconColor.name}: ${t.buttonNav.contentAccent[0]};
    }
    a.active ${El.gradIcon.thiz()} {
      ${Prop.gradIconFirstColor.name}: ${t.containerAccent.contentGradIcon[0]};
      ${Prop.gradIconSecondColor.name}: ${t.containerAccent.contentGradIcon[1]};
    }
    a.active ${El.btn.thiz()} {
      ${Prop.color.set(t.buttonNav.contentAccent[0])}
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