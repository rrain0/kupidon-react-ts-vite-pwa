import { useAutoRetry } from 'src/utils/react/useAutoRetry.ts'

import { MediaDownloadable } from '@libs/media/Media.ts'
import { SetterOrUpdater } from 'src/utils/base/typeUtils.ts'




export const useMediaDownloadAutoRetry = <T extends MediaDownloadable | undefined>(
  media: T, setMedia: SetterOrUpdater<T>,
) => {
  const retry = () => {
    setMedia(m => {
      if (m?.needRetryDownload) return {
        ...m,
        needRetryDownload: false,
        needDownload: true,
      }
      return m
    })
  }
  
  useAutoRetry(media?.needRetryDownload, { }, retry)
}

