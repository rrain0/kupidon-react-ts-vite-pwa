import React, { useEffect, useState } from 'react'
import { useMediaDownloader } from 'src/ui-data/models/media/download/useMediaDownloader.ts'
import { MediaDownloadable } from 'src/ui-data/models/media/Media.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu




export type MediaDownloaderProps<
  T extends MediaDownloadable | undefined
> = Pu<{
  media: T
  canShowFetchProgressTimeout: number
  children: (media?: T) => React.ReactNode
}>

export const MediaDownloader = ReactU.memo(<T extends MediaDownloadable | undefined>(
  props: MediaDownloaderProps<T>
) => {
  const {
    children,
    media,
    canShowFetchProgressTimeout = 3000,
  } = props
  
  
  const [mediaToDownload, setMediaToDownload] = useState<T | undefined>(undefined)
  
  // TODO Download - merge new with old
  useEffect(() => {
    setMediaToDownload(media)
  }, [media])
  
  useMediaDownloader(mediaToDownload, setMediaToDownload, { canShowFetchProgressTimeout })
  
  return children?.(mediaToDownload)
})
// @ts-expect-error
MediaDownloader.displayName = 'MediaDownloader'
export default MediaDownloader

