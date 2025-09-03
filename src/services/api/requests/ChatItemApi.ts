import { ApiResponseUtils } from '@mini-libs/api/ApiResponseUtils.ts'
import { ChatItemA } from 'src/models/api/ChatItemA.ts'
import { AxiosConfig } from 'src/services/api/AxiosConfig.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiResponseUtils.TechnicalError
import handleAuthenticatedResponse = ApiResponseUtils.handleAuthenticatedResponse
import AuthenticationError = ApiResponseUtils.AuthenticationError




export namespace ChatItemApi {
  
  
  
  export type ChatItemIdSuccessData = {
    chatItem: ChatItemA
  }
  export type ChatItemIdErrorData = AuthenticationError | TechnicalError
  export const id = async (id: string) => (
    handleAuthenticatedResponse<ChatItemIdSuccessData, ChatItemIdErrorData>(
      axAccess.get(ApiV1Routes.chatItemId(id)),
    )
  )
  
  
  
  export type ChatItemToUserIdSuccessData = {
    chatItem: ChatItemA
  }
  export type ChatItemToUserIdErrorData = AuthenticationError | TechnicalError
  export const toUserId = async (toUserId: string) => (
    handleAuthenticatedResponse<ChatItemToUserIdSuccessData, ChatItemToUserIdErrorData>(
      axAccess.get(ApiV1Routes.chatItemToUserId(toUserId)),
    )
  )
  
  
  
}
