import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { css } from '@emotion/react'



export const SimpleGradientBg = (t: AppTheme.Theme) => css`
  background: linear-gradient(
    to bottom right,
    ${t.page.bgGradient[0]} 0%,
    ${t.page.bgGradient[1]} 45% 55%,
    ${t.page.bgGradient[2]} 100%
  );
`
