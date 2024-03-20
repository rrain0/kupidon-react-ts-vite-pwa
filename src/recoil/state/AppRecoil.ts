import { atom } from 'recoil'




export type AppRecoilType = {
  canInstall: boolean
  modalOutletId: string | undefined
  isDraggingFiles: boolean
  isUsingGestures: false | string
}
const defolt: AppRecoilType = {
  canInstall: false,
  modalOutletId: undefined,
  isDraggingFiles: false,
  isUsingGestures: false,
}
export const AppRecoil = atom<AppRecoilType>({
  key: 'app',
  default: defolt,
})


