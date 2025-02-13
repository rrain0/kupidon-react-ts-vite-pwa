import { css } from '@emotion/react'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import col = EmotionCommon.col



export namespace CardS {
  
  export const card2S = (t: AppTheme.Theme) => css`
    padding: 16px 12px;
    border-radius: 15px;
    ${col};
    gap: inherit;
    background-color: ${t.boxNormal.bg[0]};
  `
  
  export const card3S = (t: AppTheme.Theme) => css`
    padding: 16px 16px;
    border-radius: 15px;
    ${col};
    gap: 10px;
    background: ${t.boxNormal.bg[0]};
    box-shadow: 0px 4px 15px 0px ${t.boxNormal.shadow[0]};
  `

}





