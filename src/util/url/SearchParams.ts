import { TypeU } from 'src/util/common/TypeU.ts'
import {
  parseSearchParams,
  SearchParamsData, SearchParamValueData, setSearchParam,
  stringifySearchParams,
} from 'src/util/url/SearchParamsU.ts'
import isstring = TypeU.isstring


export class SearchParams {
  private readonly d: SearchParamsData
  
  constructor(
    search: string | SearchParamsData | URLSearchParams | SearchParams = ''
  ) {
    if (search instanceof URLSearchParams) this.d = parseSearchParams(search.toString())
    else if (search instanceof SearchParams) this.d = search.d
    else if (isstring(search)) this.d = parseSearchParams(search)
    else this.d = search
  }
  
  with(
    param: string,
    valueData: SearchParamValueData
  ) {
    const newD = setSearchParam(this.d, param, valueData)
    if (this.d === newD) return this
    return new SearchParams(newD)
  }
  
  get(param: string) {
    return this.d[param]?.[0]
  }
  
  toString() {
    return stringifySearchParams(this.d)
  }
}