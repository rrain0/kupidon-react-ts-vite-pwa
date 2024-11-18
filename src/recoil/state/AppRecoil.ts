import { atom } from 'recoil'




export type AppRecoilType = {
  canInstall: boolean
  isDraggingFiles: boolean
  gesturesBusyBy: undefined | string
  
  showDevOverlay: boolean
}
const Default: AppRecoilType = {
  canInstall: false,
  isDraggingFiles: false,
  gesturesBusyBy: undefined,
  showDevOverlay: false,
}
export const AppRecoil = atom<AppRecoilType>({
  key: 'app',
  default: Default,
})


