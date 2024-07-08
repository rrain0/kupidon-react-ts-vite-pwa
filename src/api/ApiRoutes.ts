


export namespace ApiRoutes {
  
  
  export const api = import.meta.env.API_BASE_URL as string
  
  //console.log('api:', api)
  
  
  export const authRefresh = `${api}/auth/refresh`
  export const authLogin = `${api}/auth/login`
  
  
  export const userCurrent = `${api}/user/current`
  export const userCreate = `${api}/user/create`
  export const userUpdate = `${api}/user/update`
  export const addProfilePhoto = `${api}/user/profile-photo`
  
  
}
