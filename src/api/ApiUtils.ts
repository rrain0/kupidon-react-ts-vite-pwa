import { AxiosError, AxiosResponse } from 'axios'



export namespace ApiUtils {
  
  
  
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
    code: 'unknown-error'
    msg: 'Unknown error'
    extra?: any
  }
  export interface UnknownErrorResponse extends ErrorResponse<UnknownError>{}
  export function getUnknownError(error?: any): UnknownErrorResponse {
    const unknown: UnknownErrorResponse = {
      isSuccess: false,
      error: {
        code: 'unknown-error',
        msg: 'Unknown error',
      }
    }
    if (error!==undefined) unknown.error.extra = error
    console.warn('Unknown response error',unknown)
    return unknown
  }
  
  
  
  export interface ConnectionError extends ResponseError {
    code: 'connection-error'
    msg: 'Connection error'
  }
  export interface ConnectionErrorResponse extends ErrorResponse<ConnectionError>{}
  export function getConnectionError(): ConnectionErrorResponse {
    return {
      isSuccess: false,
      error: {
        code: 'connection-error',
        msg: 'Connection error',
      }
    }
  }
  
  
  
  export type TechnicalError = UnknownError | ConnectionError
  
  
  
  export interface AuthenticationError extends ResponseError {
    code: 'authentication-error'
    msg: 'Authentication error'
    extra?: any
  }
  export interface AuthenticationErrorResponse extends ErrorResponse<AuthenticationError>{}
  export function getAuthenticationError(error?: any): AuthenticationErrorResponse {
    const auth: AuthenticationErrorResponse = {
      isSuccess: false,
      error: {
        code: 'authentication-error',
        msg: 'Authentication error',
      }
    }
    if (error!==undefined) auth.error.extra = error
    console.warn('Authentication response error',auth)
    return auth
  }
  
  
  
  export interface NoUserResponseError extends ResponseError {
    code: 'NO_USER'
    msg: 'No users found for the requested data'
  }
  
  
  
  
  
  
  
  export type ApiResponse<D, E extends ResponseError>
    = SuccessResponse<D> | ErrorResponse<E>
  
  
  
  
  
  
  export function handleErrorResponse
  <E extends ResponseError>
  (ex: any)
  : ErrorResponse<E> | undefined {
    if (ex instanceof AxiosError && ex.response?.status===400) {
      return {
        isSuccess: false,
        error: ex.response.data as E
      } as ErrorResponse<E>
    }
  }
  
  export function handleAuthenticationErrorResponse
  (ex: any)
  : AuthenticationErrorResponse | undefined {
    if (ex instanceof AxiosError && ex.response?.status===401) {
      return getAuthenticationError(ex)
    }
  }
  
  export function handleConnectionError
  (ex: any)
  : ConnectionErrorResponse | undefined {
    if (ex instanceof AxiosError && ex.code===AxiosError.ERR_NETWORK){
      return getConnectionError()
    }
  }
  
  export function handleSuccessResponse
  <D = unknown>
  (response: AxiosResponse)
  : SuccessResponse<D> | undefined {
    if (response.status===200) return {
      isSuccess: true,
      data: response.data as D,
    } as SuccessResponse<D>
  }
  
  export async function handleResponse
  <D, E extends ResponseError>
  (responsePromise: Promise<AxiosResponse>)
  : Promise<ApiResponse<D, E | TechnicalError>> {
    try {
      const serverResponse = await responsePromise
      {
        const response = handleSuccessResponse<D>(serverResponse)
        if (response) return response
      }
      return getUnknownError(serverResponse)
    } catch (ex) {
      {
        const response = handleErrorResponse<E>(ex)
        if (response) return response
      }
      {
        const response = handleConnectionError(ex)
        if (response) return response
      }
      return getUnknownError(ex)
    }
  }
  
  export async function handleAuthenticatedResponse
  <D, E extends ResponseError>
  (responsePromise: Promise<AxiosResponse>)
  : Promise<ApiResponse<D, E | TechnicalError | AuthenticationError>> {
    try {
      const serverResponse = await responsePromise
      {
        const response = handleSuccessResponse<D>(serverResponse)
        if (response) return response
      }
      return getUnknownError(serverResponse)
    } catch (ex) {
      {
        const response = handleErrorResponse<E>(ex)
        if (response) return response
      }
      {
        const response = handleAuthenticationErrorResponse(ex)
        if (response) return response
      }
      {
        const response = handleConnectionError(ex)
        if (response) return response
      }
      return getUnknownError(ex)
    }
  }
  
  
  /* export async function handleAuthorizedResponse
  <D, E extends ResponseError>
  (responsePromise: Promise<AxiosResponse>){
    try {
      const response = await responsePromise
      return handleSuccessResponse<D>(response)
    } catch (ex) {
      return handleErrorResponse<E>(ex)
    }
  } */
  
  
  
  
  
  
  
}