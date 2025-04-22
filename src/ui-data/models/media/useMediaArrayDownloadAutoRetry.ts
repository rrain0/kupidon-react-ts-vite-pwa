import { useAutoRetry } from '@util/app/useAutoRetry.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { MediaDownloadable } from 'src/ui-data/models/media/Media.ts'
import Setter = TypeU.Setter
import Getter = TypeU.Getter
import mapToIf = ArrayU.mapToIf



export const useMediaArrayDownloadAutoRetry = <T extends MediaDownloadable | undefined>(
  getMedias: Getter<T[] | undefined>, setMedias: Setter<T[] | undefined>,
) => {
  const retry = () => {
    setMedias(mapToIf(getMedias(), m => {
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
  
  useAutoRetry(getMedias()?.some(m => m?.needRetryDownload), { }, retry)
}

