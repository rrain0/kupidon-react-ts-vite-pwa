import { ApiResponseUtils } from '@mini-libs/api/ApiResponseUtils.ts'
import { UserToUserLikeA } from 'src/model/api/UserToUserLikeA.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import TechnicalError = ApiResponseUtils.TechnicalError
import handleAuthenticatedResponse = ApiResponseUtils.handleAuthenticatedResponse
import axAccess = AxiosConfig.axAccess




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
