import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useIsMount } from 'src/util/react-state/useIsMount.ts'
import { useMemo, useState } from 'react'
import {
  getParamValueData,
  parseSearchParams,
  SearchParamValueData, setParamValue, stringifySearchParams,
} from 'src/util/url/SearchParamsU.ts'
import { useSearchParamsZustand } from 'src/zustand/url/SearchParamsZustand.ts'
import Pu = TypeU.Pu



export type SearchParamUrlData = SearchParamValueData & Pu<{
  replace: boolean
  back: boolean
}>

export type SearchParamUrlAndValueData = SearchParamValueData & SearchParamUrlData



const updateUrlSearchParam = (
  param: string,
  { replace, back, ...searchParamValueData }: SearchParamUrlAndValueData = { }
): SearchParamValueData => {
  const url = new URL(window.location.href)
  
  const params = parseSearchParams(url.search)
  const newParams = setParamValue(params, param, searchParamValueData)
  
  let paramValueData = getParamValueData(newParams[param])
  
  if (params !== newParams) {
    url.search = stringifySearchParams(newParams)
    if (back) {
      window.history.back()
      paramValueData = updateUrlSearchParam(param)
    }
    else if (replace) window.history.replaceState({ }, '', url)
    else window.history.pushState({ }, '', url)
  }
  
  return paramValueData
}






export const useSearchParamValue = (
  param: string,
  initialData: SearchParamUrlAndValueData = { }
) => {
  
  const [initialParamData] = useState(() => updateUrlSearchParam(param, initialData))
  
  
  const stateParamValueData = getParamValueData(useSearchParamsZustand(s => s[param]))
  
  // null в урле становится отсутствием свойства в объекте.
  // Обновляет состояние, только если значение новое.
  const setParamState = useAsCallback((valueData: SearchParamUrlAndValueData) => {
    valueData = updateUrlSearchParam(param, valueData)
    useSearchParamsZustand.setState(curr => (
      setParamValue(curr, param, valueData)
    ), true)
  })
  
  
  const isMount = useIsMount()
  
  
  const paramValueData = useMemo(() => {
    if (isMount) {
      useSearchParamsZustand.setState(curr => (
        setParamValue(curr, param, initialParamData)
      ), true)
      return initialParamData
    }
    return stateParamValueData
  }, [isMount, stateParamValueData])
  
  
  return [paramValueData, setParamState] as const
}




// For single param i can make simple values:
// ''            => undefined
// 'param'       => null
// 'param='      => ''
// 'param=value' => 'value'

