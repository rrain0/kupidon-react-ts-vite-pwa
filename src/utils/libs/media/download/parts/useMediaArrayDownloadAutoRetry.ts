import { useAutoRetry } from 'src/utils/react/useAutoRetry.ts'
import { arrMapToIf } from 'src/utils/base/array/arrayUtils.ts'
import { MediaDownloadable } from '@libs/media/Media.ts'
import { SetterOrUpdater } from 'src/utils/base/typeUtils.ts'



export const useMediaArrayDownloadAutoRetry = <T extends MediaDownloadable | undefined>(
  medias: T[] | undefined, setMedias: SetterOrUpdater<T[] | undefined>,
) => {
  const retry = () => {
    setMedias(medias => arrMapToIf(medias, m => {
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

