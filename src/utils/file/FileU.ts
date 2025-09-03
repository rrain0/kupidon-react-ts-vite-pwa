import Axios, { CreateAxiosDefaults } from 'axios'
import axiosRetry from 'axios-retry'
import mime from 'mime'
import { AxiosConfig } from 'src/services/api/AxiosConfig.ts'
import commonAxiosConfig = AxiosConfig.commonAxiosConfig
import { TypeU } from 'src/utils/common/TypeU.ts'
import Callback1 = TypeU.Callback1




export namespace FileU {
  
  
  
  /*
   export const fetchToBlob0 = async (dataUrl: string): Promise<Blob> => {
   const response = await fetch(dataUrl)
   const blob = await response.blob()
   return blob
   }
   */
  
  
  import isdef = TypeU.isdef
  export const fetchToBlob = async (
    url: string,
    {
      onProgress = undefined as Callback1<number | undefined> | undefined,
      abortCtrl = undefined as AbortController | undefined,
    } = { },
  ): Promise<Blob> => {
    const config: CreateAxiosDefaults = { ...commonAxiosConfig,
      responseType: 'blob',
      onDownloadProgress: progressEvent => {
        const p = progressEvent.progress
        onProgress?.( isdef(p) ? p * 100 : p )
      },
    }
    
    // Вроде аксиос должен сам проверить, отменено ли оно уже
    if (abortCtrl) config.signal = abortCtrl.signal
    
    const ax = Axios.create(config)
    axiosRetry(ax, AxiosConfig.commonAxiosRetryConfig)
    
    const response = await ax.get<Blob>(url)
    return response.data
  }
  
  
  
  export const blobToDataUrl = async (
    file: Blob,
    {
      onProgress = undefined as Callback1<number | undefined> | undefined,
      abortCtrl = undefined as AbortController | undefined,
    } = { },
  ): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onprogress = ev => {
      onProgress?.(ev.lengthComputable ? ev.loaded / ev.total : undefined)
    }
    reader.onload = ev => resolve(ev.target?.result as string)
    reader.onerror = ev => reject(ev)
    reader.onabort = ev => reject(ev)
    
    if (abortCtrl) {
      // Перед началом проверяем, не отменено ли оно уже
      if (abortCtrl.signal.aborted) {
        reject(abortCtrl.signal.reason)
        return
      }
      abortCtrl.signal.onabort = ev => reader.abort()
    }
    
    reader.readAsDataURL(file)
  })
  
  
  
  export const blobToBuffer = async (
    file: Blob,
    {
      onProgress = undefined as Callback1<number | undefined> | undefined,
      abortCtrl = undefined as AbortController | undefined,
    } = { },
  ): Promise<ArrayBuffer> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onprogress = ev => {
      onProgress?.(ev.lengthComputable ? ev.loaded / ev.total : undefined)
    }
    reader.onload = ev => resolve(ev.target?.result as ArrayBuffer)
    reader.onerror = ev => reject(ev)
    reader.onabort = ev => reject(ev)
    
    if (abortCtrl) {
      // Перед началом проверяем, не отменено ли оно уже
      if (abortCtrl.signal.aborted) {
        reject(abortCtrl.signal.reason)
        return
      }
      abortCtrl.signal.onabort = ev => reader.abort()
    }
    
    reader.readAsArrayBuffer(file)
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
  
  
  
  export const mimeToExt = (mimeType: string): string => {
    return mime.getExtension(mimeType) ?? ''
  }
  export const extToMime = (extension: string): string => {
    return mime.getType(extension) ?? ''
  }
  
  
}
