import '@emotion/react'
import { AppTheme as LibTheme } from 'src/utils/theme/AppTheme';

declare module '@emotion/react' {
  export interface Theme extends LibTheme.Theme {}
}