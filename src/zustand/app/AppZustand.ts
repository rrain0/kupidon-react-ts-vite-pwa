import { ArrayU } from '@utils/base/ArrayU.ts'
import { Lang } from '@utils/app/lang/Lang.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { DefaultTheme } from 'src/styles/themes/ThemesCollection.ts'
import { PageState } from 'src/components/components/UsePageLifecycle.tsx'
import { create } from 'zustand'
import NonEmptyArr = ArrayU.NonEmptyArr



export type AppZustand = {
  langs: NonEmptyArr<Lang.Supported>
  canUseSystemLang: boolean
  
  theme: AppTheme.Theme
  canInstall: boolean
  isDraggingFiles: boolean
  showDevOverlay: boolean
  
  pageState: PageState
  getIsOnline: () => boolean
  
  swReady: boolean
  wsReady: boolean
  getWsChannelReady: () => boolean
}



export const useAppZustand = create<AppZustand>()((set, get, store) => ({
  langs: [Lang.Default],
  canUseSystemLang: false,
  
  theme: DefaultTheme,
  canInstall: false,
  isDraggingFiles: false,
  showDevOverlay: false,
  
  pageState: null,
  getIsOnline: () => onlinePageStates.includes(get().pageState),
  
  swReady: false,
  wsReady: false,
  getWsChannelReady: () => get().swReady && get().wsReady,
}))



const onlinePageStates: PageState[] = ['Active', 'Passive']
