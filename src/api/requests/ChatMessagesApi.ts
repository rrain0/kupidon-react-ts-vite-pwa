import { ApiUtils } from 'src/api/ApiUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace ChatMessagesApi {
  
  
  export type MessagesSuccessData = {
    messages: {
      id: string
      chatId: string
      fromUserId: string
      createdAt: string
      updatedAt: string
      content: { text: string }
    }[]
  }
  export type MessagesErrorData = AuthenticationError | TechnicalError
  export const messages = async (data: { toUserId: string }) => {
    return handleAuthenticatedResponse<MessagesSuccessData, MessagesErrorData>(
      axAccess.get(ApiV1Routes.chatMessages, { params: { toUserId: data.toUserId } }),
    )
  }
  
  
  
  
}
