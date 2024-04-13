

export namespace ApiRoutes {
  
  
  // todo move url to config
  const isLocal = true
  export const api = function(){
    const mode = import.meta.env.MODE
    if (mode==='development' && isLocal)
      return 'https://localhost:40018/api'
    
    if (mode==='development') return 'https://dev.kupidon.rrain.ydns.eu:50040/api'
    if (mode==='production') return 'https://dev.kupidon.rrain.ydns.eu:50040/api'
    return 'https://dev.kupidon.rrain.ydns.eu:50040/api'
  }()
  
  
  export const authRefresh = `${api}/auth/refresh`
  export const authLogin = `${api}/auth/login`
  
  
  export const userCurrent = `${api}/user/current`
  export const userCreate = `${api}/user/create`
  export const userUpdate = `${api}/user/update`
  export const addProfilePhoto = `${api}/user/profile-photo`
  
  
}