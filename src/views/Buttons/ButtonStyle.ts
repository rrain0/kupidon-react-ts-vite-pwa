import { css } from '@emotion/react'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CommonStyle } from 'src/views/CommonStyle'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import { RippleStyle } from 'src/views/Ripple/RippleStyle'
import Theme = AppTheme.Theme
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import Elem = CommonStyle.Elem
import DataAttr = CommonStyle.DataAttr
import Pseudo = CommonStyle.Pseudo




export namespace ButtonStyle {
  
  import CssProp = CommonStyle.CssProp
  export const Attr = {
    error: DataAttr.error
  } as const
  
  export const El = function(){
    const btn = new Elem('rrainuiButton',{
      hover: Pseudo.hover,
      active: Pseudo.active,
      focus: Pseudo.focus,
      focusVisible: Pseudo.focusVisible,
      disabled: Pseudo.disabled,
      error: Attr.error,
    })
    const border = btn.upFor('>', new Elem('rrainuiBorder',{}))
    const ripple = border.upFor('>', new Elem(RippleStyle.El.frameClassName,{}))
    const icon = btn.upFor('>', new Elem(SvgIcStyle.El.clazz.icon,{}))
    return { root: btn, btn, border, ripple, icon } as const
  }()
  
  export const Prop = {
    color: CssProp.color,
    rippleMode:  new CssProp(RippleStyle.Prop.mode.substring(2),['center','cursor']),
    rippleColor: new CssProp(RippleStyle.Prop.color.substring(2),[]),
    iconSize:    new CssProp(SvgIcStyle.Prop.prop.size.substring(2),[]),
    iconColor:   new CssProp(SvgIcStyle.Prop.prop.color.substring(2),[]),
  } as const
  
  
  
  const common = css`
    // normal
    ${El.btn.thiz()} {
      transition: background linear 300ms;
      overflow-wrap: anywhere;
    }
    
    // disabled
    ${El.ripple.thiz('disabled')} {
      display: none;
    }
  `
  
  
  namespace Shape {
    
    export const bigRect = css`
      ${El.btn.thiz()} {
        width: 100%;
        min-height: 50px;
        border-radius: 15px;
        padding: 8px 6px;
        ${Txt.large2};
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
    `
    
    export const rounded = css`
      ${El.btn.thiz()} {
        width: fit-content;
        min-height: 40px;
        border-radius: 1000000px;
        padding: 8px 20px;
        ${Txt.small1};
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
    `
    
  }
  
  
  
  namespace Color {
    
    export const main = (t:Theme) => css`
      // normal
      ${El.btn.thiz()} {
        background: ${t.buttonMain.bgc[0]};
        color: ${t.buttonMain.content[0]};
        ${Prop.color.name}: ${t.buttonMain.content[0]};
      }
      ${El.ripple.thiz()} {
        ${Prop.rippleColor.name}: ${t.ripple.content[0]};
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
        color: ${t.buttonAccent.content[0]};
        ${Prop.color.name}: ${t.buttonAccent.content[0]};
      }
      ${El.ripple.thiz()} {
        ${Prop.rippleColor.name}: ${t.ripple.content[0]};
      }

      // hover
      ${hoverable}{ ${El.btn.thiz('hover')} {
        background: ${t.buttonAccent.bgcFocus[0]};
      }}

      // focus-visible
      ${El.btn.thiz('focusVisible')} {
        background: ${t.buttonAccent.bgcFocus[0]};
      }

      // disabled
      ${El.btn.thiz('disabled')} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color.name}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    export const secondary = (t:Theme)=>css`
      // normal
      ${El.btn.thiz()} {
        background: ${t.buttonSecondary.bgc[0]};
        color: ${t.buttonSecondary.content[0]};
        ${Prop.color.name}: ${t.buttonSecondary.content[0]};
      }
      ${El.border.thiz()} {
        border: 1px solid;
        border-color: ${t.buttonSecondary.content[0]};
      }
      ${El.ripple.thiz()} {
        ${Prop.rippleColor.name}: ${t.ripple.contentOnTransparent[0]};
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
    
    
    
    export const transparent = (t:Theme)=>css`
      // normal
      ${El.btn.thiz()} {
        background: transparent;
        color: ${t.page.content2[0]};
        ${Prop.color.name}: ${t.page.content2[0]};
      }
      ${El.border.thiz()} {
        border: 1px solid;
        border-color: transparent;
      }
      ${El.ripple.thiz()} {
        ${Prop.rippleColor.name}: ${t.ripple.contentOnTransparent[0]};
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
        ${Prop.rippleColor.name}: ${t.ripple.content[0]};
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
  
  
  export const roundedAccent = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.accent(t)};
    ${El.btn.thiz()} {
      color: ${t.buttonAccent.content2[0]};
      ${Prop.color.name}: ${t.buttonAccent.content2[0]};
    }
  `
  export const roundedSmallAccent = (t:Theme) => css`
    ${common};
    ${Shape.roundedSmall};
    ${Color.accent(t)};
    ${El.btn.thiz()} {
      color: ${t.buttonAccent.content2[0]};
      ${Prop.color.name}: ${t.buttonAccent.content2[0]};
    }
  `
  export const roundedSmallSecondary = (t:Theme) => css`
    ${common};
    ${Shape.roundedSmall};
    ${Color.secondary(t)};
  `
  
  export const roundedDanger = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.danger(t)};
  `
  
  
  
  
  
  
  
  
  
  
  
  
  export const icon = (t:Theme) => css`
    ${common};
    // normal
    ${El.btn.thiz()} {
      height: 50px;
      width: 50px;
      //border-radius: 26%;
      border-radius: 999999px;
      padding: 14px;
      
      background: ${t.buttonMain.bgc[0]};
      color: ${t.buttonMain.content[0]};
      ${Prop.color.name}: ${t.buttonMain.content[0]};
    }
    ${El.ripple.thiz()} {
      ${Prop.rippleMode.name}: center;
      ${Prop.rippleColor.name}: ${t.ripple.content[0]};
    }
    ${El.icon.thiz()} {
      ${Prop.iconSize.name}: 100%;
      ${Prop.iconColor.name}: ${t.buttonMain.content[0]};
    }
    
    // hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonMain.bgcFocus[0]};
    }}

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
    ${El.icon.thiz('disabled')} {
      ${Prop.iconColor.name}: ${t.elementDisabled.content[0]};
    }
  `
  
  
  
  export const iconTransparent = (t:Theme) => css`
    ${icon(t)};
    // normal
    ${El.btn.thiz()} {
      border-radius: 999999px;
      background: none;
      color: ${t.buttonAccent.bgc[0]};
      ${Prop.color.name}: ${t.buttonAccent.bgc[0]};
    }
    ${El.ripple.thiz()} {
      ${Prop.rippleColor.name}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.icon.thiz()} {
      ${Prop.iconColor.name}: ${t.buttonAccent.bgc[0]};
    }

    // hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }}

    // focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }
  `
  
  
  export const iconBigTransparent = (t:Theme) => css`
    ${iconTransparent(t)};
    ${El.btn.thiz()} {
      padding: 11px;
    }
  `
  
  
  
  
  
  
  
  
  
  export const nav = (t:Theme)=>css`
    ${common};
    // normal
    ${El.btn.thiz()} {
      height: 100%;
      flex: 1;
      ${col};
      align-items: center;
      gap: 3px;
      padding: 5px 0 2px;

      background: none;
      color: ${t.buttonNav.content[0]};
      ${Prop.color.name}: ${t.buttonNav.content[0]};
      
      ${Txt.small5};
    }
    ${El.ripple.thiz()} {
      ${Prop.rippleMode.name}: center;
      ${Prop.rippleColor.name}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.icon.thiz()} {
      ${Prop.iconSize.name}: 100%;
      ${Prop.iconColor.name}: ${t.buttonNav.content[0]};
    }
    
    // link active
    // IT IS WORKING !!!: a.active &.btnDotClass > iconDotClass
    a.active ${El.icon.thiz()} {
      ${Prop.iconColor.name}: ${t.buttonNav.contentAccent[0]};
    }
    a.active ${El.btn.thiz()} {
      color: ${t.buttonNav.contentAccent[0]};
      ${Prop.color.name}: ${t.buttonNav.contentAccent[0]};
    }
    
    // hover
    ${hoverable}{ ${El.btn.thiz('hover')} {
      background: ${t.buttonNav.bgcFocus[0]};
    }}

    // focus-visible
    ${El.btn.thiz('focusVisible')} {
      background: ${t.buttonNav.bgcFocus[0]};
    }
  `
  
  
  
  
}