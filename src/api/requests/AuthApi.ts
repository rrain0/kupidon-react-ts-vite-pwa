import { ApiUtils } from 'src/api/ApiUtils'
import { CurrentUser } from 'src/api/model/User.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import ax = AxiosConfig.ax
import handleResponse = ApiUtils.handleResponse
import NoUserResponseError = ApiUtils.NoUserResponseError
import TechnicalError = ApiUtils.TechnicalError



export namespace AuthApi {
  
  
  
  export type LoginSuccessData = {
    accessToken: string
    user: CurrentUser
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
  
  
  
}