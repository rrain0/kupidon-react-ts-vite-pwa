import { useAppZustand } from 'src/zustand/app/appZustand.ts'



export const useAppTheme = () => useAppZustand(s => s.theme)
