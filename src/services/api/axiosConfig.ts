import Axios, {
  AxiosError, AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse, CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { getAccessTokenData } from 'src/models/api/AccessTokenA.ts'
import { AuthZustand, useAuthZustand } from 'src/zustand/auth/authZustand.ts'
import { ValueOrMapper } from '@utils/base/tsUtils.ts'



export const axiosCommonConfig: CreateAxiosDefaults = {
  // Disable use of indexes of array url params
  paramsSerializer: { indexes: null },
}
export const axiosRetryCommonConfig: IAxiosRetryConfig = {
  retries: 2,
  retryDelay: (retryCnt, error) => 500,
  // A callback to further control if a request should be retried.
  // By default, it retries if it is a network error
  // or a 5xx error on an idempotent request (GET, HEAD, OPTIONS, PUT or DELETE).
  // retryCondition: error => {
  //   return error.response?.status === 503
  // },
}



export const ax = Axios.create({ ...axiosCommonConfig,
  /* `validateStatus` defines whether to resolve or reject the promise for a given
   * HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
   * or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.
   */
  /*validateStatus: function (status) {
   return status >= 200 && status < 300; // default
   },*/
  baseURL: ApiV1Routes.apiV1,
  withCredentials: true,
})
axiosRetry(ax, axiosRetryCommonConfig)



export const axAccess = Axios.create({ ...axiosCommonConfig,
  baseURL: ApiV1Routes.apiV1,
  withCredentials: true,
})
axiosRetry(axAccess, axiosRetryCommonConfig)



type CustomConfigData = {
  
  state?: undefined // оригинальный запрос
    | 'refresh-request' // запрос на обновление токена
    | 'original-request-retry' // повторный оригинальный запрос после успешного обновления токена
  
  // конфиг оригинального запроса, чтобы сделать запрос снова после обновления токена
  originalRequestConfig?: undefined | InternalAxiosRequestConfig & CustomConfig
  
}
type CustomConfig = {
  customData?: CustomConfigData
}

interface ErrorResponse {
  status: 400 | 401
  data: {
    code: string
    msg: string
  }
}
// General Authentication Error
interface AccessRespE extends ErrorResponse {
  status: 401,
  data: {
    code:
      | 'NO_AUTHORIZATION_HEADER'
      | 'AUTHORIZATION_HEADER_WRONG_FORMAT'
      | 'EMPTY_TOKEN'
      | 'TOKEN_ALGORITHM_MISMATCH'
      | 'TOKEN_DAMAGED'
      | 'TOKEN_MODIFIED'
      | 'TOKEN_EXPIRED'
      | 'UNKNOWN_VERIFICATION_ERROR'
    msg: string
  }
}
type AuthRespData = {
  accessToken: string
}
// Success - токены успешно обновлены
interface RefreshTokenRespS extends AxiosResponse {
  status: 200,
  data: AuthRespData
}
// Error - Невалидные токены
interface RefreshTokenRespE extends ErrorResponse {
  status: 400,
  data: {
    code:
      | 'NO_REFRESH_TOKEN_COOKIE'
      | 'TOKEN_ALGORITHM_MISMATCH'
      | 'TOKEN_DAMAGED'
      | 'TOKEN_MODIFIED'
      | 'TOKEN_EXPIRED'
      | 'UNKNOWN_VERIFICATION_ERROR'
    msg: string
  }
}



const refreshToken = async (
  originalRequestConfig?: InternalAxiosRequestConfig
): Promise<RefreshTokenRespS> => {
  const configWithCustomData: AxiosRequestConfig & CustomConfig = {
    customData: {
      state: 'refresh-request',
      originalRequestConfig: originalRequestConfig,
    },
  }
  return axAccess.get(ApiV1Routes.authRefreshTokens, configWithCustomData)
}



const refreshTokenRawTest = async () => {
  return Axios.get(ApiV1Routes.authRefreshTokens, {
    baseURL: ApiV1Routes.apiV1,
    withCredentials: true,
    headers: {
      Authorization: 'Bearer 1',
    },
  })
}



const getAuthData = () => {
  return useAuthZustand.getState().accessToken
}
const setAuthData = (valOrUpdater: ValueOrMapper<AuthZustand>) => {
  useAuthZustand.setState(valOrUpdater)
}
const removeAuthData = () => {
  useAuthZustand.getState().logout()
}



/*
 Система перехватчиков, проверяющих и обновляющих токены пользователя.
 1) Если при оригинальном запросе возвращается 401,
 значит access token не валиден и его надо обновить
 1.1) Вместо того чтобы делать лишний запрос, токен проверяется (но не валидируется)
 на фронте на предмет того, что он устарел.
 2) При необходимости обновить токен, делается refresh запрос, в конфиге которого
 сохраняется конфиг оригинального запроса.
 2.1) При неудаче refresh запроса ошибка refresh запроса возвращается пользователю.
 3) При успешном refresh из его конфига достаётся конфиг оригинального запроса и
 повторяется запрос только с обновлённым токеном - его успех или неудача
 возвращаются пользователю.
 */

const checkAccessToken = (
  accessToken: undefined|string,
  config: InternalAxiosRequestConfig<any>
) => {
  const conf = config as typeof config & CustomConfig
  let data: undefined | { code: string, msg: string }
  if (!accessToken) {
    data = {
      code: 'NO_TOKEN',
      msg: 'Token is not present',
    }
  } else {
    try {
      if (getAccessTokenData(accessToken).isExpired) {
        data = {
          code: 'EXPIRED_TOKEN',
          msg: 'Token has expired',
        }
      }
    }
    catch (e) {
      console.log('some error')
      data = {
        code: 'TOKEN_DAMAGED',
        msg: 'Token is damaged - failed to decode JSON token data',
      }
    }
  }
  if (data) {
    const d = { ...data }
    // Адаптер, который генерирует ответ-ошибку без самого фактического запроса к серверу.
    // Он потом убирается в повторном запросе с обновлёнными токенами.
    config.adapter = function (config) {
      const headers = new AxiosHeaders({ 'content-type': 'application/json; charset=utf-8' })
      return Promise.reject(new AxiosError(
        d.msg,
        'ERR_BAD_REQUEST',
        config,
        { },
        {
          status: 401,
          statusText: 'Unauthorized',
          headers,
          config: { headers },
          data: d,
        }
      ))
    }
  }
}


// Перехватчик, добавляющий access token в каждый запрос.
// Если перехватчик видит, что access-token уже устарел, он не делает реального запроса, а возвращает ответ сразу.
axAccess.interceptors.request.use((config) => {
  const accessToken = getAuthData()
  
  const state = (config as typeof config & CustomConfig).customData?.state
  if (state === undefined) {
    config.headers.Authorization = `Bearer ${accessToken}`
    checkAccessToken(accessToken, config)
  }
  else if (state === 'refresh-request') { }
  else if (state === 'original-request-retry') {
    delete config.adapter
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  
  return config
})



axAccess.interceptors.response.use(
  
  // Перехватчик вытаскивает обновлённый access token и делает повторный запрос
  response => {
    const config = response.config as typeof response.config & CustomConfig
    const { state, originalRequestConfig } = config.customData ?? { }
    
    if (state === 'refresh-request') {
      const d = response.data as AuthRespData
      
      // Сохранение нового access token, refresh token автоматически сохраняется в куках
      setAuthData(s => ({ ...s, accessToken: d.accessToken }))
      
      // Если был сохранённый оригинальный запрос, то повторяем его
      const orig = originalRequestConfig
      if (orig) {
        orig.customData = {
          state: 'original-request-retry',
        }
        // Повторяем оригинальный запрос с обновлёнными токенами.
        // Access-token добавится в другом перехватчике.
        // Refresh-token отправляется автоматически как кука.
        return axAccess.request(orig)
      }
    }
    
    return response
  },
  
  // Перехватчик ловит ошибку 401 при первом запросе и делает refresh запрос.
  // Так же он разлогинивает пользователя при ошибке refresh запроса.
  async (error: unknown) => {
    if (Axios.isAxiosError(error) && error.config && error.response) {
      
      // Ошибка соединения с сервером - не пробуем снова делать запрос
      // Просто прокидываем, чтобы показать пользователю, что ошибка соединения.
      if (error.code === 'ERR_NETWORK') throw error
      
      // Берём конфиги оригинального запроса, чтобы после обновления токена повторить его
      const origConf = error.config as typeof error.config & CustomConfig
      const { state } = origConf.customData ?? { }
      
      // Запускаем обновление токенов
      if (!state && error.response.status === 401) {
        // Попытка обновить токены.
        // При ошибке на этот запрос, мы попадём в интерцептор ошибки, где она обработается.
        
        // При успешном обновлении токена здесь будет возвращён
        // ответ повтороного оригинального запроса после обновлённого токена.
        // Или будет проброшена ошибка обновления токена
        // или ошибка повторного оригинального запроса.
        return await refreshToken(origConf)
      }
      // Случай, когда сервер отказался выдавать токены при запросе на их обновление.
      else if (state === 'refresh-request') {
        // Разлогиниваемся
        if (error.response.status === 400) {
          // Если на запрос обновления токена получена ошибка,
          // значит токены для обновления не валидны.
          removeAuthData()
        }
        /*
        else {
          // Какая-то другая ошибка - значит токены опять же не валидны.
          console.log(
            `Непредвиденная ошибка обновления access token. status: ${error.response.status}`
          )
          removeAuthData()
        }
         */
        throw error
      }
      
    }
    
    // Какая-то неизвестная ошибка.
    // Просто прокидываем пользователю, чтобы показать её.
    throw error
  }
)



