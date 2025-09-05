import { stringifyEq } from 'src/utils/base/jsUtils.ts'
import { objectEntries } from 'src/utils/base/ObjectU.ts'
import { isundef } from 'src/utils/base/math/typeUtils.ts'
import { Pu } from 'src/utils/base/math/typeUtils.ts'
import { isdef } from 'src/utils/base/math/typeUtils.ts'




// '' => { }
// '?' => { ['']: [undefined] }
// '?param' => { param: [undefined] }
// '?param=' => { param: [''] }
// '?param=value' => { param: ['value'] }
// '?param&param=&param=value&' => { param: [undefined, '', 'value'], ['']: [undefined] }
export type SearchParamValues = (string | undefined)[]
export type SearchParamsData = Record<string, SearchParamValues>



export const parseSearchParams = (search = ''): SearchParamsData => (
  search
    .split('?')[1]
    ?.split('&')
    .map(it => it.split(/(?<!=.*)=/) as [param: string, v?: string])
    .reduce((acc, [param, v]) => {
      ;(acc[param] ??= []).push(v)
      return acc
    }, { } as SearchParamsData)
    ?? { }
)



export const stringifySearchParams = (searchData: SearchParamsData = { }) => (
  objectEntries(searchData).map(([param, values], i) => values.map((v, j) => (
    `${!i && !j ? '?' : '&'}${param}${isundef(v) ? '' : `=${v}`}`
  )).join('')).join('')
)




export type SearchParamData = { param: string } & SearchParamValueData
export type SearchParamValueData = Pu<{
  noParam: boolean
  noValue: boolean
  value: string
}>

export const setSearchParam = (
  params: SearchParamsData,
  param: string,
  { noParam, noValue, value }: SearchParamValueData
) => {
  const newParams = { ...params }
  
  if (noParam) delete newParams[param]
  else if (noValue) newParams[param] = [undefined]
  else if (isdef(value)) newParams[param] = [value]
  
  if (params === newParams || stringifyEq(params, newParams)) return params
  return newParams
}


export const getSearchParamValueData = (
  paramValues?: SearchParamValues
): SearchParamValueData => {
  if (!paramValues?.length) return { noParam: true }
  if (isundef(paramValues[0])) return { noValue: true }
  return { value: paramValues[0] }
}