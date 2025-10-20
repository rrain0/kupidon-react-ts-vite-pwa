import { handleResponse } from '@libs/api/response/apiResponse.ts'
import {
  type AuthenticationError,
  handleAuthenticatedResponse,
} from '@libs/api/response/apiResponseAuth.ts'
import type { TechnicalError } from '@libs/api/response/apiResponseCore.ts'
import { UserStrangerA } from 'src/models/api/UserA.ts'
import { UserPairA } from 'src/models/api/UserPairA.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { ax } from 'src/services/api/axios-config/ax.ts'
import { axAccess } from 'src/services/api/axios-config/axAccess.ts'




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
