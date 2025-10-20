import { type AxiosResponse, isAxiosError } from 'axios'
import { isdef } from 'src/utils/base/tsUtils.ts'
import {
  handle2xxSuccessResponse,
  handle4xxErrorResponse, handleConnectionError,
} from 'src/utils/libs/api/response/apiResponse.ts'
import {
  type ApiResponse,
  type ErrorResponse, newUnknownError,
  type ResponseError, type TechnicalError,
} from 'src/utils/libs/api/response/apiResponseCore.ts'



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



export function handle401AuthenticationErrorResponse(
  ex: any
): AuthenticationErrorResponse | undefined {
  if (isAxiosError(ex) && ex.response?.status === 401) {
    return newAuthenticationError(ex)
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