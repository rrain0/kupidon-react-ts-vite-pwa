import { css } from '@emotion/react'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgGradIconsStyle } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import Elem0 = WidgetStyle0.Elem
import CssWidget0 = WidgetStyle0.CssWidget




// Use for Button with single SvgIcon child
export namespace IconButtonStyle {
  
  
  
  import hoverable = EmotionCommon.hoverable
  export const El = function() {
    const icon = new Elem0(SvgIconS.El.icon.name, { }, {
      size: SvgIconS.El.icon.props.size,
      color: SvgIconS.El.icon.props.color,
      accentColor: SvgIconS.El.icon.props.accentColor,
    })
    const iconGrad = new Elem0(SvgGradIconsStyle.El.icon.name, { }, {
      size: SvgGradIconsStyle.El.icon.props.size,
      firstColor: SvgGradIconsStyle.El.icon.props.firstColor,
      secondColor: SvgGradIconsStyle.El.icon.props.secondColor,
    })
    
    return {
      button: ButtonS.El0.button,
      //border: ButtonS.El.border,
      //ripple: ButtonS.El.ripple,
      icon,
      iconGrad,
    }
  }()
  
  export const W = CssWidget0
    .ofRoot('button', El.button)
    //.add('button', '>', 'border', El.border)
    //.add('border', '>', 'ripple', El.ripple)
    .add('button', '>', 'icon', El.icon)
    .add('button', '>', 'iconGrad', El.iconGrad)
  
  
  
  
  
  
  const icTransparentAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.e.p.size.set('100%')};
      ${W.e.icon.e.p.color.set(t.buttonNormal.bg[0])};
    }
  `
  const icFilledAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.e.p.size.set('100%')};
      ${W.e.icon.e.p.color.set(t.buttonNormal.ct[0])};
    }
  `
  const icFilledAddColorNormal2 = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.e.p.size.set('100%')};
      ${W.e.icon.e.p.color.set(t.buttonNormal.ct[0])};
    }
  `
  const icFilledAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.e.p.size.set('100%')};
      ${W.e.icon.e.p.color.set(t.buttonAccent.ct[0])};
    }
  `
  const icGradFilledAddColorPreviewNorm = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.iconGrad().thisUse} {
      ${W.e.iconGrad.e.p.firstColor.set(t.previewButtonNorm.ctGrad[0])};
      ${W.e.iconGrad.e.p.secondColor.set(t.previewButtonNorm.ctGrad[2])};
    }
  `
  const icFilledAddColorPreviewMain = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.e.p.color.set(t.previewButtonMain.ct)};
    }
  `
  
  
  export const iconBigTransparent = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.Text.Round.Big.normal2(t)};
    ${icTransparentAddColorNormal(t)};
  `
  
  
  export const iconBig2Transparent = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.Text.Round.Big2.normal2(t)};
    ${icTransparentAddColorNormal(t)};
  `
  
  
  export const icBig2Normal = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.Filled.Round.Big2.normal(t)};
    ${icFilledAddColorNormal(t)};
  `
  export const icBig2Normal2 = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.Filled.Round.Big2.normal2(t)};
    ${icFilledAddColorNormal2(t)};
  `
  export const icBig2Accent = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.Filled.Round.Big2.accent(t)};
    ${icFilledAddColorAccent(t)};
  `
  
  
  export const imSmallPlaceholderIcFullTransparent = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.Text.Round.Big2.normal2(t)};
    ${ButtonS.W.use.s.normal().e.button().thisUse} {
      height: 100%;
      width: 100%;
    }
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.e.p.size.set('50%')};
      ${W.e.icon.e.p.color.set(t.photos.ct[0])};
    }
  `
  
  
  
  export const icPreviewNormal = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.Filled.Round.Big2.normal(t)};
    ${ButtonS.filledRoundedAddColorPreviewNormal(t)};
    ${icGradFilledAddColorPreviewNorm(t)};
    ${ButtonS.W.use.s.normal().e.button().thisUse} {
      padding: 0;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15);
    }
    // state: hover
    ${hoverable} { ${ButtonS.W.use.s.hover().e.button().thisUse} {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15);
    }}
    // state: focus-visible
    ${ButtonS.W.use.s.focusVisible().e.button().thisUse} {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15);
    }
  `
  export const icPreviewNormalBigger = (t: AppTheme.Theme) => css`
    ${icPreviewNormal(t)};
    ${ButtonS.W.use.s.normal().e.button().thisUse} {
      width: 58px;
      height: 58px;
    }
  `
  export const icPreviewMain = (t: AppTheme.Theme) => css`
    ${ButtonS6.S.Filled.Round.Big2.normal(t)};
    ${ButtonS.filledRoundedAddColorPreviewMain(t)};
    ${ButtonS.W.use.s.normal().e.button().thisUse} {
      padding: 0;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15);
      width: 60px;
      height: 60px;
    }
    // state: hover
    ${hoverable} { ${ButtonS.W.use.s.hover().e.button().thisUse} {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15);
    }}
    // state: focus-visible
    ${ButtonS.W.use.s.focusVisible().e.button().thisUse} {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15);
    }
    ${icFilledAddColorPreviewMain(t)};
  `
  
  
}
