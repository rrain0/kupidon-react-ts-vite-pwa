import { useAutoRetry } from '@util/app/useAutoRetry.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { MediaDownloadable } from 'src/ui-data/models/media/Media.ts'
import Setter = TypeU.Setter
import Getter = TypeU.Getter



export const useMediaDownloadAutoRetry = <T extends MediaDownloadable | undefined>(
  getMedia: Getter<T>, setMedia: Setter<T>,
) => {
  const retry = () => {
    const m = getMedia()
    if (m?.needRetryDownload) {
      m.download?.abort()
      setMedia({
        ...m,
        needRetryDownload: false,
        needDownload: true,
      })
    }
  }
  
  useAutoRetry(getMedia()?.needRetryDownload, { }, retry)
}

