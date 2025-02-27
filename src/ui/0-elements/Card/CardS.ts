import { css } from '@emotion/react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import col = EmotionCommon.col



export namespace CardS {
  
  export const card2S = (t: AppTheme.Theme) => css`
    padding: 16px 12px;
    border-radius: 15px;
    ${col};
    gap: inherit;
    background-color: ${t.boxDefault.bg};
    overflow: hidden;
  `
  
  export const card3S = (t: AppTheme.Theme) => css`
    padding: 16px 16px;
    border-radius: 15px;
    ${col};
    gap: 10px;
    background: ${t.boxDefault.bg};
    box-shadow: ${StyleVals.shadowSz} ${t.shadow.bg};
    overflow: hidden;
  `

}





