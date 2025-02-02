import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { css } from '@emotion/react'



export const SimpleGradientBg = (t: AppTheme.Theme) => css`
  background: linear-gradient(
    to bottom right,
    ${t.page.bgGrad[0]} 0%,
    ${t.page.bgGrad[1]} 45% 55%,
    ${t.page.bgGrad[2]} 100%
  );
`
