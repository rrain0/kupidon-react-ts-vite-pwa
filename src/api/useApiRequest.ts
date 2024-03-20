import { useCallback, useEffect, useState } from 'react'
import { ApiUtils } from 'src/api/ApiUtils'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import Values = ValidationCore.Values
import ApiResponse = ApiUtils.ApiResponse
import ResponseError = ApiUtils.ResponseError





export type ResponseData
<Vs extends Values, D, E extends ResponseError> = {
  isSuccess: true
  data: D
  usedValues: Vs
} | {
  isSuccess: false
  error: E
  usedValues: Vs
}

export type UseApiRequestProps
<Vs extends Values, D, E extends ResponseError
> = {
  values: Vs
  failedFields: (keyof Vs)[]
  prepareAndRequest: (values: Vs, failedFields: (keyof Vs)[])=>Promise<ApiResponse<D,E>>
}
export const useApiRequest =
<Vs extends Values, D, E extends ResponseError>
(props: UseApiRequestProps<Vs,D,E>)=>{
  const {
    values,
    failedFields,
    prepareAndRequest,
  } = props
  
  
  
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isImmediate, setIsImmediate] = useState(false)
  const resetResponse = useCallback(
    ()=>{
      setIsSuccess(false)
      setIsError(false)
      setResponse(undefined)
      setIsImmediate(false)
    },
    []
  )
  
  
  const [response, setResponse] = useState(
    undefined as undefined | ResponseData<Vs,D,E>
  )
  
  
  
  
  
  const [doRequest, setDoRequest] = useState(false)
  const request = useCallback(
    ()=>setDoRequest(true),
    []
  )
  
  
  const tryRequest = useCallback(
    async()=>{
      if (isLoading) return
      //console.log('tryRequest')
      setIsLoading(true)
      resetResponse()
      try {
        const response = await prepareAndRequest(values,failedFields)
        if (response.isSuccess){
          setResponse({
            isSuccess: true,
            data: response.data,
            usedValues: values
          })
          setIsSuccess(true)
        }
        else {
          setResponse({
            isSuccess: false,
            error: response.error,
            usedValues: values
          })
          setIsError(true)
        }
      } finally {
        setIsLoading(false)
        setIsImmediate(true)
      }
    },
    [isLoading, resetResponse, prepareAndRequest, values, failedFields]
  )
  
  
  const tryRequestEffectEvent = useEffectEvent(()=>tryRequest())
  useAsyncEffect(
    (lock,unlock)=>{
      if (doRequest && lock('api-request')){
        setDoRequest(false)
        ;(async()=>{
          tryRequestEffectEvent()
            .finally(()=>unlock('api-request'))
        })()
      }
    },
    [doRequest]
  )
  
  
  
  useEffect(
    ()=>setIsImmediate(false),
    [isImmediate]
  )
  
  
  
  return {
    request,
    isLoading, isSuccess, isError, isImmediate,
    response, resetResponse,
  } as const
}
