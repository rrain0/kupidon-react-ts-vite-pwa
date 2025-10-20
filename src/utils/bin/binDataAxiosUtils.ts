import Axios, { CreateAxiosDefaults } from 'axios'
import axiosRetry from 'axios-retry'
import {
  axiosCommonConfig,
  axiosRetryCommonConfig,
} from 'src/services/api/axios-config/axiosCommonConfig.ts'
import { type Cb1, isdef } from 'src/utils/base/tsUtils.ts'



export async function axiosToBlob(
  url: string, { onProgress, abortCtrl }: {
    onProgress?: Cb1<number | undefined> | undefined,
    abortCtrl?: AbortController | undefined,
  } = {},
): Promise<Blob> {
  const config: CreateAxiosDefaults = {
    ...axiosCommonConfig,
    responseType: 'blob',
    onDownloadProgress: progressEvent => {
      const p = progressEvent.progress
      onProgress?.(isdef(p) ? p * 100 : p)
    },
  }
  
  // Вроде аксиос должен сам проверить, отменено ли оно уже перед началом операции.
  if (abortCtrl) config.signal = abortCtrl.signal
  
  const ax = Axios.create(config)
  axiosRetry(ax, axiosRetryCommonConfig)
  
  const response = await ax.get<Blob>(url)
  return response.data
}

