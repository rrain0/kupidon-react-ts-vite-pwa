import { ArrayU } from '@utils/base/ArrayU.ts'
import { TypeU } from '@utils/base/TypeU.ts'
import { Lang } from '@utils/lang/Lang.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import isobject = TypeU.isobject
import nonemptyval = TypeU.nonemptyval
import isemptyval = TypeU.isemptyval
import NonEmptyArr = ArrayU.NonEmptyArr



const zustandLsName = 'zustandLangSettings'



const recoilLsName = 'langSettings'
// To trigger Zustand update from Recoil to Zustand
if (isemptyval(localStorage.getItem(zustandLsName)) && nonemptyval(localStorage.getItem(recoilLsName))) {
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
        const old = nonemptyval(oldRaw) ? JSON.parse(oldRaw) : undefined
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


