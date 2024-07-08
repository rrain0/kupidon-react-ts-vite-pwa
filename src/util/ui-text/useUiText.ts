import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { PickedUiValues, UiValue, UiValues } from 'src/util/ui-text/UiText.ts'
import ObjectMap = ObjectU.ObjectMap
import ObjectEntries = ObjectU.ObjectEntries




const pickUiValue = <V extends UiValue<any>>
(uiValue: V, langs: string[]): V[keyof V] => {
  // Some settings have implementation only in one language, e.g., language name.
  return ObjectEntries(uiValue)
    .toSorted(([a],[b])=>{
      let aIdx = langs.findIndex(it=>it===a)
      let bIdx = langs.findIndex(it=>it===b)
      if (aIdx===-1) aIdx = langs.length
      if (bIdx===-1) bIdx = langs.length
      return aIdx - bIdx
    })
    [0][1]
}


// todo refactor toasts & remove
export const useUiValue = <V extends UiValue<any>>(uiValue: V|undefined): V[keyof V] | undefined => {
  const langs = useRecoilValue(LangRecoil).langs
  
  const pickedUiValue = useMemo(
    ()=>uiValue ? pickUiValue(uiValue, langs) : undefined,
    [langs, uiValue]
  )
  
  return pickedUiValue
}


export const useUiValues = <V extends UiValues>(uiValues: V): PickedUiValues<V> => {
  const langs = useRecoilValue(LangRecoil).langs
  
  const pickedUiValues = useMemo(
    ()=>ObjectMap<V,PickedUiValues<V>>(
      uiValues,
      ([key, values])=>[key, pickUiValue(values, langs)]
    ),
    [langs, uiValues]
  )
  
  return pickedUiValues
}