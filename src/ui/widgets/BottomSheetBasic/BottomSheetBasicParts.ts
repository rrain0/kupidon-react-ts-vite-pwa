import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import col = EmotionCommon.col
import center = EmotionCommon.center




export namespace BottomSheetBasicParts {
  
  export const headerStyle = (t: AppTheme.Theme)=>css`
    background: ${t.bottomSheet.bgc[0]};
    border-radius: 16px 16px 0 0;
    color: ${t.page.content2[0]};
    padding: 10px;
    ${col};
    align-items: center;
    gap: 6px;
    touch-action: none;
    cursor: grab;
  `
  export const headerHandleStyle = (t: AppTheme.Theme)=>css`
    width: 44px;
    height: 4px;
    border-radius: 2px;
    background: ${t.bottomSheet.handle[0]};
  `
  export const headerTextStyle = (t: AppTheme.Theme)=>css`
    ${center};
    min-height: 20px;
  `
  
  
  
  export const bodyStyle = (t: AppTheme.Theme)=>css`
    display: flex;
    place-items: center;
    overflow: hidden;
    background: ${t.bottomSheet.bgc[0]};
    color: ${t.page.content2[0]};
  `
  
  
  
  export const scrollableContentStyle = (t: AppTheme.Theme)=>css`
    width: 100%;
    padding: 0 10px 10px;
    ${col};
    height: fit-content;
    min-height: fit-content;
  `
  
}