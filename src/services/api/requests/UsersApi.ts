import { ApiResponseUtils } from '@mini-libs/api/ApiResponseUtils.ts'
import { UserStrangerA } from 'src/models/api/UserA.ts'
import { UserPairA } from 'src/models/api/UserPairA.ts'
import { AxiosConfig } from 'src/services/api/AxiosConfig.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import TechnicalError = ApiResponseUtils.TechnicalError
import handleResponse = ApiResponseUtils.handleResponse
import AuthenticationError = ApiResponseUtils.AuthenticationError
import ax = AxiosConfig.ax
import handleAuthenticatedResponse = ApiResponseUtils.handleAuthenticatedResponse
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
