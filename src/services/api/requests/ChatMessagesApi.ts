import {
  type AuthenticationError,
  handleAuthenticatedResponse,
} from '@libs/api/response/apiResponseAuth.ts'
import type { TechnicalError } from '@libs/api/response/apiResponseCore.ts'
import { ChatMessageA } from 'src/models/api/ChatMessageA.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { Pu } from '@utils/base/tsUtils.ts'
import { axAccess } from 'src/services/api/axios-config/axAccess.ts'




export namespace ChatMessagesApi {
  
  
  export type ChatMessagesSuccessData = {
    messages: ChatMessageA[]
  }
  export type ChatMessagesErrorData = AuthenticationError | TechnicalError
  export const messages = async (data: Pu<{ toUserId: string, toChatId: string }>) => (
    handleAuthenticatedResponse<ChatMessagesSuccessData, ChatMessagesErrorData>(
      axAccess.get(ApiV1Routes.chatMessages, { params: data }),
    )
  )
  
  
  
  
}
