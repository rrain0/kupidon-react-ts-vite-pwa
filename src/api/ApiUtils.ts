import { AxiosError, AxiosResponse, isAxiosError } from 'axios'



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
    code: 'unknownError'
    msg: 'Unknown error'
    extra?: any
  }
  export interface UnknownErrorResponse extends ErrorResponse<UnknownError> { }
  export function getUnknownError(error?: any): UnknownErrorResponse {
    const unknown: UnknownErrorResponse = {
      isSuccess: false,
      error: {
        code: 'unknownError',
        msg: 'Unknown error',
      },
    }
    if (error !== undefined) unknown.error.extra = error
    console.warn('Unknown response error', unknown)
    return unknown
  }
  
  
  
  export interface ConnectionError extends ResponseError {
    code: 'connectionError'
    msg: 'Connection error'
  }
  export interface ConnectionErrorResponse extends ErrorResponse<ConnectionError> { }
  export function getConnectionError(): ConnectionErrorResponse {
    return {
      isSuccess: false,
      error: {
        code: 'connectionError',
        msg: 'Connection error',
      },
    }
  }
  
  
  
  export type TechnicalError = UnknownError | ConnectionError
  
  
  
  export interface AuthenticationError extends ResponseError {
    code: 'authenticationError'
    msg: 'Authentication error'
    extra?: any
  }
  export interface AuthenticationErrorResponse extends ErrorResponse<AuthenticationError> { }
  export function getAuthenticationError(error?: any): AuthenticationErrorResponse {
    const auth: AuthenticationErrorResponse = {
      isSuccess: false,
      error: {
        code: 'authenticationError',
        msg: 'Authentication error',
      },
    }
    if (error !== undefined) auth.error.extra = error
    console.warn('Authentication response error', auth)
    return auth
  }
  
  
  
  export interface NoUserResponseError extends ResponseError {
    code: 'NO_USER'
    msg: 'No users found for the requested data'
  }
  
  
  
  
  
  
  
  export type ApiResponse<D, E extends ResponseError> = SuccessResponse<D> | ErrorResponse<E>
  
  
  
  
  
  
  export function handle400ErrorResponse<E extends ResponseError>(
    ex: any
  ): ErrorResponse<E> | undefined {
    if (isAxiosError(ex) && ex.response?.status === 400) {
      return {
        isSuccess: false,
        error: ex.response.data as E,
      } as ErrorResponse<E>
    }
  }
  
  export function handle401AuthenticationErrorResponse(
    ex: any
  ): AuthenticationErrorResponse | undefined {
    if (isAxiosError(ex) && ex.response?.status === 401) {
      return getAuthenticationError(ex)
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
      return getConnectionError()
    }
  }
  
  
  
  
  
  export function handle200SuccessResponse<D = unknown>(
    response: AxiosResponse
  ): SuccessResponse<D> | undefined {
    if (response.status === 200) return {
      isSuccess: true,
      data: response.data as D,
    } as SuccessResponse<D>
  }
  
  
  
  
  
  export async function handleResponse<D, E extends ResponseError>(
    responsePromise: Promise<AxiosResponse>
  ): Promise<ApiResponse<D, E | TechnicalError>> {
    try {
      const serverResponse = await responsePromise
      {
        const response = handle200SuccessResponse<D>(serverResponse)
        if (response) return response
      }
      return getUnknownError(serverResponse)
    } catch (ex) {
      {
        const response = handle400ErrorResponse<E>(ex)
        if (response) return response
      }
      {
        const response = handleConnectionError(ex)
        if (response) return response
      }
      return getUnknownError(ex)
    }
  }
  
  export async function handleAuthenticatedResponse<D, E extends ResponseError>(
    responsePromise: Promise<AxiosResponse>
  ): Promise<ApiResponse<D, E | TechnicalError | AuthenticationError>> {
    try {
      const serverResponse = await responsePromise
      {
        const response = handle200SuccessResponse<D>(serverResponse)
        if (response) return response
      }
      return getUnknownError(serverResponse)
    } catch (ex) {
      {
        const response = handle400ErrorResponse<E>(ex)
        if (response) return response
      }
      {
        const response = handle401AuthenticationErrorResponse(ex)
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
