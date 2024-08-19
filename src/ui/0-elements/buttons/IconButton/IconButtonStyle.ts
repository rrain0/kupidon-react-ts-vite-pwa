import { css } from '@emotion/react'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { ButtonStyle } from 'src/ui/0-elements/buttons/Button/ButtonStyle.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS.ts'
import Elem = WidgetStyle0.Elem
import CssWidget = WidgetStyle0.CssWidget




// Use for Button with single SvgIcon child
export namespace IconButtonStyle {
  
  
  
  export const El = function(){
    const icon = new Elem(SvgIconS.El.icon.name , { }, {
      size: SvgIconS.El.icon.props.size,
      color: SvgIconS.El.icon.props.color,
      accentColor: SvgIconS.El.icon.props.accentColor,
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
      ${W.e.icon.e.p.color.set(t.buttonNormal.bg[0])};
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