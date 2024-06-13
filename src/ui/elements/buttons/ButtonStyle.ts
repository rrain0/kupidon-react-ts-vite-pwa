import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { WidgetStyle } from '@util/mini-libs/widget-style/WidgetStyle.ts'
import { RippleStyle } from 'src/ui/elements/Ripple/RippleStyle.ts'
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import CssWidget = WidgetStyle.CssWidget
import Elem = WidgetStyle.Elem
import Pseudo = WidgetStyle.Pseudo
import Attr = WidgetStyle.Attr
import Elem0 = WidgetStyle.Elem0
import Pseudo0 = WidgetStyle.Pseudo0
import CssProp = WidgetStyle.CssProp
import CssPropEnum = WidgetStyle.CssPropEnum
import CssPropColor = WidgetStyle.CssPropColor
import DataAttrError = WidgetStyle.DataAttrError




export namespace ButtonStyle {
  
  export const Attr0 = {
    error: DataAttrError
  } as const
  
  export const El = function(){
    const btn = new Elem0('rrainuiButton', {
      hover: Pseudo0.hover,
      active: Pseudo0.active,
      focus: Pseudo0.focus,
      focusVisible: Pseudo0.focusVisible,
      disabled: Pseudo0.disabled,
      error: Attr0.error,
    },{
      color: CssPropColor,
    })
    const border = btn.toElem('>', new Elem0('rrainuiBorder',{},{}))
    const ripple = border.toElem('>', new Elem0(RippleStyle.El.frameClassName,{},{
      mode: new CssPropEnum(RippleStyle.Prop.mode, ['center','cursor']),
      color: new CssProp(RippleStyle.Prop.color),
    }))
    return { root: btn, btn, border, ripple } as const
  }()
  
  
  export const W = function(){
    const button = new Elem('rrainuiButton', {
      normal: Pseudo.empty,
      hover: Pseudo.hover,
      active: Pseudo.active,
      focus: Pseudo.focus,
      focusVisible: Pseudo.focusVisible,
      readOnly: Pseudo.readOnly,
      disabled: Pseudo.disabled,
      error: Attr.dataError,
    }, {
      color: CssProp.color,
    })
    const border = new Elem('rrainuiBorder', { }, { })
    const ripple = new Elem(RippleStyle.El.frameClassName, { }, {
      mode: new CssPropEnum(RippleStyle.Prop.mode, ['center','cursor']),
      color: new CssProp(RippleStyle.Prop.color),
    })
    
    const buttonWidget = CssWidget
      .ofRoot('button', button)
      .add('button', '>', 'border', border)
      .add('border', '>', 'ripple', ripple)
    
    return buttonWidget
  }()
  
  
  
  
  
  
  
  
  export const basic = css`
    // state: normal
    ${El.btn.thiz()} {
      border: none;
      transition: background linear 300ms;
      overflow-wrap: anywhere;
    }
    
    // state: disabled
    ${El.ripple.thiz('disabled')} {
      display: none;
    }
  `
  
  
  
  
  // type: filled, shape: rect, size: big
  const filledRectBig = css`
    ${basic};
    // state: normal
    ${El.btn.thiz()} {
      width: 100%;
      min-height: 50px;
      border-radius: 15px;
      padding: 8px 6px;
      ${Txt.large2};
    }
    ${El.border.thiz()}{
      border: 1px solid;
    }
  `
  // type: filled, shape: rect, add color: main
  const filledRectAddColorMain = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      background: ${t.buttonMain.bgc[0]};
      ${El.btn.props.color.set(t.buttonMain.content[0])}
    }
    ${El.border.thiz()} {
      border: none;
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonMain.bgcFocus[0]};
    }}
    
    // state: active
    ${El.btn.thiz('active')} { }
    
    // state: focus
    ${El.btn.thiz('focus')} { }
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonMain.bgcFocus[0]};
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${W.props.color.p.set(t.elementDisabled.content[0])};
    }
    
    // state: error
    ${El.border.thiz('error')} { }
  `
  // type: filled, shape: rect, add color: accent
  const filledRectAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      background: ${t.buttonAccent.bgc[0]};
      ${El.btn.props.color.set(t.buttonAccent.content[0])}
    }
    ${El.border.thiz()} {
      border: none;
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonAccent.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonAccent.contentFocus[0])}
    }}
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonAccent.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonAccent.contentFocus[0])}
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${El.btn.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: filled, shape: rect, add color: normal
  const filledRectAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      background: ${t.buttonNormal.bgc[0]};
      ${El.btn.props.color.set(t.buttonNormal.content[0])}
    }
    ${El.border.thiz()} {
      border: none;
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonNormal.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonNormal.contentFocus[0])};
    }}
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonNormal.bgcFocus[0]};
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${El.btn.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: filled, shape: rect, add color: danger
  const filledRectAddColorDanger = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      background: ${t.elementDanger.bgc[0]};
      ${W.props.color.p.set(t.elementDanger.content[0])};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.elementDanger.bgcFocus[0]};
    }}
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.elementDanger.bgcFocus[0]};
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${W.props.color.p.set(t.elementDisabled.content[0])};
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
    ${El.btn.thiz()} {
      background: none;
    }
    ${El.border.thiz()} {
      border: none;
    }
  `
  // type: text, shape: rect, add color: normal
  export const textRectAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      ${W.props.color.p.set(t.page.content2[0])};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
    }
    
    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }}
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${W.props.color.p.set(t.elementDisabled.content[0])};
    }
  `
  // type: text, shape: rect, add size: normal
  const textRectAddSizeNormal = css`
    // state: normal
    ${El.btn.thiz()} {
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
    ${basic};
    // state: normal
    ${El.btn.thiz()} {
      min-width: 90px;
      width: fit-content;
      min-height: 40px;
      border-radius: 999999px;
      padding: 8px 20px;
      gap: 0.6em;
      ${Txt.small1};
    }
    ${El.border.thiz()}{
      border: none;
    }
  `
  // type: filled, shape: rounded, size: small
  export const filledRoundedSmall = css`
    // state: normal
    ${El.btn.thiz()} {
      width: fit-content;
      min-height: 30px;
      border-radius: 1000000px;
      padding: 4px 16px;
      ${Txt.small1};
    }
    ${El.border.thiz()}{
      border: none;
    }
  `
  // type: filled, shape: rounded, add color: normal
  export const filledRoundedAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      background: ${t.buttonNormal.bgc[0]};
      ${El.btn.props.color.set(t.buttonNormal.content[0])}
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable} { ${El.btn.thiz('hover')} {
      background: ${t.buttonNormal.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonNormal.contentFocus[0])};
    }}
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonNormal.bgcFocus[0]};
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${El.btn.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: filled, shape: rounded, add color: accent
  export const filledRoundedAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      background: ${t.buttonAccent.bgc[0]};
      ${El.btn.props.color.set(t.buttonAccent.content[0])}
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.content[0])}
    }

    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonAccent.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonAccent.contentFocus[0])}
    }}

    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonAccent.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonAccent.contentFocus[0])}
    }

    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${El.btn.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: filled, shape: rounded, add color: danger
  export const filledRoundedAddColorDanger = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      background: ${t.elementDanger.bgc[0]};
      ${W.props.color.p.set(t.elementDanger.content[0])};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.content[0])}
    }
    
    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.elementDanger.bgcFocus[0]};
    }}
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.elementDanger.bgcFocus[0]};
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${W.props.color.p.set(t.elementDisabled.content[0])};
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
    ${basic};
    
    // state: normal
    ${El.btn.thiz()} {
      min-width: 90px;
      width: fit-content;
      min-height: 40px;
      border-radius: 1000000px;
      background: none;
      padding: 8px 20px;
      gap: 0.6em;
      ${Txt.small1};
    }
    ${El.border.thiz()}{
      border: 1px solid;
    }
    
    // state: hover
    ${El.border.thiz('hover')} {
      border: none;
    }
  `
  // type: outlined, shape: rounded, size: small
  const outlinedRoundedSmall = css`
    ${basic};
    
    // state: normal
    ${El.btn.thiz()} {
      width: fit-content;
      min-height: 30px;
      border-radius: 1000000px;
      padding: 4px 16px;
      ${Txt.small1};
    }
    ${El.border.thiz()}{
      border: 1px solid;
    }
    
    // state: hover
    ${El.border.thiz('hover')} {
      border: none;
    }
  `
  // type: outlined, shape: rounded, add color: normal
  export const outlinedRoundedAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      ${El.btn.props.color.set(t.buttonNormal.bgc[0])}
    }
    ${El.border.thiz()} {
      border-color: ${t.buttonNormal.bgc[0]};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
    }
    
    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonNormal.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonNormal.contentFocus[0])};
    }}
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonNormal.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonNormal.content[0])}
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${El.btn.props.color.set(t.elementDisabled.content[0])}
    }
  `
  // type: outlined, shape: rounded, add color: accent
  export const outlinedRoundedAddColorAccent = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      ${El.btn.props.color.set(t.buttonAccent.bgc[0])}
    }
    ${El.border.thiz()} {
      border-color: ${t.buttonAccent.bgc[0]};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
    }
    
    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonAccent.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonAccent.contentFocus[0])}
    }}
    ${hoverable}{ ${El.border.thiz('hover')} {
      border-color: ${t.buttonAccent.bgcFocus[0]};
    }}
    
    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonAccent.bgcFocus[0]};
      ${El.btn.props.color.set(t.buttonAccent.contentFocus[0])}
    }
    
    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${El.btn.props.color.set(t.elementDisabled.content[0])}
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
    ${El.btn.thiz()} {
      background: none;
      ${Txt.large2b};
    }
    ${El.border.thiz()} {
      border: none;
    }
  `
  // type: text, shape: rounded, add color: normal
  export const textRoundedAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${El.btn.thiz()} {
      ${W.props.color.p.set(t.page.content2[0])};
    }
    ${El.ripple.thiz()} {
      ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
    }

    // state: hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }}

    // state: focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }

    // state: disabled
    ${El.btn.thiz('disabled')} {
      background: ${t.elementDisabled.bgc[0]};
      ${W.props.color.p.set(t.elementDisabled.content[0])};
    }
  `
  
  
  // type: text, shape: rounded, size: normal, color: normal
  export const textRoundedNormalNormal = (t: AppTheme.Theme) => css`
    ${textRoundedNormal};
    ${textRoundedAddColorNormal(t)};
  `
  
 
  
  
}