import React, { useEffect, useState } from 'react'
import {
  mergeMediaDownloadData
} from '@libs/media/download/parts/mergeMediaDownloadData.ts'
import { useMediaDownloader } from '@libs/media/download/useMediaDownloader.ts'
import { MediaDownloadable } from '@libs/media/Media.ts'
import { ReactU } from '@utils/react/ReactU.ts'

import { Pu } from 'src/utils/base/math/typeUtils.ts'




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
  
  // Merging new media with old to save current download data
  useEffect(() => {
    setMediaToDownload(mergeMediaDownloadData(media, mediaToDownload))
  }, [media])
  
  useMediaDownloader(mediaToDownload, setMediaToDownload, { canShowFetchProgressTimeout })
  
  return children?.(mediaToDownload)
})
// @ts-expect-error
MediaDownloader.displayName = 'MediaDownloader'
export default MediaDownloader

