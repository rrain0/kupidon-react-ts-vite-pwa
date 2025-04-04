import { TypeU } from 'src/util/common/TypeU'
import noop = TypeU.noop
import Puro = TypeU.Puro



export interface Media {
  type:
    | 'remote' // media from remote server
    | 'local' // media from a local device (file from device filesystem)
  isEmpty: boolean // media can be empty, indicating that user has not photo or other media
  isInited?: boolean | undefined // metadata from server was fetched
  
  id: string
  remoteUrl: string
  name: string
  mimeType: string
  
  dataUrl: string
  
  // Shows if media data is ready to be shown immediately.
  // If empty, it is always not ready.
  isReady: boolean
}

export const newDefaultMedia = (): Media => ({
  type: 'remote',
  isEmpty: false,
  
  id: '',
  remoteUrl: '',
  name: '',
  mimeType: '',
  
  dataUrl: '',
  
  isReady: false,
})



export interface MediaInArray extends Media {
  remoteI: number
}

export const newDefaultMediaInArray = (): MediaInArray => ({
  ...newDefaultMedia(),
  remoteI: 0,
})



export interface MediaOperation {
  id: string
  progress: number // 0..100
  showProgress: boolean
  abort: (reason?: any) => void
}

export const newDefaultMediaOperation = (): MediaOperation => ({
  id: '',
  progress: 0,
  showProgress: false,
  abort: noop,
})



export type Downloadable = Puro<{
  // Нужно начать загружать
  needDownload: boolean
  // Процесс загрузки
  download: MediaOperation
  // Результат загрузки - ошибка
  downloadError: any
}>



// extend this interface to define a particular error type, etc.
export interface MediaDownloadable extends Media, Downloadable { }



export type Uploadable = Puro<{
  needUpload: boolean
  showUpload: boolean
  upload: MediaOperation
  uploadError: any
}>



export type Compressible = Puro<{
  needCompression: boolean
  showCompression: boolean
  compression: MediaOperation
  compressionError: any
}>





