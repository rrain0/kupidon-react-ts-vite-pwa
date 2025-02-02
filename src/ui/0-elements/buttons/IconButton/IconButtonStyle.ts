import { css } from '@emotion/react'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'




// TODO Style - remove
export namespace IconButtonStyle {
  
  
  
  // TODO Style - move to preview
  export const icPreviewNormal = (t: AppTheme.Theme) => css`
    ${ButtonS6.t([
      IconButtonS6.S.Filled.Round.sizeBig2,
      ButtonS6.S.Filled.baseColor,
      {
        buttonBgColor: t.previewButtonNorm.bg,
        buttonColor: t.previewButtonNorm.ct,
        rippleRippleColor: t.previewButtonNorm.ctRipple,
        inFocus: {
          buttonBgColor: t.previewButtonNorm.bgFc,
          buttonColor: t.previewButtonNorm.ctFc,
        },
      },
    ])(t)}
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
    ${IconButtonS6.t({
      gradIconColor0: t.previewButtonNorm.ctGrad[0],
      gradIconColor1: t.previewButtonNorm.ctGrad[2],
    })(t)}
  `
  export const icPreviewNormalBigger = (t: AppTheme.Theme) => css`
    ${icPreviewNormal(t)};
    ${ButtonS6.W.t(t, {
      button: { sz: 58 },
    })}
  `
  export const icPreviewMain = (t: AppTheme.Theme) => css`
    ${ButtonS6.t([
      IconButtonS6.S.Filled.Round.sizeBig2,
      ButtonS6.S.Filled.baseColor,
      {
        buttonBg: {
          color: t.previewButtonMain.bg,
          im: `linear-gradient(
              to bottom,
              ${t.previewButtonMain.bgGrad[0]} 25%,
              ${t.previewButtonMain.bgGrad[1]} 50% 100%
            )`,
          pos: '0 0',
          sz: '100% 200%',
        },
        buttonColor: t.previewButtonMain.ct,
        rippleRippleColor: t.previewButtonMain.ctRipple,
        inFocus: {
          buttonTransition: 'background-position 0.3s',
          buttonBgPos: '0 100%',
        },
      },
    ])(t)}
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
    ${IconButtonS6.t({
      iconColor: t.previewButtonMain.ct,
    })(t)}
  `
  
  
}
