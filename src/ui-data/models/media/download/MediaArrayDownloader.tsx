import { ArrayU } from '@util/common/ArrayU.ts'
import React, { useEffect, useState } from 'react'
import {
  useMediaArrayDownloader
} from 'src/ui-data/models/media/download/useMediaArrayDownloader.ts'
import { MediaDownloadable } from 'src/ui-data/models/media/Media.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu


// TODO add merge new medias to old with save of operations if media the same


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
  
  // TODO Download - merge new with old
  useEffect(() => {
    setMediasToDownload(medias)
  }, [medias])
  
  useMediaArrayDownloader(mediasToDownload, setMediasToDownload, { canShowFetchProgressTimeout })
  
  return children?.(mediasToDownload)
})
// @ts-expect-error
MediaArrayDownloader.displayName = 'MediaArrayDownloader'
export default MediaArrayDownloader

