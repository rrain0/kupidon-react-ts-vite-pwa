import { AsyncU } from '@util/common/AsyncU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { FileU } from '@util/file/FileU.ts'
import { StageProgress } from '@util/progress/StageProgress.ts'
import { useEffect } from 'react'
import { ApiUtils } from 'src/api/ApiUtils.ts'
import { MediaDownloadable, newDefaultMediaOperation } from 'src/ui-data/models/media/Media.ts'
import withThrottle = AsyncU.withThrottle
import fetchToBlob = FileU.fetchToBlob
import blobToDataUrl = FileU.blobToDataUrl
import Getter = TypeU.Getter
import Setter = TypeU.Setter




export const useMediaDownload = <T extends MediaDownloadable | undefined>(
  getMedia: Getter<T>, setMedia: Setter<T>,
  { canShowFetchProgress = true } = { },
) => {
  useEffect(() => {
    const m = getMedia()
    if (!m?.needDownload) return
    
    const fetchToBlobAbortCtrl = new AbortController()
    const blobToDataUrlAbortCtrl = new AbortController()
    const abortCtrl = new AbortController()
    abortCtrl.signal.onabort = function() {
      fetchToBlobAbortCtrl.abort(this.reason)
      blobToDataUrlAbortCtrl.abort(this.reason)
    }
    const downloadStart = {
      isReady: false,
      needDownload: false,
      download: { ...newDefaultMediaOperation(),
        id: m.id,
        showProgress: canShowFetchProgress,
        abort: reason => abortCtrl.abort(reason),
      },
      downloadError: undefined,
    } satisfies Partial<MediaDownloadable>
    
    // Если уже ес ть такая же загрузка, то пусть продолжается
    if (m.download?.id === downloadStart.download.id) return
    
    // Отменяем предыдущую загрузку и устанавливаем новую
    m.download?.abort('Download is stale')
    setMedia({ ...m, ...downloadStart })
    
    const updateDownload = (
      updateForMedia?: Partial<MediaDownloadable>,
      updateForDownload?: Partial<MediaDownloadable['download']>
    ) => {
      setMedia((() => {
        const m = getMedia()
        if (!m) return m
        if (m.download?.id !== downloadStart.download.id) return m
        return { ...m,
          ...updateForMedia,
          ...updateForDownload && m.download && {
            download: { ...m.download, ...updateForDownload },
          },
        }
      })())
    }
    const updateDownloadThrottled = withThrottle(
      RangeU.random(1500, 2300), updateDownload
    )
    
    ;(async () => {
      try {
        const progress = new StageProgress(2, [90, 10])
        const onProgress = (p = 0) => {
          progress.progress = p
          //console.log('progress', photo.id, progress.value)
          updateDownloadThrottled(undefined, { progress: progress.value })
        }
        
        //console.log('download started')
        const blob = await fetchToBlob(m.remoteUrl, {
          onProgress, abortCtrl: fetchToBlobAbortCtrl,
        })
        abortCtrl.signal.throwIfAborted()
        
        progress.stage++
        progress.progress = 0
        const dataUrl = await blobToDataUrl(blob, {
          onProgress, abortCtrl: blobToDataUrlAbortCtrl,
        })
        abortCtrl.signal.throwIfAborted()
        
        //console.log('download completed')
        updateDownload({ isReady: true, download: undefined, dataUrl })
      }
      catch (ex) {
        if (abortCtrl.signal.aborted) {
          console.log('download aborted:', abortCtrl.signal.reason)
          return
        }
        if (ApiUtils.isConnectionError(ex)) {
          updateDownload({ download: undefined, downloadError: ex, needRetryDownload: true })
          return
        }
        
        //console.log('download error', ex)
        //console.log('download error photo', photo)
        updateDownload({ download: undefined, downloadError: ex })
      }
    })()
  }, [getMedia()])
  
  
  useEffect(() => {
    return () => getMedia()?.download?.abort('Download is stale')
  }, [])
  
}



