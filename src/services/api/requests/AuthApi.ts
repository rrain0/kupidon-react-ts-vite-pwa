import { handleResponse } from '@libs/api/response/apiResponse.ts'
import type { NoUserResponseError } from '@libs/api/response/apiResponseCommon.ts'
import type { TechnicalError } from '@libs/api/response/apiResponseCore.ts'
import { UserCurrentA } from 'src/models/api/UserA.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { ax } from 'src/services/api/axios-config/ax.ts'



export namespace AuthApi {
  
  
  
  export type LoginSuccessData = {
    accessToken: string
    user: UserCurrentA
  }
  export type LoginErrorData = NoUserResponseError | TechnicalError
  export type LoginPwd = {
    login: string
    pwd: string
  }
  export const login = async(loginPwd: LoginPwd) => {
    return handleResponse<LoginSuccessData, LoginErrorData>(
      ax.post(ApiV1Routes.authLogin, loginPwd)
    )
  }
  
  
  
  export const loginTestUser = async() => {
    return handleResponse<LoginSuccessData, LoginErrorData>(
      ax.post(ApiV1Routes.authLoginTestUser)
    )
  }
  
  
  
}