import { ApiUtils } from 'src/api/ApiUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace ChatMessageApi {
  
  
  export type CreateMessageSuccessData = {
    messages: {
      id: string
      chatId: string
      fromUserId: string
      createdAt: string
      updatedAt: string
      content: { text: string }
    }
  }
  export type CreateMessageErrorData = AuthenticationError | TechnicalError
  export const createMessage = async (data: { toUserId: string, content: { text: string } }) => {
    return handleAuthenticatedResponse<CreateMessageSuccessData, CreateMessageErrorData>(
      axAccess.post(ApiV1Routes.chatMessage, data)
    )
  }
  
  
  
  
}
