import { useAutoRetry } from 'src/utils/react/useAutoRetry.ts'
import { ArrayU } from 'src/utils/base/ArrayU.ts'

import { MediaDownloadable } from '@libs/media/Media.ts'
import mapToIf = ArrayU.mapToIf
import { SetterOrUpdater } from 'src/utils/base/math/typeUtils.ts'



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

