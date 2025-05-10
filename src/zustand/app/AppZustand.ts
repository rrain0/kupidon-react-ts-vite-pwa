import { ArrayU } from '@util/common/ArrayU.ts'
import { Lang } from '@util/lang/Lang.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DefaultTheme } from 'src/ui-data/theme/ThemeCollection.ts'
import { create } from 'zustand'
import NonEmptyArr = ArrayU.NonEmptyArr



export type AppZustand = {
  langs: NonEmptyArr<Lang.Supported>
  canUseSystemLang: boolean
  
  theme: AppTheme.Theme
  canInstall: boolean
  isDraggingFiles: boolean
  showDevOverlay: boolean
}



export const useAppZustand = create<AppZustand>()((set, get, store) => ({
  langs: [Lang.Default],
  canUseSystemLang: false,
  
  theme: DefaultTheme,
  canInstall: false,
  isDraggingFiles: false,
  showDevOverlay: false,
}))


