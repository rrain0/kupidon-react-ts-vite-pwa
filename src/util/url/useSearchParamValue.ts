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





const updateUrlSearchParam = (
  param: string,
  { replace, ...searchParamValueData }: SearchParamValueData & Pu<{ replace: boolean }>
): SearchParamValueData => {
  const url = new URL(window.location.href)
  
  const params = parseSearchParams(url.search)
  const newParams = setParamValue(params, param, searchParamValueData)
  
  if (params !== newParams) {
    url.search = stringifySearchParams(newParams)
    if (replace) window.history.replaceState({ }, '', url)
    else window.history.pushState({ }, '', url)
  }
  
  return getParamValueData(newParams[param])
}



// TODO for single param i can make simple values: undefined, null, '', 'value'
export const useSearchParamValue = (
  param: string,
  data: SearchParamValueData & Pu<{ replace: boolean }> = { }
) => {
  
  const [initialParamData] = useState(() => updateUrlSearchParam(param, data))
  
  
  const stateParamValueData = getParamValueData(useSearchParamsZustand(s => s[param]))
  
  // null в урле становится отсутствием свойства в объекте.
  // Обновляет состояние, только если значение новое.
  const setParamState = useAsCallback((valueData: SearchParamValueData) => {
    updateUrlSearchParam(param, valueData)
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


