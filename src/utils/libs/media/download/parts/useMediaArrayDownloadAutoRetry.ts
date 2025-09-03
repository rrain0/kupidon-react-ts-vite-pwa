import { useAutoRetry } from '@utils/app/useAutoRetry.ts'
import { ArrayU } from '@utils/common/ArrayU.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import { MediaDownloadable } from '@libs/media/Media.ts'
import mapToIf = ArrayU.mapToIf
import SetterOrUpdater = TypeU.SetterOrUpdater



export const useMediaArrayDownloadAutoRetry = <T extends MediaDownloadable | undefined>(
  medias: T[] | undefined, setMedias: SetterOrUpdater<T[] | undefined>,
) => {
  const retry = () => {
    setMedias(medias => mapToIf(medias, m => {
      if (m?.needRetryDownload) {
        return {
          ...m,
          needRetryDownload: false,
          needDownload: true,
        }
      }
      return m
    }))
  }
  
  useAutoRetry(medias?.some(m => m?.needRetryDownload), { }, retry)
}

