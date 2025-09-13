import { useMemo } from 'react'
import { objectEntries, objectMap } from 'src/utils/base/ObjectU.ts'
import {
  PickedUiValues,
  PickedUiValuesArr,
  UiValue,
  UiValues,
  UiValuesArr,
} from '@libs/ui-text/UiText.ts'
import { useAppZustand } from 'src/zustand/app/appZustand.ts'




export const pickUiValue = <V extends UiValue<any>>(
  uiValue: V,
  langs: string[],
): V[keyof V] => {
  const entries = objectEntries(uiValue)
  if (!entries.length) {
    throw new Error('UiValue record must have at least one pair of lang-value')
  }
  const pickedValue = entries
    .sort(([langA], [langB]) => {
      let ai = langs.findIndex(it => it === langA)
      let bi = langs.findIndex(it => it === langB)
      if (ai === -1) ai = langs.length
      if (bi === -1) bi = langs.length
      return ai - bi
    })
    [0][1]
  return pickedValue
}



export const pickUiValues = <V extends UiValues>(
  uiValues: V,
  langs: string[],
): PickedUiValues<V> => {
  return objectMap<V, PickedUiValues<V>>(
    uiValues,
    ([key, values]) => [key, pickUiValue(values, langs)]
  )
}



export const pickUiValuesArr = <V extends UiValuesArr>(
  uiValues: V,
  langs: string[],
): PickedUiValuesArr<V> => {
  return uiValues.map(values => pickUiValue(values, langs)) as PickedUiValuesArr<V>
}



export const useUiValues = <V extends UiValues>(
  uiValues: V
): PickedUiValues<V> => {
  const langs = useAppZustand(s => s.langs)
  const pickedUiValues = useMemo(() => pickUiValues(uiValues, langs), [uiValues, langs])
  return pickedUiValues
}



export const useUiValuesArr = <V extends UiValuesArr>(
  uiValues: V
): PickedUiValuesArr<V> => {
  const langs = useAppZustand(s => s.langs)
  const pickedUiValues = useMemo(() => pickUiValuesArr(uiValues, langs), [uiValues, langs])
  return pickedUiValues
}


