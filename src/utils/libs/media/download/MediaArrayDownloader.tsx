import { ArrayU } from 'src/utils/base/ArrayU.ts'
import React, { useEffect, useState } from 'react'
import {
  mergeMediaDownloadData
} from '@libs/media/download/parts/mergeMediaDownloadData.ts'
import {
  useMediaArrayDownloader
} from '@libs/media/download/useMediaArrayDownloader.ts'
import { MediaDownloadable } from '@libs/media/Media.ts'
import { ReactU } from '@utils/react/ReactU.ts'

import { Pu } from 'src/utils/base/math/typeUtils.ts'



export type MediaArrayDownloaderProps<
  T extends MediaDownloadable | undefined
> = Pu<{
  medias: T[]
  canShowFetchProgressTimeout: number
  children: (medias?: T[]) => React.ReactNode
}>

export const MediaArrayDownloader = ReactU.memo(<T extends MediaDownloadable | undefined>(
  props: MediaArrayDownloaderProps<T>
) => {
  const {
    children,
    medias,
    canShowFetchProgressTimeout = 3000,
  } = props
  
  
  const [mediasToDownload, setMediasToDownload] = useState<T[] | undefined>(undefined)
  
  useEffect(() => {
    setMediasToDownload(mediasToDownload => ArrayU.mapToIf(medias, m => {
      const mediaToDownload = mediasToDownload?.find(mToDownload => (
        mToDownload && m && mToDownload.remoteUrl === m.remoteUrl
      ))
      return mergeMediaDownloadData(m, mediaToDownload)
    }))
  }, [medias])
  
  useMediaArrayDownloader(mediasToDownload, setMediasToDownload, { canShowFetchProgressTimeout })
  
  return children?.(mediasToDownload)
})
// @ts-expect-error
MediaArrayDownloader.displayName = 'MediaArrayDownloader'
export default MediaArrayDownloader

