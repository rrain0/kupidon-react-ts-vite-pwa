import { TypeU } from '@util/common/TypeU.ts'
import { getDataUrlProps } from '@util/file/DataUrl.ts'
import { FileU } from '@util/file/FileU.ts'
import noop = TypeU.noop
import Pu = TypeU.Pu
import getFilenameFromPath = FileU.getFilenameFromPath
import getMimeTypeFromExtension = FileU.getMimeTypeFromExtension
import getExtension = FileU.getExtension



export interface Media {
  // 'remote' - media from remote server
  // 'local' - media from a local device (file from device filesystem)
  type: 'remote' | 'local'
  
  // Media can be empty - media slot has no data.
  isEmpty?: boolean | undefined
  id: string
  remoteUrl: string
  name: string
  mimeType: string
  
  dataUrl: string
  
  // Metadata from server was fetched
  isInited?: boolean | undefined
  // Shows if media is ready to be shown immediately. Empty cannot be ready.
  isReady?: boolean | undefined
}

export const newDefaultRemoteMedia = (): Media => ({
  type: 'remote',
  id: '', remoteUrl: '', name: '', mimeType: '',
  dataUrl: '',
})
export const newDefaultLocalMedia = (): Media => ({
  ...newDefaultRemoteMedia(),
  type: 'local',
})

export const urlToMedia = (url = '', { needDownload = true } = { }): MediaDownloadable => {
  if (!url) return {
    ...newDefaultRemoteMedia(),
    isEmpty: true,
    isInited: true,
  }
  const dataUrlProps = getDataUrlProps(url)
  if (dataUrlProps) return {
    ...newDefaultLocalMedia(),
    id: url,
    mimeType: dataUrlProps.mimeType,
    dataUrl: url,
    isInited: true,
    isReady: true,
  }
  return {
    ...newDefaultRemoteMedia(),
    id: url,
    remoteUrl: url,
    name: getFilenameFromPath(url),
    mimeType: getMimeTypeFromExtension(getExtension(url)),
    isInited: true,
    needDownload,
  }
}



export interface MediaInArray extends Media {
  remoteI: number
}

export const newDefaultRemoteMediaInArray = (): MediaInArray => ({
  ...newDefaultRemoteMedia(),
  remoteI: 0,
})

export const newDefaultLocalMediaInArray = (): MediaInArray => ({
  ...newDefaultLocalMedia(),
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



export type Downloadable = Pu<{
  // Нужно начать загружать
  needDownload: boolean
  // Процесс загрузки
  download: MediaOperation
  // Результат загрузки - ошибка
  downloadError: any
  // Нужно пытаться загрузить снова
  needRetryDownload: boolean
}>



// extend this interface to define a particular error type, etc.
export interface MediaDownloadable extends Media, Downloadable { }

export const getMediaDownloadUiState = (media?: MediaDownloadable) => {
  const { isInited, isEmpty, isReady, downloadError, needRetryDownload } = media ?? { }
  return {
    isLoading: !isInited || (!isEmpty && !isReady && (needRetryDownload || !downloadError)),
    isReady,
    isError: isInited && (isEmpty || (downloadError && !needRetryDownload)),
  }
}


export type Uploadable = Pu<{
  needUpload: boolean
  showUpload: boolean
  upload: MediaOperation
  uploadError: any
}>



export type Compressible = Pu<{
  needCompression: boolean
  showCompression: boolean
  compression: MediaOperation
  compressionError: any
}>





