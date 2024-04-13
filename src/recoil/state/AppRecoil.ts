import { atom } from 'recoil'




export type AppRecoilType = {
  canInstall: boolean
  isDraggingFiles: boolean
  isUsingGestures: false | string
  
  showDevOverlay: boolean
}
const defolt: AppRecoilType = {
  canInstall: false,
  isDraggingFiles: false,
  isUsingGestures: false,
  showDevOverlay: false,
}
export const AppRecoil = atom<AppRecoilType>({
  key: 'app',
  default: defolt,
})


