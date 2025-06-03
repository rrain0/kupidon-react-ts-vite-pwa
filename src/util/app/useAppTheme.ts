import { useAppZustand } from 'src/zustand/app/AppZustand.ts'



export const useAppTheme = () => useAppZustand(s => s.theme)
