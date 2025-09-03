import { TypeU } from '@utils/common/TypeU.ts'
import { useTimeout } from '@utils/react/useTimeout.ts'
import { useEffect, useState } from 'react'
import { useMediaDownload } from '@libs/media/download/parts/useMediaDownload.ts'
import {
  useMediaDownloadAutoRetry
} from '@libs/media/download/parts/useMediaDownloadAutoRetry.ts'
import { getMediaUiState, MediaDownloadable } from '@libs/media/Media.ts'
import SetterOrUpdater = TypeU.SetterOrUpdater



export const useMediaDownloader = <T extends MediaDownloadable | undefined>(
  media: T, setMedia: SetterOrUpdater<T>,
  { canShowFetchProgressTimeout = 3000 } = { },
) => {
  
  useEffect(() => {
    setMedia(m => {
      if (getMediaUiState(m).canNeedDownload) return {
        ...m, needDownload: true,
      }
      return m
    })
  }, [media])
  
  useMediaDownload(media, setMedia)
  useMediaDownloadAutoRetry(media, setMedia)
  
  
  const [canShowFetchProgress, setCanShowFetchProgress] = useState(false)
  useTimeout(canShowFetchProgressTimeout, () => setCanShowFetchProgress(true), [])
  
  useEffect(() => {
    setMedia(m => {
      if (m && !!m.showDownloadProgress !== canShowFetchProgress) {
        return { ...m, showDownloadProgress: canShowFetchProgress }
      }
      return m
    })
  }, [canShowFetchProgress])
  
}
