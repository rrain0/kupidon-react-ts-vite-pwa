import { css } from '@emotion/react'
import { ArrayUtils } from '@util/common/ArrayUtils.ts'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import { RippleStyle } from 'src/ui/elements/Ripple/RippleStyle.ts'
import Theme = AppTheme.Theme
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import Elem = ElementStyle.Elem
import Pseudo = ElementStyle.Pseudo
import CssProp = ElementStyle.CssProp
import CssPropEnum = ElementStyle.CssPropEnum
import CssPropColor = ElementStyle.CssPropColor
import DataAttrError = ElementStyle.DataAttrError




export namespace ButtonStyle {
  
  import PartialUndef = TypeUtils.PartialUndef
  import contains = ArrayUtils.contains
  export const Attr = {
    error: DataAttrError
  } as const
  
  export const El = function(){
    const btn = new Elem('rrainuiButton', {
      hover: Pseudo.hover,
      active: Pseudo.active,
      focus: Pseudo.focus,
      focusVisible: Pseudo.focusVisible,
      disabled: Pseudo.disabled,
      error: Attr.error,
    },{
      color: CssPropColor,
    })
    const border = btn.toElem('>', new Elem('rrainuiBorder',{},{}))
    const ripple = border.toElem('>', new Elem(RippleStyle.El.frameClassName,{},{
      mode: new CssPropEnum(RippleStyle.Prop.mode, ['center','cursor']),
      color: new CssProp(RippleStyle.Prop.color),
    }))
    return { root: btn, btn, border, ripple } as const
  }()
  
  // todo remove
  export const Prop = {
    color: CssPropColor,
  } as const
  
  
  
  export const common = css`
    // normal
    ${El.btn.thiz()} {
      border: none;
      transition: background linear 300ms;
      overflow-wrap: anywhere;
    }
    
    // disabled
    ${El.ripple.thiz('disabled')} {
      display: none;
    }
  `
  
  
  
  // type: filled, shape: rounded, size: normal
  const filledRoundedNormal = css`
    ${common};
    ${El.btn.thiz()} {
      min-width: 90px;
      width: fit-content;
      min-height: 40px;
      border-radius: 1000000px;
      padding: 8px 20px;
      gap: 0.6em;
      ${Txt.small1};
    }
  `
  
  // type: filled, shape: rounded, size: normal, color: normal
  export const filledRoundedNormalNormal = (t: AppTheme.Theme) => css`
    ${filledRoundedNormal};
    
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
  // type: filled, shape: rounded, size: normal, color: accent
  export const filledRoundedNormalAccent = (t: AppTheme.Theme) => css`
    ${filledRoundedNormal};
    
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
  
  
  // type: outlined, shape: rounded, size: normal
  const outlinedRoundedNormal = css`
    ${common};
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
  `
  // type: outlined, shape: rounded, size: normal, color: normal
  export const outlinedRoundedNormalNormal = (t: AppTheme.Theme) => css`
    ${outlinedRoundedNormal};
    
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
      ${El.btn.props.color.set(t.buttonNormal.content[0])}
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
  // type: outlined, shape: rounded, size: normal, color: accent
  export const outlinedRoundedNormalAccent = (t: AppTheme.Theme) => css`
    ${outlinedRoundedNormal};
    
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
  
  
  
  
  
  export namespace Shape {
    
    export const bigRect = css`
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
    export const smallRect = css`
      ${El.btn.thiz()} {
        width: auto;
        min-height: 30px;
        border-radius: 10px;
        padding: 4px 6px;
        gap: 4px;
        ${Txt.normal1};
      }
      ${El.border.thiz()}{
        border: 1px solid;
      }
    `
    
    export const rounded = css`
      ${El.btn.thiz()} {
        min-width: 90px;
        width: fit-content;
        min-height: 40px;
        border: 0;
        border-radius: 1000000px;
        padding: 8px 20px;
        gap: 0.6em;
        ${Txt.small1};
      }
      ${El.border.thiz()}{
        border: 1px solid;
      }
    `
    
    export const roundedSmall = css`
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
    `
    
  }
  
  
  
  export namespace Type {
    
    export const filled = css`
      ${El.border.thiz()} {
        border: none;
      }
    `
    
    export const outlined = css`
      ${El.btn.thiz()} {
        background: none;
      }
    `
    
    export const text = css`
      ${El.btn.thiz()} {
        background: none;
        ${Txt.large2b};
      }
      ${El.border.thiz()} {
        border: none;
      }
    `
    
  }
  
  
  
  export namespace Color {
    
    export const main = (t:Theme) => css`
      // normal
      ${El.btn.thiz()} {
        background: ${t.buttonMain.bgc[0]};
        ${El.btn.props.color.set(t.buttonMain.content[0])}
      }
      ${El.ripple.thiz()} {
        ${El.ripple.props.color.set(t.ripple.content[0])}
      }
      
      // hover
      ${hoverable}{ ${El.btn.thiz('hover')} {
        background: ${t.buttonMain.bgcFocus[0]};
      }}
      
      // active
      ${El.btn.thiz('active')} {}
      
      // focus
      ${El.btn.thiz('focus')} {}
      
      // focus-visible
      ${El.btn.thiz('focusVisible')} {
        background: ${t.buttonMain.bgcFocus[0]};
      }
      
      // disabled
      ${El.btn.thiz('disabled')} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color.name}: ${t.elementDisabled.content[0]};
      }
      
      // error
      ${El.border.thiz('error')} {}
    `
    
    
    
    export const accent = (t:Theme) => css`
      // normal
      ${El.btn.thiz()} {
        background: ${t.buttonAccent.bgc[0]};
        ${El.btn.props.color.set(t.buttonAccent.content[0])}
      }
      ${El.border.thiz()} {
        border-color: ${t.buttonAccent.bgc[0]};
      }
      ${El.ripple.thiz()} {
        ${El.ripple.props.color.set(t.ripple.content[0])}
      }

      // hover
      ${hoverable}{ ${El.btn.thiz('hover')} {
        background: ${t.buttonAccent.bgcFocus[0]};
        ${El.btn.props.color.set(t.buttonAccent.contentFocus[0])}
      }}

      // focus-visible
      ${El.btn.thiz('focusVisible')} {
        background: ${t.buttonAccent.bgcFocus[0]};
        ${El.btn.props.color.set(t.buttonAccent.contentFocus[0])}
      }

      // disabled
      ${El.btn.thiz('disabled')} {
        background: ${t.elementDisabled.bgc[0]};
        ${El.btn.props.color.set(t.elementDisabled.content[0])}
      }
    `
    
    
    
    export const normal = (t:Theme) => css`
      // normal
      ${El.btn.thiz()} {
        background: ${t.buttonNormal.bgc[0]};
        ${El.btn.props.color.set(t.buttonNormal.content[0])}
      }
      ${El.border.thiz()} {
        border-color: ${t.buttonNormal.bgc[0]};
      }
      ${El.ripple.thiz()} {
        ${El.ripple.props.color.set(t.ripple.content[0])}
      }

      // hover
      ${hoverable}{ ${El.btn.thiz('hover')} {
        background: ${t.buttonNormal.bgcFocus[0]};
      }}

      // focus-visible
      ${El.btn.thiz('focusVisible')} {
        background: ${t.buttonNormal.bgcFocus[0]};
      }

      // disabled
      ${El.btn.thiz('disabled')} {
        background: ${t.elementDisabled.bgc[0]};
        ${El.btn.props.color.set(t.elementDisabled.content[0])}
      }
    `
    
    
    export const secondary = (t:Theme) => css`
      // normal
      ${El.btn.thiz()} {
        background: ${t.buttonSecondary.bgc[0]};
        color: ${t.buttonSecondary.content[0]};
        ${Prop.color.name}: ${t.buttonSecondary.content[0]};
      }
      ${El.border.thiz()} {
        border-color: ${t.buttonSecondary.content[0]};
      }
      ${El.ripple.thiz()} {
        ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
      }

      // hover
      ${hoverable}{ ${El.btn.thiz('hover')} {
        background: ${t.buttonSecondary.bgcFocus[0]};
      }}

      // focus-visible
      ${El.btn.thiz('focusVisible')} {
        background: ${t.buttonSecondary.bgcFocus[0]};
      }

      // disabled
      ${El.btn.thiz('disabled')} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color.name}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    
    export const transparent = (t:Theme) => css`
      // normal
      ${El.btn.thiz()} {
        background: transparent;
        color: ${t.page.content2[0]};
        ${Prop.color.name}: ${t.page.content2[0]};
      }
      ${El.border.thiz()} {
        border-color: transparent;
      }
      ${El.ripple.thiz()} {
        ${El.ripple.props.color.set(t.ripple.contentOnTransparent[0])}
      }

      // hover
      ${hoverable}{ ${El.btn.thiz('hover')} {
        background: ${t.buttonTransparent.bgcFocus[0]};
      }}

      // focus-visible
      ${El.btn.thiz('focusVisible')} {
        background: ${t.buttonTransparent.bgcFocus[0]};
      }

      // disabled
      ${El.btn.thiz('disabled')} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color.name}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    export const danger = (t:Theme) => css`
      // normal
      ${El.btn.thiz()} {
        background: ${t.elementDanger.bgc[0]};
        color: ${t.elementDanger.content[0]};
        ${Prop.color.name}: ${t.elementDanger.content[0]};
      }
      ${El.ripple.thiz()} {
        ${El.ripple.props.color.set(t.ripple.content[0])}
      }
      
      // hover
      ${hoverable}{ ${El.btn.thiz('hover')} {
        background: ${t.elementDanger.bgcFocus[0]};
      }}
      
      // focus-visible
      ${El.btn.thiz('focusVisible')} {
        background: ${t.elementDanger.bgcFocus[0]};
      }
      
      // disabled
      ${El.btn.thiz('disabled')} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color.name}: ${t.elementDisabled.content[0]};
      }
    `
  }
  
  
  
  export const bigRectMain = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.main(t)};
  `
  export const bigRectAccent = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.accent(t)};
  `
  export const bigRectTransparent = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.transparent(t)};
  `
  export const bigRectDanger = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.danger(t)};
  `
  
  
  export const smallRectAccent = (t:Theme) => css`
    ${common};
    ${Shape.smallRect};
    ${Color.accent(t)};
  `
  export const smallRectTransparent = (t:Theme) => css`
    ${common};
    ${Shape.smallRect};
    ${Color.transparent(t)};
  `
  
  
  export const roundedAccent = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.accent(t)};
    ${El.border.thiz()}{
      border: none;
    }
  `
  export const roundedSecondary = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.secondary(t)};
  `
  export const roundedSmallAccent = (t:Theme) => css`
    ${common};
    ${Shape.roundedSmall};
    ${Color.accent(t)};
    ${El.border.thiz()}{
      border: none;
    }
  `
  export const roundedSmallSecondary = (t:Theme) => css`
    ${common};
    ${Shape.roundedSmall};
    ${Color.secondary(t)};
  `
  export const roundedTransparent = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${El.btn.thiz()} {
      ${Txt.large2b};
    }
    ${Color.transparent(t)};
  `
  
  export const roundedDanger = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.danger(t)};
  `
  
  
  // todo 'accentOff'
  export type ButtonStyleProps = PartialUndef<{
    type: 'filled' | 'outlined' | 'text'
    shape: 'rectBig' | 'rectSmall' | 'rounded' | 'roundedSmall'
    color: 'main' | 'accent' | 'normal' | 'secondary' | 'transparent'
  }>
  export const button = (props?: ButtonStyleProps) => (t: AppTheme.Theme) => css`
    ${common};
    
    ${{
      'rectBig': Shape.bigRect,
      'rectSmall': Shape.smallRect,
      'rounded': Shape.rounded,
      'roundedSmall': Shape.roundedSmall,
    }[props?.shape ?? 'rounded']};
    
    ${{
      'main': Color.main(t),
      'accent': Color.accent(t),
      'normal': Color.normal(t),
      'secondary': Color.secondary(t),
      'transparent': Color.transparent(t),
    }[props?.color ?? 'normal']};
    
    ${
      !props?.type
      && contains(props?.shape, ['rounded', 'roundedSmall'])
      && contains(props?.color, ['accent', 'normal'])
      && css`
        ${El.border.thiz()}{
          border: none;
        }
      `
    };
    ${
      !props?.type
      && contains(props?.shape, ['rounded'])
      && contains(props?.color, ['transparent'])
      && css`
        ${El.btn.thiz()} {
          ${Txt.large2b};
        }
      `
    };
    
    ${{
      'filled': Type.filled,
      'outlined': Type.outlined,
      'text': Type.text,
    }[props?.type ?? '']};
    
    ${
      contains(props?.type, ['outlined'])
      && contains(props?.shape, ['rounded'])
      && contains(props?.color, ['accent'])
      && css`
        ${El.btn.thiz()} {
          ${El.btn.props.color.set(t.buttonAccent.bgc[0])}
        }
      `
    };
    
  `
  
  
  
  
}