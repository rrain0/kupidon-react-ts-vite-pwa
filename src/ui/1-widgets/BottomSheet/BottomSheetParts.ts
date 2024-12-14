import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import fixed = EmotionCommon.fixed
import modalFloor1 = StyleVals.modalFloor1




export namespace BottomSheetParts {
  
  export const frameStyle = css`
    ${fixed};
    z-index: ${modalFloor1};
    background: none;
    pointer-events: none;
    //touch-action: none;
    display: grid;
    place-items: end center;
  `
  export const sheetStyle = css`
    display: grid;
    grid-template-rows: auto 1fr;
    justify-items: stretch;
    width: 100%;
    //overflow: hidden;
    pointer-events: auto;
  
    max-height: 100%; // Must be
  `
  
}
