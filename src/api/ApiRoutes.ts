import { Env } from '@util/app/Env.ts'



export namespace ApiRoutes {
  export const backend = Env.backendBaseUrl
  export const apiV1 = `${backend}/api/v1`
  
  export const auth = `${apiV1}/auth`
  export const user = `${apiV1}/user`
  
  
  
  export const authRefresh = `${auth}/refresh`
  export const authLogin = `${auth}/login`
  
  
  
  export const userCurrent = `${user}/current`
  export const userCreate = `${user}/create`
  export const userUpdate = `${user}/update`
  export const userPostProfilePhoto = `${user}/profile-photo`
  
  
  
  export const usersListAll = `${apiV1}/users-list/all`
}
