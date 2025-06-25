import { ApiUtils } from 'src/api/ApiUtils'
import { ChatMessageFromApi } from 'src/api/model/ChatMessageFromApi.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace ChatMessageApi {
  
  
  export type CreateMessageSuccessData = {
    message: ChatMessageFromApi
  }
  export type CreateMessageErrorData = AuthenticationError | TechnicalError
  export const createMessageToUser = async (toUserId: string, data: { content: { text: string } }) => {
    return handleAuthenticatedResponse<CreateMessageSuccessData, CreateMessageErrorData>(
      axAccess.post(ApiV1Routes.chatMessageToUserIdId(toUserId), data)
    )
  }
  
  
  
  
}
