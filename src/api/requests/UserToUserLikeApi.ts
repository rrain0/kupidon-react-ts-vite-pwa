import { ApiUtils } from 'src/api/ApiUtils'
import { OtherUser } from 'src/api/model/User.ts'
import { UserToUserLike } from 'src/api/model/UserToUserLike.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes } from 'src/api/ApiRoutes'
import ax = AxiosConfig.ax
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import axAccess = AxiosConfig.axAccess




export namespace UserToUserLikeApi {
  
  
  
  
  export interface UserToUserLikeCreateSuccessData {
    userToUserLike: UserToUserLike
  }
  export type UserToUserLikeCreateErrorData = TechnicalError
  export type UserToUserLikeToCreate = {
    toUserId: string
  }
  export const create = async (user: UserToUserLikeToCreate) => (
    handleAuthenticatedResponse<UserToUserLikeCreateSuccessData, UserToUserLikeCreateErrorData>(
      axAccess.post(ApiRoutes.userToUserLike, user)
    )
  )
  
  
  
  export interface UserToUserLikeListAllSuccessData {
    likedUsers: OtherUser[]
  }
  export type UserToUserLikeListAllErrorData = TechnicalError
  export const listAll = async () => (
    handleAuthenticatedResponse<UserToUserLikeListAllSuccessData, UserToUserLikeListAllErrorData>(
      axAccess.get(ApiRoutes.userToUserLikeListAll)
    )
  )
  
  
  
}
