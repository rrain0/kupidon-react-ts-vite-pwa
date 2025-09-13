import '@emotion/react'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'



declare module '@emotion/react' {
  export interface Theme extends AppTheme.Theme { }
}