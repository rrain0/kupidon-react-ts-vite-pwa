import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import fixedBottom = EmotionCommon.fixedBottom




export namespace ModalStyle {
  
  
  
  export const modal = css`
    ${fixedBottom};
    height: 100dvh;
    background: #0000009a;
    z-index: 1;

    user-select: none;
    touch-action: none;
    pointer-events: none;
    >*{
      user-select: auto;
      touch-action: auto;
      pointer-events: auto;
    }
  `
  
  
  
}