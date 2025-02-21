


export namespace ApiRoutes {
  
  export const backend = import.meta.env.BACKEND_BASE_URL
  export const apiV1 = `${backend}/api/v1`
  
  //console.log('api:', api)
  
  
  export const authRefresh = `${apiV1}/auth/refresh`
  export const authLogin = `${apiV1}/auth/login`
  
  
  export const userCurrent = `${apiV1}/user/current`
  export const userCreate = `${apiV1}/user/create`
  export const userUpdate = `${apiV1}/user/update`
  export const addProfilePhoto = `${apiV1}/user/profile-photo`
  
}
