import { ArrayU } from '@util/common/ArrayU.ts'
import React, { useEffect, useState } from 'react'
import {
  mergeMediaDownloadData
} from 'src/ui-data/models/media/download/parts/mergeMediaDownloadData.ts'
import {
  useMediaArrayDownloader
} from 'src/ui-data/models/media/download/useMediaArrayDownloader.ts'
import { MediaDownloadable } from 'src/ui-data/models/media/Media.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu



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

