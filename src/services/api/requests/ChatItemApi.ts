import {
  type AuthenticationError,
  handleAuthenticatedResponse,
} from '@libs/api/response/apiResponseAuth.ts'
import type { TechnicalError } from '@libs/api/response/apiResponseCore.ts'
import { ChatItemA } from 'src/models/api/ChatItemA.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { axAccess } from 'src/services/api/axios-config/axAccess.ts'




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
