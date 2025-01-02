import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import modalFloor1 = StyleVals.modalFloor1
import fixedBottom = EmotionCommon.fixedBottom




export namespace ModalStyle {
  
  
  export const modalFrameBottom = css`
    ${fixedBottom};
    height: 100dvh;
    z-index: ${modalFloor1};
    pointer-events: none;
  `
  
  
  export const modalBottom = css`
    ${fixedBottom};
    height: 100dvh;
    background: #0000009a;
    z-index: ${modalFloor1};
  `
  
  
  
}
