import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import Theme = AppTheme.Theme
import Txt = EmotionCommon.Txt
import bgInBorder = EmotionCommon.bgInBorder
import hoverable = EmotionCommon.hoverable



export namespace DataFieldStyle {
  
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const frameClassName = 'rrainuiFrame'
    export const borderClassName = 'rrainuiBorder'
    
    export const frameClass = '.'+frameClassName
    export const borderClass = '.'+borderClassName
    
    export const frame = '&'+frameClass
    export const frameHover = frame+':hover'
    export const frameError = frame+Attr.error
    
    export const border = frame+'>'+borderClass
    export const borderHover = frameHover+'>'+borderClass
    export const borderError = frameError+'>'+borderClass
  }
  export namespace Prop {
    export const color = WidgetStyle.Prop0.prop.color
  }
  
  
  
  export const interactive = (t:Theme)=>css`
    ${El.frame} {
      cursor: pointer;
      border-radius: 15px;
      background: ${t.input.bg[0]};
      min-width: 0;
      width: 100%;
      min-height: 50px;
      padding: 4px 16px;

      overflow-wrap: anywhere;
      ${Txt.large2};
      color: ${t.input.content[0]};
      ${Prop.color}: ${t.input.content[0]};
    }
    ${El.border} {
      border: 2px solid transparent;
      background-image: linear-gradient(
        to right,
        ${t.input.borderHover[0]},
        ${t.input.border[0]},
        ${t.input.border[1]}
      );
      background-size: 200% 100%;
      background-position: 100% 0;
      transition: background-position 0.8s ease-out;
      ${bgInBorder};
    }
    
    // hover
    ${hoverable} {
      ${El.borderHover} {
        background-position: 0 0;
      }
    }
    
    // error
    ${El.frameError}{
      background: ${t.input.bgError[0]};
    }
  `
  
  const small = (t:Theme)=>css`
    ${El.frame} {
      width: 100%;
      min-height: 40px;
      padding: 4px 12px;
      ${Txt.large1};
    }
    ${El.border} {
      border-width: 1px;
    }
  `
  
  export const interactiveSmall = (t:Theme)=>css`
    ${interactive(t)};
    ${small(t)};
  `
  
  
  export const statik = (t:Theme)=>css`
    ${interactive(t)};
    ${El.frame} {
      cursor: auto;
      color: ${t.input.content[0]};
      ${Prop.color}: ${t.input.content[0]};
    }
    ${El.border} {
      border: 2px solid ${t.page.content2[0]};
    }
  `
  
  export const statikSmall = (t:Theme)=>css`
    ${statik(t)};
    ${small(t)};
  `
  
  
}