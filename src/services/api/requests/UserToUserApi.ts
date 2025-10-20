import { handleAuthenticatedResponse } from '@libs/api/response/apiResponseAuth.ts'
import type { TechnicalError } from '@libs/api/response/apiResponseCore.ts'
import { UserToUserLikeA } from 'src/models/api/UserToUserLikeA.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { axAccess } from 'src/services/api/axios-config/axAccess.ts'




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
