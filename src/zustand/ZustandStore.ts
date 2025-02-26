import { NavBarPlace } from 'src/ui/1-widgets/NavBar/NavBar.tsx'
import { create } from 'zustand'



export type NavBarStore = {
  show: boolean
  place: NavBarPlace | undefined
}

export type ZustandStore = {
  navBar?: NavBarStore | undefined
  setNavBar: (navBar?: NavBarStore) => void
  
  //count: number
  //inc: () => void
}



export const useZustand = create<ZustandStore>()((set) => ({
  navBar: undefined,
  setNavBar: (navBar?: NavBarStore) => set({ navBar }),
  
  // count: 1,
  // inc: () => set((state) => ({ count: state.count + 1 })),
}))

