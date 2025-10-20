import { isdef } from 'src/utils/base/tsUtils.ts'



export interface SuccessResponse<D = unknown> {
  isSuccess: true
  data: D
}



export interface ResponseError {
  code: string
  msg: string
  extra?: any
}
export interface ErrorResponse<E extends ResponseError> {
  isSuccess: false
  error: E
}



export type ApiResponse<D, E extends ResponseError> = SuccessResponse<D> | ErrorResponse<E>





export interface UnknownError extends ResponseError {
  code: 'UNKNOWN_ERROR'
  msg: 'Unknown error'
  extra?: any
}
export interface UnknownErrorResponse extends ErrorResponse<UnknownError> { }
export function newUnknownError(error?: any): UnknownErrorResponse {
  const unknown: UnknownErrorResponse = {
    isSuccess: false,
    error: {
      code: 'UNKNOWN_ERROR',
      msg: 'Unknown error',
      ...isdef(error) && { extra: error },
    },
  }
  console.warn('Unknown response error', unknown)
  return unknown
}



export interface ConnectionError extends ResponseError {
  code: 'CONNECTION_ERROR'
  msg: 'Connection error'
}
export interface ConnectionErrorResponse extends ErrorResponse<ConnectionError> { }
export function newConnectionError(): ConnectionErrorResponse {
  return {
    isSuccess: false,
    error: {
      code: 'CONNECTION_ERROR',
      msg: 'Connection error',
    },
  }
}



export type TechnicalError = UnknownError | ConnectionError

