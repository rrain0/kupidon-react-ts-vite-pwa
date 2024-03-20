import Axios from 'axios'
import axiosRetry from 'axios-retry'
import { CreateAxiosDefaults } from 'axios/index'
import { AxiosConfig } from 'src/api/AxiosConfig'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import CallbackParam = TypeUtils.Callback1
import exists = TypeUtils.exists




export namespace FileUtils {
  
  
  
  export const blobToDataUrl =
  async (
    file: Blob,
    options?: {
      onProgress?: CallbackParam<number|null>
      abortCtrl?: AbortController
    }
  ): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onprogress = ev=>{
      options?.onProgress?.(ev.lengthComputable ? ev.loaded / ev.total : null)
    }
    reader.onload = ev=>resolve(ev.target?.result as string)
    reader.onerror = ev=>reject(ev)
    reader.onabort = ev=>reject(ev)
    
    const ctrl = options?.abortCtrl
    if (ctrl) {
      if (ctrl.signal.aborted){
        reject(ctrl.signal.reason)
        return
      }
      ctrl.signal.onabort = reader.abort
    }
    
    //reader.readAsArrayBuffer(file)
    reader.readAsDataURL(file)
  })
  
  
  /*
  export const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    return blob
  }
   */
  
  
  export const fetchToBlob =
  async (
    url: string,
    options?: {
      onProgress?: CallbackParam<number|null>
      abortCtrl?: AbortController
    }
  ): Promise<Blob> => {
    const config: CreateAxiosDefaults = {
      responseType: 'blob',
      onDownloadProgress: progressEvent => {
        const p = progressEvent.progress
        options?.onProgress?.( exists(p) ? p*100 : null )
      },
    }
    const ctrl = options?.abortCtrl
    if (ctrl) config.signal = ctrl.signal
    
    const ax = Axios.create(config)
    axiosRetry(ax, AxiosConfig.commonAxiosRetryConfig)
    
    const response = await ax.get<Blob>(url)
    return response.data
  }
  
  
  
  export const trimExtension = (fileName: string) =>
    fileName.replace(/\.[^.]*$/,'')
  
  
  
  export const extensionFromMimeType = (mimeType: string) =>
    mimeType.match(/^[^/]+\/(?<ext>[^/]+)$/)?.groups?.['ext'] ?? ''
  
  
  
  
}