import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import row = EmotionCommon.row
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import { TypeU } from '@util/common/TypeU.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import Elem = WidgetStyle.Elem
import CssPseudo = WidgetStyle.CssPseudo
import CssWidget = WidgetStyle.CssWidget
import CssAttr = WidgetStyle.CssAttr
import bgInBorder = EmotionCommon.bgInBorder
import PartialUndef = TypeU.PartialUndef
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import CssProp = WidgetStyle.CssProp




export namespace InputStyle {
  
  
  
  export const W = function() {
    const frame = new Elem('rrainuiFrame', { }, {
      color: CssProp.color,
    })
    const input = new Elem('rrainuiInput', {
      normal: CssPseudo.empty,
      hover: CssPseudo.hover,
      active: CssPseudo.active,
      focus: CssPseudo.focus,
      focusVisible: CssPseudo.focusVisible,
      readOnly: CssPseudo.readOnly,
      disabled: CssPseudo.disabled,
      error: CssAttr.dataError,
    }, { })
    const border = new Elem('rrainuiBorder', { }, { })
    
    const inputWidget = CssWidget
      .ofRoot('frame', frame)
      .add('frame', '>', 'input', input)
      .add('frame', '>', 'border', border)
    
    return inputWidget
  }()
  
  
  
  
  
  
  
  const base = css`
    // state: normal
    ${W.use.s.normal().e.frame().thisUse} {
      container: input / size;
      ${row};
      align-items: center;
      width: 100%;
      // min-height not works for stretch children while display: flex
      height: 50px;
      position: relative;
    }
    ${W.use.s.normal().e.input().thisUse} {
      ${resetInput};
      flex: 1;
      align-self: stretch;
      border-radius: inherit;
    }
    ${W.use.s.normal().e.border().thisUse} {
      ${abs};
      pointer-events: none;
      border-radius: inherit;
    }
  `
  
  
  
  // type: outlined, shape: rect, size: normal
  const outlinedRectNormal = css`
    ${base};
    
    // state: normal
    ${W.use.s.normal().e.frame().thisUse} {
      height: 50px;
      border-radius: 15px;
    }
    ${W.use.s.normal().e.input().thisUse} {
      padding: 4px 16px;
      ${Txt.large2};
    }
    ${W.use.s.normal().e.border().thisUse} {
      border: 2px solid transparent;
      background-size: 200% 100%;
      background-position: 100% 0;
      transition: background-position 0.8s ease-out;
      ${bgInBorder};
    }
    
    // state: hover
    ${hoverable}{
      ${W.use.s.hover().e.input().thisUse} { }
      ${W.use.s.hover().e.border().thisUse} {
        background-position: 0 0;
      }
    }
    
    // state: active
    ${W.use.s.active().e.input().thisUse} { }
    ${W.use.s.active().e.border().thisUse} { }
    
    // state: focus
    ${W.use.s.focus().e.input().thisUse} { }
    ${W.use.s.focus().e.border().thisUse} { }

    // state: focus-visible
    ${W.use.s.focusVisible().e.input().thisUse} { }
    ${W.use.s.focusVisible().e.border().thisUse} {
      background-position: 0 0;
    }

    // read-only
    ${W.use.s.readOnly().e.input().thisUse} { }
    ${W.use.s.readOnly().e.border().thisUse} { }

    // state: disabled
    ${W.use.s.disabled().e.input().thisUse} {
      cursor: auto;
    }
    ${W.use.s.disabled().e.border().thisUse} { }

    // state: error
    ${W.use.s.error().e.frame().thisUse} { }
    ${W.use.s.error().e.input().thisUse} { }
    ${W.use.s.error().e.border().thisUse} { }
  `
  
  const outlinedRectAddColorNormal = (t: AppTheme.Theme) => css`
    // state: normal
    ${W.use.s.normal().e.frame().thisUse} {
      background: ${t.input.bg[0]};
    }
    ${W.use.s.normal().e.input().thisUse} {
      ${W.props.color.p.set(t.input.content[0])};

      ::placeholder {
        color: ${t.input.placeholder[0]};
      }
    }
    ${W.use.s.normal().e.border().thisUse} {
      background-image: linear-gradient(
        to right,
        ${t.input.borderHover[0]},
        ${t.input.border[0]},
        ${t.input.border[1]}
      );
    }
    
    // state: read-only
    ${W.use.s.readOnly().e.frame().thisUse} {
      cursor: auto;
      color: ${t.input.content[0]};
    }
    ${W.use.s.readOnly().e.border().thisUse} {
      border-color: ${t.page.content2[0]};
    }

    // state: disabled
    ${W.use.s.disabled().e.input().thisUse} {
      ${W.props.color.p.set(t.input.content[0])};
    }
    ${W.use.s.disabled().e.border().thisUse} {
      border-color: ${t.input.content[0]};
    }

    // state: error
    ${W.use.s.error().e.frame().thisUse} {
      background: ${t.input.bgError[0]};
    }
  `
  /*
   background-image: linear-gradient(
   to right,
   ${t.input.error.border[0]},
   ${t.input.error.border[0]},
   ${t.input.error.border[0]}
   );
   */
  
  
  // type: outlined, shape: rect, + size: small
  export const outlinedRectAddSizeSmall = css`
    // state: normal
    ${W.use.s.normal().e.frame().thisUse} {
      height: 40px;
    }
    ${W.use.s.normal().e.input().thisUse} {
      padding: 4px 12px;
      ${Txt.large1};
    }
    ${W.use.s.normal().e.border().thisUse} {
      border-width: 1px;
    }
  `
  
  
  
  // type: outlined, shape: rect, size: normal, color: normal
  export const outlinedRectNormalNormal = (t: AppTheme.Theme) => css`
    ${outlinedRectNormal};
    ${outlinedRectAddColorNormal(t)};
  `
  
  // type: outlined, shape: rect, size: small, color: normal
  export const outlinedRectSmallNormal = (t: AppTheme.Theme) => css`
    ${outlinedRectNormal};
    ${outlinedRectAddSizeSmall};
    ${outlinedRectAddColorNormal(t)};
  `
  
  
  
  
  
  type InputOutlinedRectStyleProps = PartialUndef<{
    size:     'normal' | 'small'
    color:    'normal'
    textSize: 'normal' | 'small' | 'smaller'
  }>
  export const outlinedRectOf =
  (props?: InputOutlinedRectStyleProps) => (t: AppTheme.Theme) => css`
    ${outlinedRectNormal};
  
    ${{
      'normal': undefined,
      'small':  outlinedRectAddSizeSmall,
    }[props?.size ?? 'normal']};
    
    ${{
      'normal': outlinedRectAddColorNormal(t),
    }[props?.color ?? 'normal']};
    
    ${W.use.s.normal().e.input().thisUse} {
      ${{
        'normal': undefined,
        'small': Txt.large1,
        'smaller': Txt.small2,
      }[props?.textSize ?? 'normal']};
    }
  `
  
  
  
  
  
}
