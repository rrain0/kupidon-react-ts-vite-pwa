import Axios, { CreateAxiosDefaults } from 'axios'
import axiosRetry from 'axios-retry'
import mime from 'mime'
import { AxiosConfig } from 'src/api/AxiosConfig.ts'
import commonAxiosConfig = AxiosConfig.commonAxiosConfig
import { TypeU } from 'src/util/common/TypeU.ts'
import Callback1 = TypeU.Callback1
import exists = TypeU.exists




export namespace FileU {
  
  
  
  /*
   export const fetchToBlob0 = async (dataUrl: string): Promise<Blob> => {
   const response = await fetch(dataUrl)
   const blob = await response.blob()
   return blob
   }
   */
  
  
  export const fetchToBlob = async (
    url: string,
    options?: {
      onProgress?: Callback1<number | undefined>
      abortCtrl?: AbortController
    }
  ): Promise<Blob> => {
    const config: CreateAxiosDefaults = { ...commonAxiosConfig,
      responseType: 'blob',
      onDownloadProgress: progressEvent => {
        const p = progressEvent.progress
        options?.onProgress?.( exists(p) ? p * 100 : p )
      },
    }
    const ctrl = options?.abortCtrl
    if (ctrl) config.signal = ctrl.signal
    
    const ax = Axios.create(config)
    axiosRetry(ax, AxiosConfig.commonAxiosRetryConfig)
    
    const response = await ax.get<Blob>(url)
    return response.data
  }
  
  
  
  export const blobToDataUrl = async (
    file: Blob,
    options?: {
      onProgress?: Callback1<number | undefined>
      abortCtrl?: AbortController
    }
  ): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onprogress = ev => {
      options?.onProgress?.(ev.lengthComputable ? ev.loaded / ev.total : undefined)
    }
    reader.onload = ev => resolve(ev.target?.result as string)
    reader.onerror = ev => reject(ev)
    reader.onabort = ev => reject(ev)
    
    const ctrl = options?.abortCtrl
    if (ctrl) {
      if (ctrl.signal.aborted) {
        reject(ctrl.signal.reason)
        return
      }
      ctrl.signal.onabort = () => reader.abort
    }
    
    //reader.readAsArrayBuffer(file)
    reader.readAsDataURL(file)
  })
  
  
  
  export const getFilenameFromPath = (path: string): string => {
    return path.match(/(?<=^|[/])[^/]*$/)?.[0] ?? ''
  }
  
  
  
  export const getExtension = (fileName: string): string => {
    return fileName.match(/(?<=[.])[^.]*$/)?.[0] ?? ''
  }
  export const trimExtension = (fileName: string): string => {
    return fileName.replace(/[.][^.]*$/, '')
  }
  
  
  
  export const getExtensionFromMimeType = (mimeType: string): string => {
    return mime.getExtension(mimeType) ?? ''
  }
  
  
  export const getMimeTypeFromExtension = (extension: string): string => {
    return mime.getType(extension) ?? ''
  }
  
  
}
