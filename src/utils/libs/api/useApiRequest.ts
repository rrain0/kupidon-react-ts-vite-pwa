
import { useAsCallback } from 'src/utils/react/state/useAsCallback.ts'
import { useStateAndRef } from 'src/utils/react/state/useStateAndRef.ts'
import { useState } from 'react'
import { ApiResponseUtils } from '@libs/api/ApiResponseUtils.ts'
import ResponseError = ApiResponseUtils.ResponseError
import ApiResponse = ApiResponseUtils.ApiResponse
import { Callback } from 'src/utils/base/typeUtils.ts'



// Если нужно сохранить последний удачный респонс, пока делается новый,
// то надо использовать отделную логику,
// что-то типа useLastSuccessfulData / useLast / useLastValid
// useLast(data, isValid)

export const useApiRequest = <D, E extends ResponseError>(
  // здесь не будет параметров, если изменится сама функция во время запроса,
  // то надо отменить текущий запрос и сделать новый
  request: () => Promise<ApiResponse<D, E>>
) => {
  const { get: getIsLoading, set: setIsLoading, state: isLoading } = (
    useStateAndRef(false)
  )
  
  const [result, setResult] = (
    useState<{ data: D } | { error: E } | undefined>(undefined)
  )
  
  
  const startRequest = useAsCallback(async () => {
    if (getIsLoading()) return
    setResult(undefined)
    setIsLoading(true)
    try {
      const apiResponse = await request()
      if (apiResponse.isSuccess) {
        setResult({ data: apiResponse.data })
      }
      else {
        setResult({ error: apiResponse.error })
      }
    }
    finally {
      setIsLoading(false)
    }
  })
  
  return {
    startRequest,
    isLoading,
    isFinished: false,
    isSuccess: false,
    isError: false,
    data: undefined,
    error: undefined,
    ...(() => {
      if (!result) return {
        isFinished: !isLoading,
        isSuccess: false,
        isError: false,
        data: undefined,
        error: undefined,
      }
      if ('data' in result) return {
        isLoading: false,
        isFinished: true,
        isSuccess: true,
        isError: false,
        data: result.data,
        error: undefined,
      }
      if ('error' in result) return {
        isLoading: false,
        isFinished: true,
        isSuccess: false,
        isError: true,
        data: undefined,
        error: result.error,
      }
    })(),
  } as UseApiRequestResult<D, E>
}



export type UseApiRequestInitial = {
  startRequest: Callback
  isLoading: false
  isFinished: false
  isSuccess: false
  isError: false
  data: undefined
  error: undefined
}

export type UseApiRequestLoading = {
  startRequest: Callback
  isLoading: true
  isFinished: false
  isSuccess: false
  isError: false
  data: undefined
  error: undefined
}

export type UseApiRequestSuccess<D> = {
  startRequest: Callback
  isLoading: false
  isFinished: true
  isSuccess: true
  isError: false
  data: D
  error: undefined
}

export type UseApiRequestError<E extends ResponseError> = {
  startRequest: Callback
  isLoading: false
  isFinished: true
  isSuccess: false
  isError: true
  data: undefined
  error: E
}

export type UseApiRequestResult<D, E extends ResponseError> =
  | UseApiRequestInitial
  | UseApiRequestLoading
  | UseApiRequestSuccess<D>
  | UseApiRequestError<E>
