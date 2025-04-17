import { ApiUtils } from 'src/api/ApiUtils'
import { CurrentUser } from 'src/api/model/CurrentUser'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes } from 'src/api/ApiRoutes'
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
      ax.post(ApiRoutes.authLogin, loginPwd)
    )
  }
  
  
  
}