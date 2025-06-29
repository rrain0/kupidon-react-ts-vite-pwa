import { Env } from '@util/app/Env.ts'



export namespace ApiV1Routes {
  export const backend = Env.backendBaseUrl
  export const apiV1 = `${backend}/api/v1`
  
  export const auth = `${apiV1}/auth`
  export const authRefreshTokens = `${auth}/refresh-tokens`
  export const authLogin = `${auth}/login`
  
  export const user = `${apiV1}/user`
  export const userCurrent = `${user}/current`
  export const userIdId = (id: string) => `${user}/id/${id}`
  export const userProfilePhoto = `${user}/profile-photo`
  
  export const users = `${apiV1}/users`
  export const usersNewPairs = `${users}/new-pairs`
  
  export const userToUser = `${apiV1}/user-to-user`
  export const userToUserLike = `${userToUser}/like`
  
  export const chatItem = (id: string) => `${apiV1}/chat-item/id/${id}`
  
  export const chatItems = `${apiV1}/chat-items`
  
  export const chatMessage = `${apiV1}/chat-message`
  export const chatMessageToUserIdId = (toUserId: string) => `${chatMessage}/to-user-id/${toUserId}`
  export const chatMessageToChatIdId = (toChatId: string) => `${chatMessage}/to-chat-id/${toChatId}`
  
  export const chatMessages = `${apiV1}/chat-messages`
}
