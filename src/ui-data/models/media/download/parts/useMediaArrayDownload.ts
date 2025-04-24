import { ArrayU } from '@util/common/ArrayU.ts'
import { AsyncU } from '@util/common/AsyncU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { FileU } from '@util/file/FileU.ts'
import { StageProgress } from '@util/progress/StageProgress.ts'
import { useEffect } from 'react'
import { ApiUtils } from 'src/api/ApiUtils.ts'
import {
  MediaDownloadable,
  MediaInArrayDUC,
  newDefaultMediaOperation,
} from 'src/ui-data/models/media/Media.ts'
import withThrottle = AsyncU.withThrottle
import fetchToBlob = FileU.fetchToBlob
import blobToDataUrl = FileU.blobToDataUrl
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import SetterOrUpdater = TypeU.SetterOrUpdater



// Если начнётся несколько загрузок с одинаковым урлом одновременно,
// то это не проблема, потому что браузер кэширует.


export const useMediaArrayDownload = <T extends MediaDownloadable | undefined>(
  medias: T[] | undefined, setMedias: SetterOrUpdater<T[] | undefined>,
  { canShowFetchProgress = true } = { },
) => {
  
  // Medias must be 'isInited' & 'needDownload' to start download
  
  useEffect(() => {
    setMedias(medias => ArrayU.mapToIf(medias, m => {
      if (!m?.needDownload) return m
      
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
      } satisfies Partial<MediaInArrayDUC>
      
      // Если уже есть такая же загрузка, то пусть продолжается
      if (m.download?.id === downloadStart.download.id) return m
      
      // Отменяем предыдущую загрузку и устанавливаем новую
      // TODO Download - Тут хз, отменять её тут или это должны делать снаружи
      m.download?.abort('Download is stale')
      m = { ...m, ...downloadStart }
      
      const updateMedia = (
        updateForMedia?: Partial<MediaDownloadable>,
        updateForDownload?: Partial<MediaDownloadable['download']>,
      ) => {
        // TODO Download - Если 2 медиа с одинаковым id, то до второго медиа мы никогда не доберёмся
        // TODO Если не нашли загрузку при обновлении, то отменить её? Или пусть снаружи отменяют?
        setMedias(medias => mapFirstToIfFoundBy({
          arr: medias,
          filter: m => m && m.download?.id === downloadStart.download.id,
          mapper: m => m && ({
            ...m,
            ...updateForMedia,
            ...updateForDownload && m?.download && {
              download: { ...m.download, ...updateForDownload },
            },
          }),
        }))
      }
      const updatePhotoThrottled = withThrottle(
        RangeU.random(1500, 2300), updateMedia,
      )
      
      ;(async () => {
        try {
          const progress = new StageProgress(2, [90, 10])
          const onProgress = (p = 0) => {
            progress.progress = p
            //console.log('progress', m.id, progress.value)
            updatePhotoThrottled(undefined, { progress: progress.value })
          }
          
          //console.log('start download id',m.id)
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
          
          //console.log('completed',m.id)
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
    }))
  }, [medias])
  
  
  useEffect(() => {
    setMedias(medias => ArrayU.mapToIf(medias, m => {
      if (m?.download) return { ...m,
        download: { ...m.download, showProgress: canShowFetchProgress },
      }
      return m
    }))
  }, [canShowFetchProgress])
  
  
  useEffect(() => {
    return () => setMedias(medias => {
      medias?.forEach(m => m?.download?.abort('Download is stale'))
      return medias
    })
  }, [])
}



