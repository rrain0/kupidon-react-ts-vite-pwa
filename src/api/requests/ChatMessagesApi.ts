import { TypeU } from '@util/common/TypeU.ts'
import { ApiUtils } from 'src/api/ApiUtils'
import { ChatMessageA } from 'src/model/api/ChatMessageA.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError
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
