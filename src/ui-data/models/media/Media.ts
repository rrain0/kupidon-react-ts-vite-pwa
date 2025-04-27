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
  type: 'remote', isEmpty: false,
  id: '', remoteUrl: '', name: '', mimeType: '',
  dataUrl: '',
  isReady: false,
})
export const newDefaultEmptyRemoteMedia = (): Media => ({
  ...newDefaultRemoteMedia(),
  isEmpty: true,
  isInited: true,
})
export const newDefaultLocalMedia = (): Media => ({
  ...newDefaultRemoteMedia(),
  type: 'local',
})
export const newDefaultEmptyLocalMedia = (): Media => ({
  ...newDefaultLocalMedia(),
  isEmpty: true,
  isInited: true,
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



export const newDefaultRemoteMediaInArray = (remoteI = 0): MediaInArray => ({
  ...newDefaultRemoteMedia(),
  remoteI,
})
export const newDefaultEmptyRemoteMediaInArray = (remoteI = 0): MediaInArray => ({
  ...newDefaultEmptyRemoteMedia(),
  remoteI,
})
export const newDefaultLocalMediaInArray = (remoteI = 0): MediaInArray => ({
  ...newDefaultLocalMedia(),
  remoteI,
})
export const newDefaultEmptyLocalMediaInArray = (remoteI = 0): MediaInArray => ({
  ...newDefaultEmptyLocalMedia(),
  remoteI,
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



export interface MediaInArrayDownloadable extends MediaInArray, Downloadable { }



export type Uploadable = Pu<{
  needUpload: boolean
  upload: MediaOperation
  uploadError: any
}>



// Compress media or convert to another format
export type Convertible = Pu<{
  needConversion: boolean
  conversion: MediaOperation
  conversionError: any
}>



interface DUC extends Downloadable, Uploadable, Convertible { }

export interface MediaDUC extends Media, DUC { }
export interface MediaInArrayDUC extends MediaInArray, DUC { }




export const getMediaUiState = (
  media?: MediaDUC,
  { allowEmpty = true } = { },
) => {
  const {
    isInited, type, isEmpty, isReady, dataUrl,
    needDownload, download, downloadError, needRetryDownload,
    needUpload, upload, uploadError,
    needConversion, conversion, conversionError,
  } = media ?? { }
  
  const isConverting = !!conversion || needConversion
  const isUploading = !!upload || needUpload
  const isDownloading = !!download || needDownload || needRetryDownload
  
  const canNeedDownload = isInited && !isEmpty && type === 'remote'
    && !isReady && !isConverting && !isDownloading
  
  const isLoading = isDownloading || isConverting || isUploading || !isInited || (
    !isEmpty && !isReady && !downloadError && !conversionError
  )
  
  const conversionProgress = conversion?.progress
  const downloadProgress = download?.progress
  const uploadProgress = upload?.progress
  const progress = conversionProgress ?? downloadProgress ?? uploadProgress
  
  const showConversionProgress = conversion?.showProgress
  const showDownloadProgress = download?.showProgress
  const showUploadProgress = upload?.showProgress
  const showProgress = showConversionProgress ?? showDownloadProgress ?? showUploadProgress
  
  const isLoadingNoProgress = isLoading && !showProgress
  const isLoadingWithProgress = isLoading && showProgress
  
  const isError = isInited && !isReady && (
    !isLoading || (!allowEmpty && isEmpty)
  )
  
  return {
    canNeedDownload, isLoading, progress, showProgress,
    isLoadingNoProgress, isLoadingWithProgress,
    isEmpty,
    isReady, dataUrl,
    isError,
    
    isDownloading, isConverting, isUploading,
    conversionProgress, downloadProgress, uploadProgress,
    showConversionProgress, showDownloadProgress, showUploadProgress,
  }
}


