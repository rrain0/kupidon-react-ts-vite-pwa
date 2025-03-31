import { TypeU } from '@util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DefaultDarkTheme, DefaultLightTheme } from 'src/ui-data/theme/ThemeCollection.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import isobject = TypeU.isobject
import exists = TypeU.exists
import notExists = TypeU.notExists



const zustandLsName = 'zustandThemeSettings'



const recoilLsName = 'themeSettings'
// To trigger Zustand update from Recoil to Zustand
if (notExists(localStorage.getItem(zustandLsName)) && exists(localStorage.getItem(recoilLsName))) {
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
    type: 'system',
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
        const old = exists(oldRaw) ? JSON.parse(oldRaw) : undefined
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


