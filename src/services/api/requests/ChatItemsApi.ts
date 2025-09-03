import { ApiResponseUtils } from '@mini-libs/api/ApiResponseUtils.ts'
import { ChatItemA } from 'src/models/api/ChatItemA.ts'
import { AxiosConfig } from 'src/services/api/AxiosConfig.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiResponseUtils.TechnicalError
import handleAuthenticatedResponse = ApiResponseUtils.handleAuthenticatedResponse
import AuthenticationError = ApiResponseUtils.AuthenticationError




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
