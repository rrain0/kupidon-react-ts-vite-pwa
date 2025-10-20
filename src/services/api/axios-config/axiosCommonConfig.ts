import type { CreateAxiosDefaults } from 'axios'
import type { IAxiosRetryConfig } from 'axios-retry'



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