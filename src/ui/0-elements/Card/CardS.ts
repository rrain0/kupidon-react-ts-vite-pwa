import { css } from '@emotion/react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import col = EmotionCommon.col



export namespace CardS {
  
  export const card2S = (t: AppTheme.Theme) => css([col, {
    padding: '12px 16px',
    borderRadius: 15,
    gap: 10,
    backgroundColor: t.boxDefault.bg,
    overflow: 'hidden',
  }])
  
  
  export const card3S = (t: AppTheme.Theme) => css([card2S(t), {
    padding: 16,
    // TODO Theme full shadow as one entity
    boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}`,
  }])

}





