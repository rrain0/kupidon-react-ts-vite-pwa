
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { DefaultDarkTheme, DefaultLightTheme } from 'src/styles/themes/ThemesCollection.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { isobject } from '@utils/base/tsUtils.ts'
import { isnotnullundef } from '@utils/base/tsUtils.ts'
import { isnullundef } from '@utils/base/tsUtils.ts'



const zustandLsName = 'zustandThemeSettings'



const recoilLsName = 'themeSettings'
// To trigger Zustand update from Recoil to Zustand
if (isnullundef(localStorage.getItem(zustandLsName)) && isnotnullundef(localStorage.getItem(recoilLsName))) {
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
        const old = isnotnullundef(oldRaw) ? JSON.parse(oldRaw) : undefined
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


