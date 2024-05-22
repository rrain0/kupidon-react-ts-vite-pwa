import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ModalStyle } from 'src/ui/components/modal/ModalPortal/ModalStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import row = EmotionCommon.row




export namespace ModalElement {
  
  export const modalStyle = css`
    ${ModalStyle.modal};
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
  export const DialogButtons = styled.div`
    ${row};
    gap: 10px;
    justify-content: end;
  `
  
}