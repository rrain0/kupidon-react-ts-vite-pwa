import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import noop = TypeU.noop
import Puro = TypeU.Puro



export interface Media {
  type:
    | 'remote' // media from remote server
    | 'local' // media from a local device (file from device filesystem)
  isEmpty: boolean // media can be empty, indicating that user haven't uploaded any yet
  
  id: string
  remoteUrl: string
  name: string
  mimeType: string
  
  dataUrl: string
  
  // Shows if media data is ready to be shown immediately.
  // If empty, it is always not ready.
  isReady: boolean
}

export const DefaultMedia: Media = {
  type: 'remote',
  isEmpty: false,
  
  id: '',
  remoteUrl: '',
  name: '',
  mimeType: '',
  
  dataUrl: '',
  
  isReady: false,
}



export interface MediaInArray extends Media {
  remoteI: number
}

export const DefaultMediaInArray: MediaInArray = {
  ...DefaultMedia,
  remoteI: 0,
}



export interface MediaOperation {
  id: string
  progress: number // 0..100
  abort: Callback
}

export const DefaultMediaOperation: MediaOperation = {
  id: '',
  progress: 0,
  abort: noop,
}

type Downloadable = Puro<{
  needDownload: boolean
  download: MediaOperation
  downloadError: any
}>

// extend this interface to define a particular error type, etc.
export interface MediaDownloadable extends Media, Downloadable { }
