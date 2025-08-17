import { TypeU } from '@util/common/TypeU.ts'
import { ApiResponseUtils } from '@mini-libs/api/ApiResponseUtils.ts'
import { ChatMessageA } from 'src/model/api/ChatMessageA.ts'
import { AxiosConfig } from '../AxiosConfig.ts'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiResponseUtils.TechnicalError
import handleAuthenticatedResponse = ApiResponseUtils.handleAuthenticatedResponse
import AuthenticationError = ApiResponseUtils.AuthenticationError
import Pu = TypeU.Pu




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
