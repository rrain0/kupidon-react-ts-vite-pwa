
import { ApiResponseUtils } from '@libs/api/ApiResponseUtils.ts'
import { ChatMessageA } from 'src/models/api/ChatMessageA.ts'
import { AxiosConfig } from 'src/services/api/AxiosConfig.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiResponseUtils.TechnicalError
import handleAuthenticatedResponse = ApiResponseUtils.handleAuthenticatedResponse
import AuthenticationError = ApiResponseUtils.AuthenticationError
import { Pu } from '@utils/base/math/typeUtils.ts'




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
