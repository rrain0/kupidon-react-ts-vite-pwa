import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import React, { useEffect } from 'react'
import { MediaDownloadable } from 'src/ui-data/models/media/Media.ts'
import { useMediaArrayDownload } from 'src/ui-data/models/media/useMediaArrayDownload.ts'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Pu = TypeU.Pu




export type MediaArrayDownloaderProps<
  T extends MediaDownloadable | undefined
> = {
} & Pu<{
  medias: T[]
  children: (medias?: T[]) => React.ReactNode
}>

export const MediaArrayDownloader = ReactU.memo(<
  T extends MediaDownloadable | undefined
>(
  props: MediaArrayDownloaderProps<T>
) => {
  const {
    children,
    medias,
  } = props
  
  
  const [
    getMediasDownload, setMediasDownload, mediasDownload,
  ] = useStateAndRef<T[] | undefined>(undefined)
  
  useEffect(() => {
    setMediasDownload(medias?.map(m => ({ ...m,
      // TODO инициализация должна быть снаружи
      ...m?.isEmpty && { isInited: true },
      ...m?.remoteUrl && { isInited: true, needDownload: true },
    })))
  }, [medias])
  
  useMediaArrayDownload(getMediasDownload, setMediasDownload)
  
  return children?.(mediasDownload)
})
// @ts-expect-error
MediaArrayDownloader.displayName = 'MediaArrayDownloader'
export default MediaArrayDownloader

