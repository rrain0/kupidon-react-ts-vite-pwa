import '@emotion/react'
import { AppTheme as LibTheme } from 'src/ui/theme/AppTheme.ts'

declare module '@emotion/react' {
  export interface Theme extends LibTheme.Theme {}
}