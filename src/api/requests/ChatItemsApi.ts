import { ApiUtils } from 'src/api/ApiUtils'
import { ChatMessageFromApi } from 'src/api/model/ChatMessageFromApi.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiV1Routes } from 'src/api/ApiV1Routes.ts'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace ChatItemsApi {
  
  
  export type ChatTypeFromApi = 'PERSONAL'
  export interface ChatItemProfileFromApi {
    id: string
    name: string
    ava: string
  }
  export interface ChatItemFromApi {
    id: string
    type: ChatTypeFromApi
    memberIds: string[]
    createdAt: string
    updatedAt: string
    profile: ChatItemProfileFromApi
    lastMessage: ChatMessageFromApi | null
  }
  
  export type ChatItemsSuccessData = {
    chatItems: ChatItemFromApi[]
  }
  export type ChatItemsErrorData = AuthenticationError | TechnicalError
  export const chatItems = async () => (
    handleAuthenticatedResponse<ChatItemsSuccessData, ChatItemsErrorData>(
      axAccess.get(ApiV1Routes.chatItems),
    )
  )
  
  
  
  
}
