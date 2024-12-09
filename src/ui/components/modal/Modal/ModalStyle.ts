import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleConstants } from 'src/ui-data/style/StyleConstants'
import modalFloor1 = StyleConstants.modalFloor1
import fixedBottom = EmotionCommon.fixedBottom




export namespace ModalStyle {
  
  
  
  export const modal = css`
    ${fixedBottom};
    height: 100dvh;
    background: #0000009a;
    z-index: ${modalFloor1};
  `
  
  
  
}
