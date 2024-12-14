import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import modalFloor1 = StyleVals.modalFloor1
import fixedBottom = EmotionCommon.fixedBottom




export namespace ModalStyle {
  
  
  
  export const modal = css`
    ${fixedBottom};
    height: 100dvh;
    background: #0000009a;
    z-index: ${modalFloor1};
  `
  
  
  
}
