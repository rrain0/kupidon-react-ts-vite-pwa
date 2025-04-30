import { ArrayU } from '@util/common/ArrayU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useTimeout } from '@util/react/useTimeout.ts'
import { useEffect, useState } from 'react'
import { getMediaUiState, MediaDownloadable } from 'src/ui-data/models/media/Media.ts'
import { useMediaArrayDownload } from 'src/ui-data/models/media/download/parts/useMediaArrayDownload.ts'
import {
  useMediaArrayDownloadAutoRetry
} from 'src/ui-data/models/media/download/parts/useMediaArrayDownloadAutoRetry.ts'
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



