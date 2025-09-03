import { useAutoRetry } from '@utils/app/useAutoRetry.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import { MediaDownloadable } from '@libs/media/Media.ts'
import SetterOrUpdater = TypeU.SetterOrUpdater




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

