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
import SetterOrUpdater = TypeU.SetterOrUpdater



export const useMediaDownload = <T extends MediaDownloadable | undefined>(
  media: T, setMedia: SetterOrUpdater<T>,
) => {
  useEffect(() => {
    setMedia(m => {
      if (!m?.needDownload) return m
    
      const fetchToBlobAbortCtrl = new AbortController()
      const blobToDataUrlAbortCtrl = new AbortController()
      const abortCtrl = new AbortController()
      abortCtrl.signal.onabort = function () {
        fetchToBlobAbortCtrl.abort(this.reason)
        blobToDataUrlAbortCtrl.abort(this.reason)
      }
      const downloadStart = {
        isReady: false,
        needDownload: false,
        download: {
          ...newDefaultMediaOperation(),
          id: m.id,
          abort: reason => abortCtrl.abort(reason),
        },
        downloadError: undefined,
      } satisfies Partial<MediaDownloadable>
      
      // Если уже есть такая же загрузка, то пусть продолжается
      if (m.download?.id === downloadStart.download.id) return m
      
      // Отменяем предыдущую загрузку и устанавливаем новую
      m.download?.abort('Download is stale')
      m = { ...m, ...downloadStart }
      
      const updateMedia = (
        updateForMedia?: Partial<MediaDownloadable>,
        updateForDownload?: Partial<MediaDownloadable['download']>,
      ) => {
        setMedia(m => {
          if (m && m.download?.id === downloadStart.download.id) {
            return {
              ...m,
              ...updateForMedia,
              ...updateForDownload && m.download && {
                download: { ...m.download, ...updateForDownload },
              },
            }
          }
          return m
        })
      }
      const updateDownloadThrottled = withThrottle(
        RangeU.random(1500, 2300), updateMedia,
      )
      
      ;(async () => {
        try {
          const progress = new StageProgress(2, [90, 10])
          const onProgress = (p = 0) => {
            progress.progress = p
            //console.log('progress', progress.value)
            updateDownloadThrottled(undefined, { progress: progress.value })
          }
          
          console.log('download started')
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
          
          console.log('download completed')
          updateMedia({ isReady: true, download: undefined, dataUrl })
        }
        catch (ex) {
          if (abortCtrl.signal.aborted) {
            console.log('download aborted:', abortCtrl.signal.reason)
            return
          }
          if (ApiUtils.isConnectionError(ex)) {
            updateMedia({ download: undefined, downloadError: ex, needRetryDownload: true })
            return
          }
          
          //console.log('download error', ex)
          //console.log('download error photo', photo)
          updateMedia({ download: undefined, downloadError: ex })
        }
      })()
      
      return m
    })
  }, [media])
  
  
  useEffect(() => {
    return () => setMedia(m => {
      m?.download?.abort('Download is stale')
      return m
    })
  }, [])
}



