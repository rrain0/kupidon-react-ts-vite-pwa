import {
  type AuthenticationError,
  handleAuthenticatedResponse,
} from '@libs/api/response/apiResponseAuth.ts'
import type { TechnicalError } from '@libs/api/response/apiResponseCore.ts'
import { ChatItemA } from 'src/models/api/ChatItemA.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { axAccess } from 'src/services/api/axios-config/axAccess.ts'




export namespace ChatItemsApi {
  
  
  
  export type ChatItemsSuccessData = {
    chatItems: ChatItemA[]
  }
  export type ChatItemsErrorData = AuthenticationError | TechnicalError
  export const chatItems = async () => (
    handleAuthenticatedResponse<ChatItemsSuccessData, ChatItemsErrorData>(
      axAccess.get(ApiV1Routes.chatItems),
    )
  )
  
  
  
  export type ChatItemSuccessData = {
    chatItem: ChatItemA
  }
  export type ChatItemErrorData = AuthenticationError | TechnicalError
  export const chatItem = async (id: string) => (
    handleAuthenticatedResponse<ChatItemSuccessData, ChatItemErrorData>(
      axAccess.get(ApiV1Routes.chatItemId(id)),
    )
  )
  
  
  
}
