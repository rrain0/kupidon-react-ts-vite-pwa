import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'




export namespace BottomSheetParts {
  
  import fixed = EmotionCommon.fixed
  export const frameStyle = css`
    ${fixed};
    z-index: 30;
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