import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import ObjectEntries = ObjectUtils.ObjectEntries



export const useClearSearchParams = (params: any) => {
  
  const [searchParams] = useSearchParams()
  
  const objParams = useMemo(()=>{
    const pathToParams = ObjectEntries(params)
      // @ts-ignore
      .reduce((prev,[n,p])=>{
        prev[p]=n
        return prev
      }, {})
    searchParams.forEach((v,n)=>{
      if (!pathToParams.hasOwnProperty(n)) searchParams.delete(n)
    })
    const objParams = [...searchParams].reduce((prev,[n,v])=>{
      prev[pathToParams[n]]=v
      return prev
    },{})
    return objParams
  },[searchParams,params])
  
  return objParams
}