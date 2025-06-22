import { ApiUtils } from 'src/api/ApiUtils'
import { ChatMessageT } from 'src/api/model/ChatMessageT.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace ChatMessagesApi {
  
  
  export type ChatMessagesSuccessData = {
    messages: ChatMessageT[]
  }
  export type ChatMessagesErrorData = AuthenticationError | TechnicalError
  export const messages = async (data: { toUserId: string }) => (
    handleAuthenticatedResponse<ChatMessagesSuccessData, ChatMessagesErrorData>(
      axAccess.get(ApiV1Routes.chatMessages, { params: { toUserId: data.toUserId } }),
    )
  )
  
  
  
  
}
