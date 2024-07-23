import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import Elem = WidgetStyle.Elem
import CssWidget = WidgetStyle.CssWidget




// Use for Button with single SvgIcon child
export namespace IconButtonStyle {
  
  
  
  export const El = function(){
    const icon = new Elem(SvgIconsStyle.El.icon.name , { }, {
      size: SvgIconsStyle.El.icon.props.size,
      color: SvgIconsStyle.El.icon.props.color,
      accentColor: SvgIconsStyle.El.icon.props.accentColor,
    })
    
    return {
      button: ButtonStyle.El.button,
      //border: ButtonStyle.El.border,
      //ripple: ButtonStyle.El.ripple,
      icon,
    }
  }()
  
  const W = CssWidget
    .ofRoot('button', El.button)
    //.add('button', '>', 'border', El.border)
    //.add('border', '>', 'ripple', El.ripple)
    .add('button', '>', 'icon', El.icon)
  
  
  
  
  
  
  const iconAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.e.p.size.set('100%')};
      ${W.e.icon.e.p.color.set(t.buttonNormal.bgc[0])};
    }
  `
  
  
  export const iconBigTransparent = (t: AppTheme.Theme) => css`
    ${ButtonStyle.textRoundBigNormal(t)};
    ${iconAddColorNormal(t)};
  `
  
  
  export const iconBig2Transparent = (t: AppTheme.Theme) => css`
    ${ButtonStyle.textRoundBig2Normal(t)};
    ${iconAddColorNormal(t)};
  `
  
  
  
  
}