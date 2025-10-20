import {
  type AuthenticationError,
  handleAuthenticatedResponse,
} from '@libs/api/response/apiResponseAuth.ts'
import type { TechnicalError } from '@libs/api/response/apiResponseCore.ts'
import { ChatA } from 'src/models/api/ChatA.ts'
import { ChatMessageA } from 'src/models/api/ChatMessageA.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { axAccess } from 'src/services/api/axios-config/axAccess.ts'




export namespace ChatMessageApi {
  
  
  export type CreateMessageToUserSuccessData = {
    chat: ChatA
    message: ChatMessageA
  }
  export type CreateMessageToUserErrorData = AuthenticationError | TechnicalError
  export const createMessageToUser = async (toUserId: string, data: { content: { text: string } }) => {
    return handleAuthenticatedResponse<CreateMessageToUserSuccessData, CreateMessageToUserErrorData>(
      axAccess.post(ApiV1Routes.chatMessageToUserIdId(toUserId), data)
    )
  }
  
  
  export type CreateMessageToChatSuccessData = {
    message: ChatMessageA
  }
  export type CreateMessageToChatErrorData = AuthenticationError | TechnicalError
  export const createMessageToChat = async (toChatId: string, data: { content: { text: string } }) => {
    return handleAuthenticatedResponse<CreateMessageToChatSuccessData, CreateMessageToChatErrorData>(
      axAccess.post(ApiV1Routes.chatMessageToChatIdId(toChatId), data)
    )
  }
  
  
  
  
}
