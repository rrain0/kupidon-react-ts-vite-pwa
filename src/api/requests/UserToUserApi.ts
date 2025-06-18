import { ApiUtils } from 'src/api/ApiUtils'
import { OtherUser } from 'src/api/model/User.ts'
import { UserToUserLike } from 'src/api/model/UserToUserLike.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import axAccess = AxiosConfig.axAccess




export namespace UserToUserApi {
  
  
  
  
  export interface UserToUserLikeCreateSuccessData {
    userToUserLike: UserToUserLike
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
