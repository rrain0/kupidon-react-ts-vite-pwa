import { AppTheme } from 'src/utils/theme/AppTheme'
import { css } from '@emotion/react'


export const SimpleGradientBgc = (t: AppTheme.Theme) => css`
  background: linear-gradient(
    to bottom right,
    ${t.page.bgcGradient[0]} 0%,
    ${t.page.bgcGradient[1]} 45% 55%,
    ${t.page.bgcGradient[2]} 100%
  );
`