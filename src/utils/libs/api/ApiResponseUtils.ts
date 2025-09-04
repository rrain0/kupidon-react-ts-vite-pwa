
import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { isdef } from 'src/utils/base/math/typeUtils.ts'



export namespace ApiResponseUtils {
  
  
  
  
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
  
  
  
  export interface AuthenticationError extends ResponseError {
    code: 'AUTHENTICATION_ERROR'
    msg: 'Authentication error'
    extra?: any
  }
  export interface AuthenticationErrorResponse extends ErrorResponse<AuthenticationError> { }
  export function newAuthenticationError(error?: any): AuthenticationErrorResponse {
    const auth: AuthenticationErrorResponse = {
      isSuccess: false,
      error: {
        code: 'AUTHENTICATION_ERROR',
        msg: 'Authentication error',
        ...isdef(error) && { extra: error },
      },
    }
    console.warn('Authentication response error', auth)
    return auth
  }
  
  
  
  export interface NoUserResponseError extends ResponseError {
    code: 'NO_USER'
    msg: 'No users found for the requested data'
  }
  
  
  
  
  
  
  
  export type ApiResponse<D, E extends ResponseError> = SuccessResponse<D> | ErrorResponse<E>
  
  
  
  
  
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
  
  
  
  
  
  export function handle401AuthenticationErrorResponse(
    ex: any
  ): AuthenticationErrorResponse | undefined {
    if (isAxiosError(ex) && ex.response?.status === 401) {
      return newAuthenticationError(ex)
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
  
  export async function handleAuthenticatedResponse<D, E extends ResponseError>(
    responsePromise: Promise<AxiosResponse>
  ): Promise<ApiResponse<D, E | TechnicalError | AuthenticationError>> {
    try {
      const serverResponse = await responsePromise
      return (
        handle2xxSuccessResponse<D>(serverResponse) ??
        newUnknownError(serverResponse)
      )
    }
    catch (ex) {
      return (
        handle401AuthenticationErrorResponse(ex) ??
        handle4xxErrorResponse<E>(ex) ??
        handleConnectionError(ex) ??
        newUnknownError(ex)
      )
    }
  }
  
  /*
  export async function handleAuthorizedResponse<D, E extends ResponseError>(
    responsePromise: Promise<AxiosResponse>
  ): Promise<ApiResponse<D, E | TechnicalError | AuthenticationError | AuthorizationError>> {
    try {
      const serverResponse = await responsePromise
      return (
        handle2xxSuccessResponse<D>(serverResponse) ??
        newUnknownError(serverResponse)
      )
    }
    catch (ex) {
      return (
        handle403AuthorizationErrorResponse(ex) ??
        handle401AuthenticationErrorResponse(ex) ??
        handle4xxErrorResponse<E>(ex) ??
        handleConnectionError(ex) ??
        newUnknownError(ex)
      )
    }
  }
   */
  
  
  
  
  export function is2xx(code: number) {
    return code >= 200 && code < 300
  }
  export function is4xx(code?: number): code is number {
    return isdef(code) && code >= 400 && code < 500
  }
}
