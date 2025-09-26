import { ApiResponseUtils } from '@libs/api/ApiResponseUtils.ts'
import { UserToUserLikeA } from 'src/models/api/UserToUserLikeA.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { axAccess } from 'src/services/api/axiosConfig.ts'
import TechnicalError = ApiResponseUtils.TechnicalError
import handleAuthenticatedResponse = ApiResponseUtils.handleAuthenticatedResponse




export namespace UserToUserApi {
  
  
  
  
  export interface UserToUserLikeCreateSuccessData {
    userToUserLike: UserToUserLikeA
  }
  export type UserToUserLikeCreateErrorData = TechnicalError
  export type UserToUserLikeToCreate = {
    toUserId: string
  }
  export const like = async (user: UserToUserLikeToCreate) => (
    handleAuthenticatedResponse<UserToUserLikeCreateSuccessData, UserToUserLikeCreateErrorData>(
      axAccess.post(ApiV1Routes.userToUserLike, user)
    )
  )
  
  
  
}
