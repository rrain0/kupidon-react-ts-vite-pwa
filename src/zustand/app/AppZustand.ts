import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DefaultTheme } from 'src/ui-data/theme/ThemeCollection.ts'
import { create } from 'zustand'



export type AppZustand = {
  theme: AppTheme.Theme
  canInstall: boolean
  isDraggingFiles: boolean
  gesturesBusyBy: undefined | string
  showDevOverlay: boolean
}



export const useAppZustand = create<AppZustand>()((set, get, store) => ({
  theme: DefaultTheme,
  canInstall: false,
  isDraggingFiles: false,
  gesturesBusyBy: undefined,
  showDevOverlay: false,
}))


