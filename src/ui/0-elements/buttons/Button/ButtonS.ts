import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { WidgetStyle0 } from 'src/_old0/mini-libs/widget-style/WidgetStyle0.ts'
import { RippleStyle } from 'src/_old0/ui/0-elements/Ripple0/RippleStyle.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { RippleS } from 'src/ui/0-elements/Ripple/RippleS.ts'
import { TypeU } from 'src/util/common/TypeU'
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import CssWidget0 = WidgetStyle0.CssWidget
import Elem = WidgetStyle.Elem
import CssPseudo0 = WidgetStyle0.CssPseudo
import CssPseudo = WidgetStyle.CssPseudo
import CssAttr = WidgetStyle.CssAttr
import CssAttr0 = WidgetStyle0.CssAttr
import Elem00 = WidgetStyle0.Elem0
import Elem0 = WidgetStyle0.Elem
import Pseudo0 = WidgetStyle0.CssPseudo
import Pseudo00 = WidgetStyle0.Pseudo0
import CssProp0 = WidgetStyle0.CssProp
import CssProp = WidgetStyle.CssProp
import CssPropEnum0 = WidgetStyle0.CssPropEnum
import CssPropEnum = WidgetStyle.CssPropEnum
import CssWidget = WidgetStyle.CssWidget
import CssPropColor = WidgetStyle0.CssPropColor
import DataAttr = WidgetStyle0.DataAttr
import resetButton = EmotionCommon.resetButton
import row = EmotionCommon.row
import abs = EmotionCommon.abs




export namespace ButtonS {
  
  export const Attr0 = {
    error: DataAttr.error,
  } as const
  
  export const El00 = function() {
    const btn = new Elem00('rrainuiButton', {
      hover: Pseudo00.hover,
      active: Pseudo00.active,
      focus: Pseudo00.focus,
      focusVisible: Pseudo00.focusVisible,
      disabled: Pseudo00.disabled,
      error: Attr0.error,
    }, {
      color: CssPropColor,
    })
    const border = btn.toElem('>', new Elem00('rrainuiBorder', {}, {}))
    const ripple = border.toElem('>', new Elem00(RippleStyle.El0.frameClassName, {}, {
      mode: new CssPropEnum0(RippleStyle.Prop.mode, ['center', 'cursor']),
      color: new CssProp0(RippleStyle.Prop.color),
    }))
    return { root: btn, btn, border, ripple } as const
  }()
  
  export const El0 = (() => {
    const button = new Elem0('rrainuiButton', {
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
  })()
  
  
  export const El = function() {
    const button = new Elem(ButtonS6.W.els.button.n, {
      normal: CssPseudo.empty,
      hover: CssPseudo.hover,
      active: CssPseudo.active,
      focus: CssPseudo.focus,
      focusVisible: CssPseudo.focusVisible,
      readOnly: CssPseudo.readOnly,
      disabled: CssPseudo.disabled,
      error: CssAttr.dataError,
    }, {
      color: CssProp.color,
    })
    const border = new Elem(ButtonS6.W.els.border.n, { }, { })
    const ripple = Elem.newEmpty()
    
    return { button, border, ripple } as const
  }()
  
  export const W = CssWidget
    .ofRoot('button', El.button)
    .add('button', '>', 'border', El.border)
    .add('border', '>', 'ripple', El.ripple)
  
  
  
  
  
  
  export const addBase = css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${resetButton};
      // it breaks button paddings
      //container: button / size;
      position: relative;
      ${row};
      place-content: center;
      place-items: center;
      overflow-wrap: anywhere;
      overflow: hidden;
      
      transition: background linear 300ms;
    }
    ${W.use.s.normal().e.border().thisUse} {
      ${abs};
      pointer-events: none;
      border-radius: inherit;
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.base}
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      cursor: not-allowed;
    }
    ${W.use.s.disabled().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        display: none;
      }
    }
  `
  
  
  // type: filled, shape: rect, size: big
  const filledRectBig = css`
    ${addBase};
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      width: 100%;
      min-height: 50px;
      border-radius: 15px;
      padding: 8px 6px;
      ${Txt.large2};
    }
    ${W.use.s.normal().e.border().thisUse} {
      //border: 1px solid;
      border: none;
    }
  `
  // type: filled, shape: rect, add size: normal
  const filledRectAddSizeNormal = css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      width: 100%;
      min-height: 34px;
      border-radius: 10px;
      padding: 8px 14px;
      ${Txt.normal2};
    }
  `
  
  // type: filled, shape: rect, add color
  const filledRectAddColor = (colors: {
    bg: string
    ct: string
    ctRipple?: string | undefined
    bgFocus: string
    bgImFocus?: string | undefined
    ctFocus: string
    bgDisabled?: string | undefined
    ctDisabled?: string | undefined
  }) => css`
    // state: normal
    ${ButtonS.W.u({ e: 'button', s: 'normal' }).thisUse} {
      background-color: ${colors.bg};
      ${W.e.button.e.props.color.set(colors.ct)}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${!!colors.ctRipple && RippleS.W.e.ripple.p.color.set(colors.ctRipple)}
      }
    }
    
    // state: hover
    ${hoverable}{ ${ButtonS.W.u({ e: 'button', s: 'hover' }).thisUse} {
      background-color: ${colors.bgFocus};
      ${!!colors.bgImFocus && `background-image: ${colors.bgImFocus};`}
      ${W.e.button.e.props.color.set(colors.ctFocus)}
    }}
    
    // state: active
    ${W.use.s.active().e.button().thisUse} { }
    
    // state: focus
    ${W.use.s.focus().e.button().thisUse} { }
    
    // state: focus-visible
    ${ButtonS.W.u({ e: 'button', s: 'focusVisible' }).thisUse} {
      background-color: ${colors.bgFocus};
      ${!!colors.bgImFocus && `background-image: ${colors.bgImFocus};`}
      ${W.e.button.e.props.color.set(colors.ctFocus)}
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      ${!!colors.bgDisabled && `background-color: ${colors.bgDisabled};`}
      ${!!colors.ctDisabled && W.e.button.e.props.color.set(colors.ctDisabled)};
    }
    
    // state: error
    ${W.use.s.error().e.border().thisUse} { }
  `
  // type: filled, shape: rect, add color: main
  const filledRectAddColorMain = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.buttonMain.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonMain.ct[0])}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ct)}
      }
    }
    
    // state: hover
    ${hoverable} { ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonMain.bgFocus[0]};
    } }
    
    // state: active
    ${W.use.s.active().e.button().thisUse} { }
    
    // state: focus
    ${W.use.s.focus().e.button().thisUse} { }
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonMain.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])};
    }
    
    // state: error
    ${W.use.s.error().e.border().thisUse} { }
  `
  // type: filled, shape: rect, add color: accent
  const filledRectAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.buttonAccent.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.ct[0])}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ct)}
      }
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.ctFocus[0])}
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.ctFocus[0])}
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  // type: filled, shape: rect, add color: accent 2
  const filledRectAddColorAccent2 = (t: AppTheme.Theme) => filledRectAddColor({
    bg: t.buttonAccent.bg2[0],
    ct: t.buttonAccent.ct2,
    ctRipple: t.ripple.ct,
    bgFocus: t.buttonAccent.bgFocus[0],
    ctFocus: t.buttonAccent.ctFocus[0],
    bgDisabled: t.elementDisabled.bg[0],
    ctDisabled: t.elementDisabled.ct[0],
  })
  // type: filled, shape: rect, add color: normal
  const filledRectAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.buttonNormal.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.ct[0])}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ct)}
      }
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonNormal.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.ctFocus[0])};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonNormal.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  // type: filled, shape: rect, add color: danger
  const filledRectAddColorDanger = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.elementDanger.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDanger.ct[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ct)}
      }
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.elementDanger.bgFocus[0]};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.elementDanger.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])};
    }
  `
  
  
  // type: filled, shape: rect, size: big, color: main
  export const filledRectBigMain = (t: AppTheme.Theme) => css`
    ${filledRectBig};
    ${filledRectAddColorMain(t)};
  `
  // type: filled, shape: rect, size: big, color: accent
  export const filledRectBigAccent = (t: AppTheme.Theme) => css`
    ${filledRectBig};
    ${filledRectAddColorAccent(t)};
  `
  // type: filled, shape: rect, size: big, color: normal
  export const filledRectBigNormal = (t: AppTheme.Theme) => css`
    ${filledRectBig};
    ${filledRectAddColorNormal(t)};
  `
  // type: filled, shape: rect, size: big, color: danger
  export const filledRectBigDanger = (t: AppTheme.Theme) => css`
    ${filledRectBig};
    ${filledRectAddColorDanger(t)};
  `
  // type: filled, shape: rect, size: normal, color: accent2
  export const filledRectNormalAccent2 = (t: AppTheme.Theme) => css`
    ${filledRectBig};
    ${filledRectAddSizeNormal};
    ${filledRectAddColorAccent2(t)};
  `
  
  
  
  
  // type: text, shape: rect, size: big
  export const textRectBig = css`
    ${filledRectBig};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: none;
    }
  `
  // type: text, shape: rect, add color: normal
  export const textRectAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${W.e.button.e.props.color.set(t.page.ct2)};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ctOnTransparent2)}
      }
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonTransparent.bgFocus[0]};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonTransparent.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])};
    }
  `
  // type: text, shape: rect, add size: normal
  const textRectAddSizeNormal = css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      width: auto;
      min-height: 30px;
      border-radius: 10px;
      padding: 4px 6px;
      gap: 4px;
      ${Txt.normal1};
    }
  `
  
  
  // type: text, shape: rect, size: big, color: normal
  export const textRectBigNormal = (t: AppTheme.Theme) => css`
    ${textRectBig};
    ${textRectAddColorNormal(t)};
  `
  // type: text, shape: rect, size: normal, color: normal
  export const textRectNormalNormal = (t: AppTheme.Theme) => css`
    ${textRectBig};
    ${textRectAddSizeNormal};
    ${textRectAddColorNormal(t)};
  `
  
  
  
  
  // type: filled, shape: rounded, size: normal
  const filledRoundedNormal = css`
    ${addBase};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      min-width: 90px;
      width: fit-content;
      min-height: 40px;
      border-radius: 999999px;
      padding: 8px 20px;
      gap: 0.6em;
      ${Txt.small1};
    }
    ${W.use.s.normal().e.border().thisUse} {
      border: none;
    }
  `
  // type: filled, shape: rounded, size: normal2
  const filledRoundedNormal2 = css`
    ${filledRoundedNormal};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      padding-left: 16px;
      padding-right: 16px;
    }
  `
  // type: filled, shape: rounded, size: small
  export const filledRoundedSmall = css`
    ${addBase};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      width: fit-content;
      min-height: 30px;
      border-radius: 1000000px;
      padding: 4px 16px;
      ${Txt.small1};
    }
    ${W.use.s.normal().e.border().thisUse} {
      border: none;
    }
  `
  // type: filled, shape: rounded, add color: normal
  export const filledRoundedAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.buttonNormal.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.ct[0])}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ct)}
      }
    }
    
    // state: hover
    ${hoverable} { ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonNormal.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.ctFocus[0])};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonNormal.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  // type: filled, shape: rounded, add color: normal2
  export const filledRoundedAddColorNormal2 = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.buttonNormal.bg2};
      ${W.e.button.e.props.color.set(t.buttonNormal.ct[0])}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ct)}
      }
    }
    
    // state: hover
    ${hoverable} { ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonNormal.bgFocus2};
      ${W.e.button.e.props.color.set(t.buttonNormal.ctFocus[0])};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonNormal.bgFocus2};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  // type: filled, shape: rounded, add color: accent
  export const filledRoundedAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.buttonAccent.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.ct[0])}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ct)}
      }
    }

    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.ctFocus[0])}
    }}

    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.ctFocus[0])}
    }

    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  // type: filled, shape: rounded, add color: accent2
  export const filledRoundedAddColorAccent2 = (t: AppTheme.Theme) => css`
    ${filledRoundedAddColorAccent(t)};
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.buttonAccent.bg2[0]};
    }
  `
  // type: filled, shape: rounded, add color: danger
  export const filledRoundedAddColorDanger = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.elementDanger.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDanger.ct[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ct)}
      }
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.elementDanger.bgFocus[0]};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.elementDanger.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])};
    }
  `
  // type: filled, shape: rounded, add color: normal
  export const filledRoundedAddColorPreviewNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.previewButtonNorm.bg};
      ${W.e.button.e.props.color.set(t.previewButtonNorm.ct)}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.previewButtonNorm.ctRipple)}
      }
    }
    
    // state: hover
    ${hoverable} { ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.previewButtonNorm.bgFc};
      ${W.e.button.e.props.color.set(t.previewButtonNorm.ctFc)};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.previewButtonNorm.bgFc};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  // type: filled, shape: rounded, add color: normal
  export const filledRoundedAddColorPreviewMain = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background-color: ${t.previewButtonMain.bg};
      background-image: linear-gradient(
        to bottom,
        ${t.previewButtonMain.bgGrad[0]} 25%,
        ${t.previewButtonMain.bgGrad[1]} 50% 100%
      );
      background-position: 0 0;
      background-size: 100% 200%;
      ${W.e.button.e.props.color.set(t.previewButtonMain.ct)}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.previewButtonMain.ctRipple)}
      }
    }
    
    // state: hover
    ${hoverable} { ${W.use.s.hover().e.button().thisUse} {
      transition: background-position 0.3s;
      background-position: 0 100%;
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      transition: background-position 0.3s;
      background-position: 0 100%;
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  
  
  
  
  // type: filled, shape: rounded, size: normal, color: normal
  export const filledRoundedNormalNormal = (t: AppTheme.Theme) => css`
    ${filledRoundedNormal};
    ${filledRoundedAddColorNormal(t)};
  `
  // type: filled, shape: rounded, size: normal, color: accent
  export const filledRoundedNormalAccent = (t: AppTheme.Theme) => css`
    ${filledRoundedNormal};
    ${filledRoundedAddColorAccent(t)};
  `
  // type: filled, shape: rounded, size: normal2, color: accent
  export const filledRoundedNormal2Accent = (t: AppTheme.Theme) => css`
    ${filledRoundedNormal2};
    ${filledRoundedAddColorAccent(t)};
  `
  // type: filled, shape: rounded, size: normal, color: accent2
  export const filledRoundedNormalAccent2 = (t: AppTheme.Theme) => css`
    ${filledRoundedNormal};
    ${filledRoundedAddColorAccent2(t)};
  `
  // type: filled, shape: rounded, size: normal, color: danger
  export const filledRoundedNormalDanger = (t: AppTheme.Theme) => css`
    ${filledRoundedNormal};
    ${filledRoundedAddColorDanger(t)};
  `
  // type: filled, shape: rounded, size: small, color: normal
  export const filledRoundedSmallNormal = (t: AppTheme.Theme) => css`
    ${filledRoundedSmall};
    ${filledRoundedAddColorNormal(t)};
  `
  // type: filled, shape: rounded, size: small, color: accent
  export const filledRoundedSmallAccent = (t: AppTheme.Theme) => css`
    ${filledRoundedSmall};
    ${filledRoundedAddColorAccent(t)};
  `
  
  
  
  // type: filled, shape: round, size: normal
  const filledRoundNormal = css`
    ${addBase};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      height: 50px;
      width: 50px;
      border-radius: 999999px;
      padding: 11px;
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.p.mode.set('center')};
      }
    }
  `
  // type: filled, shape: round, add size: big2
  const filledRoundAddSizeBig2 = css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      padding: 14px;
    }
  `
  
  
  
  // type: filled, shape: round, size: big2, color: normal
  export const filledRoundBig2Normal = (t: AppTheme.Theme) => css`
    ${filledRoundNormal};
    ${filledRoundAddSizeBig2};
    ${filledRoundedAddColorNormal(t)};
  `
  // type: filled, shape: round, size: big2, color: normal2
  export const filledRoundBig2Normal2 = (t: AppTheme.Theme) => css`
    ${filledRoundNormal};
    ${filledRoundAddSizeBig2};
    ${filledRoundedAddColorNormal2(t)};
  `
  // type: filled, shape: round, size: big2, color: accent
  export const filledRoundBig2Accent = (t: AppTheme.Theme) => css`
    ${filledRoundNormal};
    ${filledRoundAddSizeBig2};
    ${filledRoundedAddColorAccent(t)};
  `
  
  
  
  
  // type: outlined, shape: rounded, size: normal
  const outlinedRoundedNormal = css`
    ${addBase};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      min-width: 90px;
      width: fit-content;
      min-height: 40px;
      border-radius: 1000000px;
      background: none;
      padding: 8px 20px;
      gap: 0.6em;
      ${Txt.small1};
    }
    ${W.use.s.normal().e.border().thisUse}{
      border: 1px solid;
    }
    
    // state: hover
    ${W.use.s.hover().e.border().thisUse} {
      border: none;
    }
  `
  // type: outlined, shape: rounded, size: small
  const outlinedRoundedSmall = css`
    ${addBase};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      width: fit-content;
      min-height: 30px;
      border-radius: 1000000px;
      padding: 4px 16px;
      ${Txt.small1};
    }
    ${W.use.s.normal().e.border().thisUse}{
      border: 1px solid;
    }
    
    // state: hover
    ${W.use.s.hover().e.border().thisUse} {
      border: none;
    }
  `
  // type: outlined, shape: rounded, add color: normal
  export const outlinedRoundedAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${W.e.button.e.props.color.set(t.buttonNormal.bg[0])}
    }
    ${W.use.s.normal().e.border().thisUse} {
      border-color: ${t.buttonNormal.bg[0]};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ctOnTransparent2)}
      }
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonNormal.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.ctFocus[0])};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonNormal.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.ct[0])}
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  // type: outlined, shape: rounded, add color: accent
  export const outlinedRoundedAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${W.e.button.e.props.color.set(t.buttonAccent.bg[0])}
    }
    ${W.use.s.normal().e.border().thisUse} {
      border-color: ${t.buttonAccent.bg[0]};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ctOnTransparent2)}
      }
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.ctFocus[0])}
    }}
    ${hoverable}{ ${W.use.s.hover().e.border().thisUse} {
      border-color: ${t.buttonAccent.bgFocus[0]};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.ctFocus[0])}
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])}
    }
  `
  
  
  // type: outlined, shape: rounded, size: normal, color: normal
  export const outlinedRoundedNormalNormal = (t: AppTheme.Theme) => css`
    ${outlinedRoundedNormal};
    ${outlinedRoundedAddColorNormal(t)};
  `
  // type: outlined, shape: rounded, size: normal, color: accent
  export const outlinedRoundedNormalAccent = (t: AppTheme.Theme) => css`
    ${outlinedRoundedNormal};
    ${outlinedRoundedAddColorAccent(t)};
  `
  // type: outlined, shape: rounded, size: small, color: normal
  export const outlinedRoundedSmallNormal = (t: AppTheme.Theme) => css`
    ${outlinedRoundedSmall};
    ${outlinedRoundedAddColorNormal(t)};
  `
  
  
  
  
  // type: text, shape: rounded, size: normal
  const textRoundedNormal = css`
    ${filledRoundedNormal};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: none;
      ${Txt.large2b};
    }
  `
  // type: text, shape: rounded, size: small
  const textRoundedSmall = css`
    ${filledRoundedSmall};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: none;
      ${Txt.large1b};
    }
  `
  // type: text, shape: rounded, add color: normal
  const textRoundedAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${W.e.button.e.props.color.set(t.page.ct2)};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        // todo move opacity to theme
        ${RippleS.W.e.ripple.e.props.color.set(t.ripple.ctOnTransparent2)}
      }
    }

    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonTransparent.bgFocus[0]};
    }}

    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonTransparent.bgFocus[0]};
    }

    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background-color: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.ct[0])};
    }
  `
  
  
  // type: text, shape: rounded, size: normal, color: normal
  export const textRoundedNormalNormal = (t: AppTheme.Theme) => css`
    ${textRoundedNormal};
    ${textRoundedAddColorNormal(t)};
  `
  // type: textUppercase, shape: rounded, size: normal, color: normal
  export const textUppercaseRoundedNormalNormal = (t: AppTheme.Theme) => css`
    ${textRoundedNormal};
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      text-transform: uppercase;
    }
    ${textRoundedAddColorNormal(t)};
  `
  
  // type: text, shape: rounded, size: normal2, color: normal
  export const textRoundedNormal2Normal = (t: AppTheme.Theme) => css`
    ${textRoundedNormal};
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      padding-left: 16px;
      padding-right: 16px;
      ${Txt.large1b};
    }
    ${textRoundedAddColorNormal(t)};
  `
  // type: textUppercase, shape: rounded, size: normal2, color: normal
  export const textUppercaseRoundedNormal2Normal = (t: AppTheme.Theme) => css`
    ${textRoundedNormal};
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      padding-left: 16px;
      padding-right: 16px;
      ${Txt.large1b};
      text-transform: uppercase;
    }
    ${textRoundedAddColorNormal(t)};
  `
  
  // type: text, shape: rounded, size: small, color: normal
  export const textRoundedSmallNormal = (t: AppTheme.Theme) => css`
    ${textRoundedSmall};
    ${textRoundedAddColorNormal(t)};
  `
  // type: textUppercase, shape: rounded, size: small, color: normal
  export const textUppercaseRoundedSmallNormal = (t: AppTheme.Theme) => css`
    ${textRoundedSmall};
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      text-transform: uppercase;
    }
    ${textRoundedAddColorNormal(t)};
  `
  
  
  
  
  
  // type: text, shape: round, size: big
  const textRoundBig = css`
    ${addBase};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      height: 50px;
      width: 50px;
      background: none;
      border-radius: 999999px;
      padding: 11px;
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.p.mode.set('center')};
      }
    }
  `
  // type: text, shape: round, add color: normal
  const textRoundAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${W.e.button.p.color.set(t.buttonNormal.bg[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${RippleS.W.use.s.normal().e.ripple().thisUse} {
        ${RippleS.W.e.ripple.p.color.set(t.ripple.ctOnTransparent2)};
      }
    }
    
    // state: hover
    ${hoverable} { ${W.use.s.hover().e.button().thisUse} {
      background-color: ${t.buttonTransparent.bgFocus[0]};
    } }
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background-color: ${t.buttonTransparent.bgFocus[0]};
    }
  `
  // type: text, shape: round, add size: big2
  const textRoundAddSizeBig2 = css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      padding: 14px;
    }
  `
  
  
  // type: text, shape: round, size: big, color: normal
  export const textRoundBigNormal = (t: AppTheme.Theme) => css`
    ${textRoundBig};
    ${textRoundAddColorNormal(t)};
  `
  // type: text, shape: round, size: big2, color: normal
  export const textRoundBig2Normal = (t: AppTheme.Theme) => css`
    ${textRoundBig};
    ${textRoundAddSizeBig2};
    ${textRoundAddColorNormal(t)};
  `
  
  
  
  
  export namespace S {
    export namespace Filled {
      export namespace Rect {
        // type: filled, shape: rect, add color
        export const addColor = filledRectAddColor
      }
    }
  }
  
  
  
}
