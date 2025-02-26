import { create } from 'zustand'



export type AppZustand = {
  canInstall: boolean
  isDraggingFiles: boolean
  gesturesBusyBy: undefined | string
  showDevOverlay: boolean
}



export const useAppZustand = create<AppZustand>()((set, get, store) => ({
  canInstall: false,
  isDraggingFiles: false,
  gesturesBusyBy: undefined,
  showDevOverlay: false,
}))


