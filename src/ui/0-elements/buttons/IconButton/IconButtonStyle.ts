import { css } from '@emotion/react'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgGradIconsStyle } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import Elem0 = WidgetStyle0.Elem
import CssWidget0 = WidgetStyle0.CssWidget
import Pseudo0 = WidgetStyle0.CssPseudo
import CssAttr0 = WidgetStyle0.CssAttr
import CssPropColor = WidgetStyle0.CssPropColor




// Use for Button with single SvgIcon child
export namespace IconButtonStyle {
  
  
  
  export const ButtonEl = function() {
    const button = new Elem0(ButtonS6.W.els.button.n, {
      normal: Pseudo0.empty,
      hover: Pseudo0.hover,
      active: Pseudo0.active,
      focus: Pseudo0.focus,
      focusVisible: Pseudo0.focusVisible,
      disabled: Pseudo0.disabled,
      error: CssAttr0.dataError,
    }, {
      color: CssPropColor,
    })
    return { button }
  }()
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
      button: ButtonEl.button,
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
    ${ButtonS6.t(ButtonS6.S.Text.Round.Big.normal2)(t)};
    ${icTransparentAddColorNormal(t)};
  `
  
  
  export const iconBig2Transparent = (t: AppTheme.Theme) => css`
    ${ButtonS6.t(ButtonS6.S.Text.Round.Big2.normal2)(t)};
    ${icTransparentAddColorNormal(t)};
  `
  
  
  export const icBig2Normal = (t: AppTheme.Theme) => css`
    ${ButtonS6.t(ButtonS6.S.Filled.Round.Big2.normal)(t)};
    ${icFilledAddColorNormal(t)};
  `
  export const icBig2Normal2 = (t: AppTheme.Theme) => css`
    ${ButtonS6.t(ButtonS6.S.Filled.Round.Big2.normal2)(t)};
    ${icFilledAddColorNormal2(t)};
  `
  export const icBig2Accent = (t: AppTheme.Theme) => css`
    ${ButtonS6.t(ButtonS6.S.Filled.Round.Big2.accent)(t)};
    ${icFilledAddColorAccent(t)};
  `
  
  
  export const imSmallPlaceholderIcFullTransparent = (t: AppTheme.Theme) => css`
    ${ButtonS6.t(ButtonS6.S.Text.Round.Big2.normal2)(t)};
    ${ButtonS6.W.t(t, {
      button: { sz: 'full' },
    })}
    ${W.use.s.normal().e.icon().thisUse} {
      ${W.e.icon.e.p.size.set('50%')};
      ${W.e.icon.e.p.color.set(t.photos.ct[0])};
    }
  `
  
  
  
  export const icPreviewNormal = (t: AppTheme.Theme) => css`
    ${ButtonS6.t([ButtonS6.S.Filled.Round.Big2.normal, ButtonS6.S.Filled.Color.previewNormal])(t)}
    ${icGradFilledAddColorPreviewNorm(t)};
    ${ButtonS6.t({
      button: {
        p: 0,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
      },
      disabled: {
        buttonTransition: 'opacity 0.2s',
        buttonOpacity: 0.3,
      },
      
      // TODO Style - remove and apply :where to resetButton
      buttonHover: {
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
      },
      buttonActive: {
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
      },
      buttonFocus: {
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
      },
      buttonFocusVisible: {
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
      },
    })(t)}
  `
  export const icPreviewNormalBigger = (t: AppTheme.Theme) => css`
    ${icPreviewNormal(t)};
    ${ButtonS6.W.t(t, {
      button: { sz: 58 },
    })}
  `
  export const icPreviewMain = (t: AppTheme.Theme) => css`
  ${ButtonS6.t([ButtonS6.S.Filled.Round.Big2.normal, ButtonS6.S.Filled.Color.previewMain])(t)}
  ${icFilledAddColorPreviewMain(t)};
  ${ButtonS6.t({
    button: {
      sz: 60, p: 0,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    disabled: {
      buttonTransition: 'opacity 0.2s',
      buttonOpacity: 0.3,
    },
    
    // TODO Style - remove and apply :where to resetButton
    buttonHover: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonActive: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonFocus: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonFocusVisible: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
  })(t)}
`
  
  
}
