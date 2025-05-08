import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import gridC = EmotionCommon.gridC




export namespace ModalElement {
  
  export const modalCenteredS = css`
    padding: 20px;
    ${gridC};
  `
  
  export const modalInputBoxS = css`
    padding: 20px;
    padding-bottom: 140px;
    display: grid;
    place-items: end center;
  `
  
  export const cardBoxInModalS = css`
    min-width: 220px;
    width: 100%;
    max-width: 500px;
    gap: 10px;
  `
  
}
