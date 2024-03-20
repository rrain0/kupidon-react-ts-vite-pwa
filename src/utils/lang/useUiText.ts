import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { PickedUiValues, UiValue, UiValues } from 'src/utils/lang/UiText'
import ObjectMap = ObjectUtils.ObjectMap
import ArrayElement = ArrayUtils.ArrayElement




const pickUiValue = <V extends UiValue<any,any>>
(uiValues: readonly V[], langs: string[]): V => {
  const used = new Set<V>()
  return uiValues
    .toSorted((a,b)=>{
      if (a.value===b.value) {
        let langIdxA = langs.findIndex(it=>it===a.lang)
        let langIdxB = langs.findIndex(it=>it===b.lang)
        if (langIdxA===-1) langIdxA = langs.length
        if (langIdxB===-1) langIdxB = langs.length
        return langIdxA - langIdxB
      }
      return 0
    })
    .filter(it=>{
      if (used.has(it.value)) return false
      used.add(it.value)
      return true
    })
    [0]
}



export const useUiValueArr = <V extends UiValue<any,any>>
(uiText: readonly V[]): V => {
  const langs = useRecoilValue(LangRecoil).lang
  
  const pickedUiValue = useMemo(
    ()=>pickUiValue(uiText, langs),
    [langs, uiText]
  )
  
  return pickedUiValue
}



export const useUiValues = <T extends UiValues>(uiValues: T): PickedUiValues<T> => {
  const langs = useRecoilValue(LangRecoil).lang
  
  const pickedUiValues = useMemo(
    ()=>{
      const pickedUiValues = ObjectMap<T,PickedUiValues<T>>(
        uiValues,
        ([value,uiValueArr])=>[
          value,
          pickUiValue(uiValueArr, langs) as ArrayElement<T[string & keyof T]>
        ]
      )
      return pickedUiValues
    },
    [langs, uiValues]
  )
  
  return pickedUiValues
}