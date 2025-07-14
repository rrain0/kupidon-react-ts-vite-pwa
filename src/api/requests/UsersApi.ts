import { ApiUtils } from 'src/api/ApiUtils'
import { UserStrangerA } from 'src/model/api/UserA.ts'
import { UserPairA } from 'src/model/api/UserPairA.ts'
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
    users: UserStrangerA[]
  }
  export type UsersListAllErrorData = AuthenticationError | TechnicalError
  export const get = async () => {
    return handleResponse<UsersListAllSuccessData, UsersListAllErrorData>(
      ax.get(ApiV1Routes.users)
    )
  }
  
  
  
  
  export interface UsersNewPairsSuccessData {
    newPairs: UserPairA[]
  }
  export type UsersNewPairsErrorData = TechnicalError
  export const newPairs = async () => (
    handleAuthenticatedResponse<UsersNewPairsSuccessData, UsersNewPairsErrorData>(
      axAccess.get(ApiV1Routes.usersNewPairs)
    )
  )
  
  
  
}
