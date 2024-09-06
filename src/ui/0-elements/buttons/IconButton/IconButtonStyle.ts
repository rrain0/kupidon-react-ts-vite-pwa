import { css } from '@emotion/react'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS.ts'
import Elem0 = WidgetStyle0.Elem
import CssWidget0 = WidgetStyle0.CssWidget




// Use for Button with single SvgIcon child
export namespace IconButtonStyle {
  
  
  
  export const El = function() {
    const icon = new Elem0(SvgIconS.El.icon.name, { }, {
      size: SvgIconS.El.icon.props.size,
      color: SvgIconS.El.icon.props.color,
      accentColor: SvgIconS.El.icon.props.accentColor,
    })
    
    return {
      button: ButtonS.El0.button,
      //border: ButtonS.El.border,
      //ripple: ButtonS.El.ripple,
      icon,
    }
  }()
  
  const W = CssWidget0
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
    ${ButtonS.textRoundBigNormal(t)};
    ${iconAddColorNormal(t)};
  `
  
  
  export const iconBig2Transparent = (t: AppTheme.Theme) => css`
    ${ButtonS.textRoundBig2Normal(t)};
    ${iconAddColorNormal(t)};
  `
  
  
  
  
}
