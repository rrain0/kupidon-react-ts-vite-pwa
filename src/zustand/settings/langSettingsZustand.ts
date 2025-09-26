import { NonEmptyArr } from '@utils/array/arrayMoreUtils.ts'
import { Lang } from '@utils/app/lang/Lang.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { isobject } from '@utils/base/tsUtils.ts'
import { isnotnullundef } from '@utils/base/tsUtils.ts'
import { isnullundef } from '@utils/base/tsUtils.ts'



const zustandLsName = 'zustandLangSettings'



const recoilLsName = 'langSettings'
// To trigger Zustand update from Recoil to Zustand
if (isnullundef(localStorage.getItem(zustandLsName)) && isnotnullundef(localStorage.getItem(recoilLsName))) {
  localStorage.setItem(zustandLsName, JSON.stringify({ version: -1 }))
}



export interface LangSettingsZustand {
  type: 'manual' | 'system'
  manual: NonEmptyArr<Lang.Supported> | undefined
}




export const useLangSettingsZustand = create<LangSettingsZustand>()(persist(
  (set, get, store) => ({
    type: 'system',
    manual: undefined,
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
        }
      }
      return persisted
    },
  },
))


