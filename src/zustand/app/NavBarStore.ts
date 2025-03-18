import { NavBarPlace } from 'src/ui/1-widgets/NavBar/NavBar.tsx'
import { create } from 'zustand'
import { StateCreator } from 'zustand/vanilla'



export type NavBarStore = {
  show: boolean
  place: NavBarPlace | undefined
}

export type NavBarZustandSlice = {
  navBar: NavBarStore | undefined
  setNavBar: (navBar?: NavBarStore) => void
}

export const createNavBarZustandSlice: StateCreator<NavBarZustandSlice> = set => ({
  navBar: undefined,
  setNavBar: (navBar?: NavBarStore) => set({ navBar }),
})



export type ZustandStore = NavBarZustandSlice



export const useZustand = create<ZustandStore>()((set, get, store) => ({
  ...createNavBarZustandSlice(set, get, store),
  
  // count: 1,
  // inc: () => set((state) => ({ count: state.count + 1 })),
}))

