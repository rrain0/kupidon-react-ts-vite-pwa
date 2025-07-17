import { ApiUtils } from 'src/api/ApiUtils'
import { ChatItemA } from 'src/model/api/ChatItemA.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace ChatItemsApi {
  
  
  
  export type ChatItemsSuccessData = {
    chatItems: ChatItemA[]
  }
  export type ChatItemsErrorData = AuthenticationError | TechnicalError
  export const chatItems = async () => (
    handleAuthenticatedResponse<ChatItemsSuccessData, ChatItemsErrorData>(
      axAccess.get(ApiV1Routes.chatItems),
    )
  )
  
  
  
  export type ChatItemSuccessData = {
    chatItem: ChatItemA
  }
  export type ChatItemErrorData = AuthenticationError | TechnicalError
  export const chatItem = async (id: string) => (
    handleAuthenticatedResponse<ChatItemSuccessData, ChatItemErrorData>(
      axAccess.get(ApiV1Routes.chatItemId(id)),
    )
  )
  
  
  
}
