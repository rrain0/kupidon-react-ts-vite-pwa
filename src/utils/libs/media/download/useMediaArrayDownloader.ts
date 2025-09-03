import { ArrayU } from 'src/utils/base/ArrayU.ts'
import { TypeU } from 'src/utils/base/TypeU.ts'
import { useTimeout } from '@utils/react/useTimeout.ts'
import { useEffect, useState } from 'react'
import { getMediaUiState, MediaDownloadable } from '@libs/media/Media.ts'
import { useMediaArrayDownload } from '@libs/media/download/parts/useMediaArrayDownload.ts'
import {
  useMediaArrayDownloadAutoRetry
} from '@libs/media/download/parts/useMediaArrayDownloadAutoRetry.ts'
import SetterOrUpdater = TypeU.SetterOrUpdater
import mapToIf = ArrayU.mapToIf



export const useMediaArrayDownloader = <T extends MediaDownloadable | undefined>(
  medias: T[] | undefined, setMedias: SetterOrUpdater<T[] | undefined>,
  { canShowFetchProgressTimeout = 3000 } = { },
) => {
  
  useEffect(() => {
    setMedias(medias => mapToIf(medias, m => {
      if (getMediaUiState(m).canNeedDownload) return {
        ...m, needDownload: true,
      }
      return m
    }))
  }, [medias])
  
  useMediaArrayDownload(medias, setMedias)
  useMediaArrayDownloadAutoRetry(medias, setMedias)
  
  const [canShowFetchProgress, setCanShowFetchProgress] = useState(false)
  useTimeout(canShowFetchProgressTimeout, () => setCanShowFetchProgress(true), [])
  
  useEffect(() => {
    setMedias(medias => ArrayU.mapToIf(medias, m => {
      if (m && !!m.showDownloadProgress !== canShowFetchProgress) {
        return { ...m, showDownloadProgress: canShowFetchProgress }
      }
      return m
    }))
  }, [canShowFetchProgress])
  
}



