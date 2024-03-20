import Axios, {
  AxiosError, AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry'
import { ApiRoutes } from 'src/api/ApiRoutes'
import * as jose from 'jose'
import { getRecoil, setRecoil, resetRecoil, getRecoilPromise } from "recoil-nexus"
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import ValueOrMapper = TypeUtils.ValueOrMapper




export namespace AxiosConfig {
  
  
  export const commonAxiosRetryConfig: IAxiosRetryConfig = {
    retries: 2,
    retryDelay: (retryCount, error)=>500,
    // A callback to further control if a request should be retried.
    // By default, it retries if it is a network error
    // or a 5xx error on an idempotent request (GET, HEAD, OPTIONS, PUT or DELETE).
    /* retryCondition: error => {
     return error.response.status === 503;
     }, */
  }
  
  export const ax =  Axios.create({
    /* `validateStatus` defines whether to resolve or reject the promise for a given
     * HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
     * or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.
     */
    /*validateStatus: function (status) {
     return status >= 200 && status < 300; // default
     },*/
    baseURL: ApiRoutes.api,
    withCredentials: true,
  })
  axiosRetry(ax, commonAxiosRetryConfig)
  
  export const axAccess = Axios.create({
    baseURL: ApiRoutes.api,
    withCredentials: true,
  })
  axiosRetry(axAccess, commonAxiosRetryConfig)
  
  
  export type CustomConfigData = {
    
    state?: undefined // оригинальный запрос
      | 'refresh-request' // запрос на обновление токена
      | 'original-request-retry' // повторный оригинальный запрос после успешного обновления токена
    
    // конфиг оригинального запроса, чтобы сделать запрос снова после обновления токена
    originalRequestConfig?: undefined | InternalAxiosRequestConfig & CustomConfig
    
  }
  export type CustomConfig = {
    customData?: CustomConfigData
  }
  
  
  
  export interface ErrorResponse {
    status: 400|401
    data: {
      code: string
      msg: string
    }
  }
  
  // General Authentication Error
  export interface AccessRespE extends ErrorResponse {
    status: 401,
    data: {
      code: "NO_AUTHORIZATION_HEADER"
        |"AUTHORIZATION_HEADER_WRONG_FORMAT"
        |"EMPTY_TOKEN"
        |"TOKEN_ALGORITHM_MISMATCH"
        |"TOKEN_DAMAGED"
        |"TOKEN_MODIFIED"
        |"TOKEN_EXPIRED"
        |"UNKNOWN_VERIFICATION_ERROR"
      msg: string
    }
  }
  
  
  
  export type AuthRespData = {
    accessToken: string
  }
  
  
  // Success - токены успешно обновлены
  export interface RefreshTokenRespS extends AxiosResponse {
    status: 200,
    data: AuthRespData
  }
  // Error - Невалидные токены
  export interface RefreshTokenRespE extends ErrorResponse {
    status: 400,
    data: {
      code: "NO_REFRESH_TOKEN_COOKIE"
        |"TOKEN_ALGORITHM_MISMATCH"
        |"TOKEN_DAMAGED"
        |"TOKEN_MODIFIED"
        |"TOKEN_EXPIRED"
        |"UNKNOWN_VERIFICATION_ERROR"
      msg: string
    }
  }
  export const refreshToken =
  async(originalRequestConfig?: InternalAxiosRequestConfig)
  : Promise<RefreshTokenRespS> => {
    const configWithCustomData: AxiosRequestConfig & CustomConfig = {
      customData: {
        state: 'refresh-request',
        originalRequestConfig: originalRequestConfig,
      },
    }
    return axAccess.get(ApiRoutes.authRefresh, configWithCustomData)
  }
  
  
  export const rawTestRefreshToken = async () => {
    return Axios.get(ApiRoutes.authRefresh, {
      baseURL: ApiRoutes.api,
      withCredentials: true,
      headers: {
        Authorization: 'Bearer 1',
      }
    })
  }
  
  
  
  
  
  
  
  
  const removeAuthData = ()=>{
    //localStorage.removeItem('token')
    //reduxStore.dispatch(authSlice.actions.logout())
    //reduxStore.dispatch(userActions.setUser(null))
    resetRecoil(AuthRecoil)
  }
  const setAuthData = (valOrUpdater: ValueOrMapper<AuthStateType>) => {
    //localStorage.setItem('token', authData.accessJwt)
    //reduxStore.dispatch(refreshAccessToken({ access_token: accessToken }))
    setRecoil(AuthRecoil, valOrUpdater)
  }
  const getAuthData = ()=>{
    // return reduxStore.getState().authReducer.access_token
    return getRecoil(AuthRecoil)?.accessToken
  }
  
  
  
  
  /*
    Система перехватчиков, проверяющих и обновляющих токены пользователя.
    1) Если при оригинальном запросе возвращается 401, значит access token не валиден и его надо обновить
    1.1) Вместо того чтобы делать лишний запрос, токен проверяется (но не валидируется)
         на фронте на предмет того, что он устарел.
    2) При необходимости обновить токен, делается refresh запрос, в конфиге которого
       сохраняется конфиг оригинального запроса.
    2.1) При неудаче refresh запроса ошибка refresh запроса возвращается пользователю.
    3) При успешном refresh из его конфига достаётся конфиг оригинального запроса и
       повторяется запрос только с обновлённым токеном - его успех или неудача возвращаются пользователю.
   */
  
  const checkAccessToken = (
    accessToken: undefined|string,
    config: InternalAxiosRequestConfig<any>
  )=>{
    const conf = config as typeof config & CustomConfig
    let data: undefined | { code: string, msg: string }
    if (!accessToken){
      data = {
        code: 'NO_TOKEN',
        msg: 'Token is not present',
      }
    } else {
      try {
        const decodedAccess = jose.decodeJwt(accessToken)
        if (!decodedAccess.exp || Date.now() >= decodedAccess.exp*1000) {
          data = {
            code: 'EXPIRED_TOKEN',
            msg: 'Token is not present',
          }
        }
      } catch (e){
        console.log("some error")
        data = {
          code: 'TOKEN_DAMAGED',
          msg: 'Token is damaged - failed to decode JSON token data',
        }
      }
    }
    if (data){
      const d = {...data}
      // Адаптер, который генерирует ответ-ошибку без самого фактического запроса к серверу.
      // Он потом убирается в повторном запросе с обновлёнными токенами.
      config.adapter = function (config){
        const headers = new AxiosHeaders({ 'content-type': 'application/json; charset=utf-8' })
        return Promise.reject(new AxiosError(
          d.msg,
          "ERR_BAD_REQUEST",
          config,
          {},
          {
            status: 401,
            statusText: 'Unauthorized',
            headers,
            config: { headers },
            data: d
          }
        ))
      }
    }
  }

  
  // Перехватчик, добавляющий access token в каждый запрос.
  // Если перехватчик видит, что access-token уже устарел, он не делает реального запроса, а возвращает ответ сразу.
  axAccess.interceptors.request.use((config) => {
    const accessToken = getAuthData()
    
    switch ((config as typeof config & CustomConfig).customData?.state){
      case undefined:
        config.headers.Authorization = `Bearer ${accessToken}`
        checkAccessToken(accessToken,config)
        break
      case 'refresh-request':
        break
      case 'original-request-retry':
        delete config.adapter
        config.headers.Authorization = `Bearer ${accessToken}`
        break
    }
    
    return config;
  })



  axAccess.interceptors.response.use(
    
    // Перехватчик вытаскивает обновлённый access token и делает повторный запрос
    response => {
      const config = response.config as typeof response.config & CustomConfig

      if (config.customData?.state==='refresh-request'){
        const d = response.data as AuthRespData
        
        // Сохранение нового access token, refresh token автоматически сохраняется в куках
        setAuthData(s=>({ accessToken: d.accessToken, user: s!.user }))

        // Если был сохранённый оригинальный запрос, то повторяем его
        const orig = config.customData?.originalRequestConfig
        if (orig){
          orig.customData = {
            state: 'original-request-retry'
          }
          // Повторяем оригинальный запрос с обновлёнными токенами.
          // Access-token добавится в другом перехватчике. Refresh-token отправляется автоматически как кука.
          return axAccess.request(orig)
        }
      }
      
      return response
    },
    
    // Перехватчик ловит ошибку 401 при первом запросе и делает refresh запрос.
    // Так же он разлогинивает пользователя при ошибке refresh запроса.
    async (error: Error|AxiosError) => {
      if (Axios.isAxiosError(error) && error.config && error.response){
        
        // Ошибка соединения с сервером - не пробуем снова делать запрос
        // Просто прокидываем, чтобы показать пользователю, что ошибка соединения.
        if (error.code==='ERR_NETWORK') throw error
        
        // Берём конфиги оригинального запроса, чтобы после обновления токена повторить его
        const orig = error.config as typeof error.config & CustomConfig

        // Запускаем обновление токенов
        if (!orig.customData?.state && error.response.status===401) {
          // Попытка обновить токены
          // При ошибке на этот запрос, мы попадём в интерцептор ошибки, где она обработается
          
          // при успешном обновлении токена здесь будет возвращён
          // ответ повтороного оригинального запроса после обновлённого токена
          // Или будет проброшена ошибка обновления токена или ошибка повторного оригинального запроса
          return await refreshToken(orig)
        }
        // Случай, когда сервер отказался выдавать токены при запросе на их обновление
        else if (orig.customData?.state==='refresh-request'){
          // Разлогиниваемся
          if (error.response.status === 400){
            // если на запрос обновления токена получена ошибка, значит токены для обновления не валидны
            removeAuthData()
          }
          /*else {
            // какая-то другая ошибка - значит токены опять же не валидны
            console.log(`Непредвиденная ошибка обновления access token. status: ${error.response.status}`)
            removeAuthData()
          }*/
          throw error
        }
        
      }
      
      // Какая-то неизвестная ошибка.
      // Просто прокидываем пользователю, чтобы показать её.
      throw error
    }
  )
    
  
  
}


