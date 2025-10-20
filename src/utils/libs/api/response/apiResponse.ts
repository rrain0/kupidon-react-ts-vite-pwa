import { AxiosError, type AxiosResponse, isAxiosError } from 'axios'
import { isdef } from 'src/utils/base/tsUtils.ts'
import {
  type ApiResponse,
  type ConnectionErrorResponse,
  type ErrorResponse, newConnectionError, newUnknownError,
  type ResponseError,
  type SuccessResponse, type TechnicalError, type UnknownErrorResponse,
} from 'src/utils/libs/api/response/apiResponseCore.ts'




export function is2xx(code: number) {
  return code >= 200 && code < 300
}
export function is4xx(code?: number): code is number {
  return isdef(code) && code >= 400 && code < 500
}



export function handle2xxSuccessResponse<D = unknown>(
  response: AxiosResponse
): SuccessResponse<D> | undefined {
  if (is2xx(response.status)) {
    const apiResponse: SuccessResponse<D> = {
      isSuccess: true,
      data: response.data as D,
    }
    return apiResponse
  }
}



export function handle4xxErrorResponse<E extends ResponseError>(
  ex: any
): ErrorResponse<E> | undefined {
  if (isAxiosError(ex) && is4xx(ex.response?.status)) {
    const apiResponse: ErrorResponse<E> = {
      isSuccess: false,
      error: ex.response.data as E,
    }
    return apiResponse
  }
}



export function isConnectionError(ex: any): boolean {
  if (isAxiosError(ex) && ex.code === AxiosError.ERR_NETWORK) return true
  return false
}
export function handleConnectionError(
  ex: any
): ConnectionErrorResponse | undefined {
  if (isConnectionError(ex)) {
    return newConnectionError()
  }
}



export function handleUnknownError(ex?: any): UnknownErrorResponse {
  return newUnknownError(ex)
}



export async function handleResponse<D, E extends ResponseError>(
  responsePromise: Promise<AxiosResponse>
): Promise<ApiResponse<D, E | TechnicalError>> {
  try {
    const serverResponse = await responsePromise
    return (
      handle2xxSuccessResponse<D>(serverResponse) ??
      newUnknownError(serverResponse)
    )
  }
  catch (ex) {
    return (
      handle4xxErrorResponse<E>(ex) ??
      handleConnectionError(ex) ??
      newUnknownError(ex)
    )
  }
}