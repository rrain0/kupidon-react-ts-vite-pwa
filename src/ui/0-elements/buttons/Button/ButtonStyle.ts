import { css } from '@emotion/react'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import { RippleStyle } from 'src/_old0/ui/0-elements/Ripple0/RippleStyle.ts'
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import CssWidget = WidgetStyle.CssWidget
import Elem = WidgetStyle.Elem
import CssPseudo = WidgetStyle.CssPseudo
import CssAttr = WidgetStyle.CssAttr
import Elem0 = WidgetStyle.Elem0
import Pseudo0 = WidgetStyle.Pseudo0
import CssProp = WidgetStyle.CssProp
import CssPropEnum = WidgetStyle.CssPropEnum
import CssPropColor = WidgetStyle.CssPropColor
import DataAttrError = WidgetStyle.DataAttrError
import resetButton = EmotionCommon.resetButton
import row = EmotionCommon.row
import abs = EmotionCommon.abs




export namespace ButtonStyle {
  
  export const Attr0 = {
    error: DataAttrError,
  } as const
  
  export const El0 = function() {
    const btn = new Elem0('rrainuiButton', {
      hover: Pseudo0.hover,
      active: Pseudo0.active,
      focus: Pseudo0.focus,
      focusVisible: Pseudo0.focusVisible,
      disabled: Pseudo0.disabled,
      error: Attr0.error,
    }, {
      color: CssPropColor,
    })
    const border = btn.toElem('>', new Elem0('rrainuiBorder', {}, {}))
    const ripple = border.toElem('>', new Elem0(RippleStyle.El0.frameClassName, {}, {
      mode: new CssPropEnum(RippleStyle.Prop.mode, ['center', 'cursor']),
      color: new CssProp(RippleStyle.Prop.color),
    }))
    return { root: btn, btn, border, ripple } as const
  }()
  
  
  export const El = function() {
    const button = new Elem('rrainuiButton', {
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
    const border = new Elem('rrainuiBorder', { }, { })
    const ripple = new Elem(RippleStyle.El0.frameClassName, { }, {
      mode: new CssPropEnum(RippleStyle.Prop.mode, ['center', 'cursor']),
      color: new CssProp(RippleStyle.Prop.color),
    })
    
    return { button, border, ripple } as const
  }()
  
  export const W = CssWidget
    .ofRoot('button', El.button)
    .add('button', '>', 'border', El.border)
    .add('border', '>', 'ripple', El.ripple)
  
  
  
  
  
  
  export const base = css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${resetButton};
      // it breaks button paddings
      //container: button / size;
      position: relative;
      ${row};
      place-content: center;
      place-items: center;
      border: none;
      overflow-wrap: anywhere;
      
      transition: background linear 300ms;
    }
    ${W.use.s.normal().e.border().thisUse} {
      ${abs};
      pointer-events: none;
      border-radius: inherit;
    }
    
    // state: disabled
    ${W.use.s.disabled().e.ripple().thisUse} {
      display: none;
    }
  `
  
  
  
  
  // type: filled, shape: rect, size: big
  const filledRectBig = css`
    ${base};
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      width: 100%;
      min-height: 50px;
      border-radius: 15px;
      padding: 8px 6px;
      ${Txt.large2};
    }
    ${W.use.s.normal().e.border().thisUse}{
      border: 1px solid;
    }
  `
  // type: filled, shape: rect, add color: main
  const filledRectAddColorMain = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: ${t.buttonMain.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonMain.content[0])}
    }
    ${W.use.s.normal().e.border().thisUse} {
      border: none;
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonMain.bgFocus[0]};
    }}
    
    // state: active
    ${W.use.s.active().e.button().thisUse} { }
    
    // state: focus
    ${W.use.s.focus().e.button().thisUse} { }
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonMain.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])};
    }
    
    // state: error
    ${W.use.s.error().e.border().thisUse} { }
  `
  // type: filled, shape: rect, add color: accent
  const filledRectAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: ${t.buttonAccent.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.content[0])}
    }
    ${W.use.s.normal().e.border().thisUse} {
      border: none;
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.contentFocus[0])}
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.contentFocus[0])}
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: filled, shape: rect, add color: normal
  const filledRectAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: ${t.buttonNormal.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.content[0])}
    }
    ${W.use.s.normal().e.border().thisUse} {
      border: none;
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonNormal.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.contentFocus[0])};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonNormal.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: filled, shape: rect, add color: danger
  const filledRectAddColorDanger = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: ${t.elementDanger.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDanger.content[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.elementDanger.bgFocus[0]};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.elementDanger.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])};
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
  
  
  
  
  // type: text, shape: rect, size: big
  export const textRectBig = css`
    ${filledRectBig};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: none;
    }
    ${W.use.s.normal().e.border().thisUse} {
      border: none;
    }
  `
  // type: text, shape: rect, add color: normal
  export const textRectAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${W.e.button.e.props.color.set(t.page.content2[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.contentOnTransparent[0]+'88')}
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonTransparent.bgFocus[0]};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonTransparent.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])};
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
    ${base};
    
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
    ${W.use.s.normal().e.border().thisUse}{
      border: none;
    }
  `
  // type: filled, shape: rounded, size: small
  export const filledRoundedSmall = css`
    ${base};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      width: fit-content;
      min-height: 30px;
      border-radius: 1000000px;
      padding: 4px 16px;
      ${Txt.small1};
    }
    ${W.use.s.normal().e.border().thisUse}{
      border: none;
    }
  `
  // type: filled, shape: rounded, add color: normal
  export const filledRoundedAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: ${t.buttonNormal.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.content[0])}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable} { ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonNormal.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.contentFocus[0])};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonNormal.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: filled, shape: rounded, add color: accent
  export const filledRoundedAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: ${t.buttonAccent.bg[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.content[0])}
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.content[0])}
    }

    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.contentFocus[0])}
    }}

    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.contentFocus[0])}
    }

    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: filled, shape: rounded, add color: danger
  export const filledRoundedAddColorDanger = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      background: ${t.elementDanger.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDanger.content[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.elementDanger.bgFocus[0]};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.elementDanger.bgFocus[0]};
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])};
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
  
  
  
  
  // type: outlined, shape: rounded, size: normal
  const outlinedRoundedNormal = css`
    ${base};
    
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
    ${base};
    
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
      ${W.e.ripple.e.props.color.set(t.ripple.contentOnTransparent[0]+'88')}
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonNormal.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.contentFocus[0])};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonNormal.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonNormal.content[0])}
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])}
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
      ${W.e.ripple.e.props.color.set(t.ripple.contentOnTransparent[0]+'88')}
    }
    
    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.contentFocus[0])}
    }}
    ${hoverable}{ ${W.use.s.hover().e.border().thisUse} {
      border-color: ${t.buttonAccent.bgFocus[0]};
    }}
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonAccent.bgFocus[0]};
      ${W.e.button.e.props.color.set(t.buttonAccent.contentFocus[0])}
    }
    
    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])}
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
    ${W.use.s.normal().e.border().thisUse} {
      border: none;
    }
  `
  // type: text, shape: rounded, add color: normal
  export const textRoundedAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${W.e.button.e.props.color.set(t.page.content2[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.props.color.set(t.ripple.contentOnTransparent[0]+'88')}
    }

    // state: hover
    ${hoverable}{ ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonTransparent.bgFocus[0]};
    }}

    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonTransparent.bgFocus[0]};
    }

    // state: disabled
    ${W.use.s.disabled().e.button().thisUse} {
      background: ${t.elementDisabled.bg[0]};
      ${W.e.button.e.props.color.set(t.elementDisabled.content[0])};
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
  
  
  
  
  
  // type: text, shape: round, size: big
  const textRoundBig = css`
    ${base};
    
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      height: 50px;
      width: 50px;
      background: none;
      border-radius: 999999px;
      padding: 11px;
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.p.mode.set('center')};
    }
  `
  // type: text, shape: round, add color: normal
  const textRoundAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.button().thisUse} {
      ${W.e.button.e.p.color.set(t.buttonNormal.bg[0])};
    }
    ${W.use.s.normal().e.ripple().thisUse} {
      ${W.e.ripple.e.p.color.set(t.ripple.contentOnTransparent[0]+'88')};
    }
    
    // state: hover
    ${hoverable} { ${W.use.s.hover().e.button().thisUse} {
      background: ${t.buttonTransparent.bgFocus[0]};
    } }
    
    // state: focus-visible
    ${W.use.s.focusVisible().e.button().thisUse} {
      background: ${t.buttonTransparent.bgFocus[0]};
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
  
  
  
  
}
