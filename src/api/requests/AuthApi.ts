import { ApiResponseUtils } from '@mini-libs/api/ApiResponseUtils.ts'
import { UserCurrentA } from 'src/model/api/UserA.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import ax = AxiosConfig.ax
import handleResponse = ApiResponseUtils.handleResponse
import NoUserResponseError = ApiResponseUtils.NoUserResponseError
import TechnicalError = ApiResponseUtils.TechnicalError



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