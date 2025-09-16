
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { DefaultDarkTheme, DefaultLightTheme } from 'src/styles/themes/ThemesCollection.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { isobject } from '@utils/base/typeUtils.ts'
import { isnonemptyval } from '@utils/base/typeUtils.ts'
import { isemptyval } from '@utils/base/typeUtils.ts'



const zustandLsName = 'zustandThemeSettings'



const recoilLsName = 'themeSettings'
// To trigger Zustand update from Recoil to Zustand
if (isemptyval(localStorage.getItem(zustandLsName)) && isnonemptyval(localStorage.getItem(recoilLsName))) {
  localStorage.setItem(zustandLsName, JSON.stringify({ version: -1 }))
}



export interface ThemeSettingsZustand {
  type: 'manual' | 'system'
  manual: AppTheme.Type
  light: string
  dark: string
}




export const useThemeSettingsZustand = create<ThemeSettingsZustand>()(persist(
  (set, get, store) => ({
    //type: 'system', // 'system' будет потом, когда сделаю тёмную нормально
    type: 'manual',
    manual: 'light',
    light: DefaultLightTheme.name,
    dark: DefaultDarkTheme.name,
  }),
  {
    name: zustandLsName,
    storage: createJSONStorage(() => localStorage),
    
    version: 1,
    migrate: (persisted: any, persistedVersion) => {
      if (persistedVersion <= 0) {
        const oldRaw = localStorage.getItem(recoilLsName)
        localStorage.removeItem(recoilLsName)
        const old = isnonemptyval(oldRaw) ? JSON.parse(oldRaw) : undefined
        if (isobject(old)) {
          persisted = old
        }
      }
      if (persistedVersion <= 1) {
        persisted = {
          type: persisted.setting,
          manual: persisted.manualSetting,
          light: persisted.light,
          dark: persisted.dark,
        }
      }
      return persisted
    },
  },
))


