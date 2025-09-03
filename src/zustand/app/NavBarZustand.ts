import { NavBarPlace } from 'src/components/widgets/NavBar/NavBar.tsx'
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



export type NavBarZustandStore = NavBarZustandSlice



export const useNavBarZustand = create<NavBarZustandStore>()((set, get, store) => ({
  ...createNavBarZustandSlice(set, get, store),
  
  // count: 1,
  // inc: () => set((state) => ({ count: state.count + 1 })),
}))

