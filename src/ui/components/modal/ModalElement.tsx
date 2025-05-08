import { css } from '@emotion/react'
import { ModalStyle } from 'src/ui/components/modal/Modal/ModalStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import gridC = EmotionCommon.gridC




export namespace ModalElement {
  
  export const modalCenteredStyle = css`
    ${ModalStyle.modalBottom};
    padding: 20px;
    ${gridC};
  `
  
  export const modalForInputStyle = css`
    ${ModalStyle.modalBottom};
    padding: 20px;
    padding-bottom: 140px;
    display: grid;
    place-items: end center;
  `
  
  export const card2Style = css`
    min-width: 220px;
    width: 100%;
    max-width: 500px;
    gap: 10px;
  `
  
}
