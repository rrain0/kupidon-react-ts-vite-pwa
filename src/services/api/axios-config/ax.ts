import Axios from 'axios'
import axiosRetry from 'axios-retry'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import {
  axiosCommonConfig,
  axiosRetryCommonConfig,
} from 'src/services/api/axios-config/axiosCommonConfig.ts'



export const ax = Axios.create({
  ...axiosCommonConfig,
  /* `validateStatus` defines whether to resolve or reject the promise for a given
   * HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
   * or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.
   */
  /*
   validateStatus: function (status) {
   // default
   return status >= 200 && status < 300
   },
   */
  baseURL: ApiV1Routes.apiV1,
  withCredentials: true,
})
axiosRetry(ax, axiosRetryCommonConfig)
