import { ApiUtils } from 'src/api/ApiUtils'
import { OtherUser, OtherUserShortFromApi } from 'src/api/model/User.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import TechnicalError = ApiUtils.TechnicalError
import handleResponse = ApiUtils.handleResponse
import AuthenticationError = ApiUtils.AuthenticationError
import ax = AxiosConfig.ax
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import axAccess = AxiosConfig.axAccess




export namespace UsersApi {
  
  
  
  export type UsersListAllSuccessData = {
    users: OtherUser[]
  }
  export type UsersListAllErrorData = AuthenticationError | TechnicalError
  export const get = async () => {
    return handleResponse<UsersListAllSuccessData, UsersListAllErrorData>(
      ax.get(ApiV1Routes.users)
    )
  }
  
  
  
  export interface UserPairFromApi {
    fromUserId: string
    toUserId: string
    createdAt: string
    toUser: OtherUserShortFromApi,
  }
  
  export interface UsersNewPairsSuccessData {
    newPairs: UserPairFromApi[]
  }
  export type UsersNewPairsErrorData = TechnicalError
  export const newPairs = async () => (
    handleAuthenticatedResponse<UsersNewPairsSuccessData, UsersNewPairsErrorData>(
      axAccess.get(ApiV1Routes.usersNewPairs)
    )
  )
  
  
  
}
