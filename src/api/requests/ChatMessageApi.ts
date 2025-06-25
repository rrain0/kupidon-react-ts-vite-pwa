import { ApiUtils } from 'src/api/ApiUtils'
import { ChatMessageFromApi } from 'src/api/model/ChatMessageFromApi.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace ChatMessageApi {
  
  
  export type CreateMessageToUserSuccessData = {
    //chat: // TODO
    message: ChatMessageFromApi
  }
  export type CreateMessageToUserErrorData = AuthenticationError | TechnicalError
  export const createMessageToUser = async (toUserId: string, data: { content: { text: string } }) => {
    return handleAuthenticatedResponse<CreateMessageToUserSuccessData, CreateMessageToUserErrorData>(
      axAccess.post(ApiV1Routes.chatMessageToUserIdId(toUserId), data)
    )
  }
  
  
  export type CreateMessageToChatSuccessData = {
    message: ChatMessageFromApi
  }
  export type CreateMessageToChatErrorData = AuthenticationError | TechnicalError
  export const createMessageToChat = async (toChatId: string, data: { content: { text: string } }) => {
    return handleAuthenticatedResponse<CreateMessageToChatSuccessData, CreateMessageToChatErrorData>(
      axAccess.post(ApiV1Routes.chatMessageToChatIdId(toChatId), data)
    )
  }
  
  
  
  
}
