import { ApiUtils } from 'src/api/ApiUtils'
import { OtherUser } from 'src/api/model/User.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes } from 'src/api/ApiRoutes'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleResponse = ApiUtils.handleResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace UsersListApi {
  
  
  
  export type UsersListAllSuccessData = {
    items: OtherUser[]
  }
  export type UsersListAllErrorData = AuthenticationError | TechnicalError
  export const all = async () => {
    return handleResponse<UsersListAllSuccessData, UsersListAllErrorData>(
      axAccess.get(ApiRoutes.usersListAll)
    )
  }
  
  
  
}
