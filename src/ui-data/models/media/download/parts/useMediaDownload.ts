import { AsyncU } from '@util/common/AsyncU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { FileU } from '@util/file/FileU.ts'
import { StageProgress } from '@util/progress/StageProgress.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { useEffect } from 'react'
import { ApiUtils } from 'src/api/ApiUtils.ts'
import {
  MediaDownloadable,
  MediaOperation,
  newDefaultMediaOperation,
} from 'src/ui-data/models/media/Media.ts'
import withThrottle = AsyncU.withThrottle
import fetchToBlob = FileU.fetchToBlob
import blobToDataUrl = FileU.blobToDataUrl
import SetterOrUpdater = TypeU.SetterOrUpdater



export const useMediaDownload = <T extends MediaDownloadable | undefined>(
  media: T, setMedia: SetterOrUpdater<T>,
) => {
  
  const [getDownload, setDownload] = useRefGetSet<MediaOperation | undefined>(undefined)
  
  useEffect(() => {
    setMedia(m => {
      const currD = getDownload()
      // Нет медиа
      if (!m) {
        currD?.abort('Download is stale')
        setDownload(undefined)
        return m
      }
      // Не нужно начинать загрузку
      if (!m.needDownload) {
        return m
      }
      const mediaD = m.download
      // Если загрузка в медиа соответствует текущей загрузке, то продолжаем
      if (mediaD && currD && mediaD.id === currD.id) {
        return { ...m, needDownload: false }
      }
      
    
      const fetchToBlobAbortCtrl = new AbortController()
      const blobToDataUrlAbortCtrl = new AbortController()
      const abortCtrl = new AbortController()
      abortCtrl.signal.onabort = function () {
        fetchToBlobAbortCtrl.abort(this.reason)
        blobToDataUrlAbortCtrl.abort(this.reason)
      }
      const startMediaD = {
        isReady: false,
        needDownload: false,
        download: {
          ...newDefaultMediaOperation(),
          id: m.id,
          abort: reason => abortCtrl.abort(reason),
        },
        downloadError: undefined,
      } satisfies Partial<MediaDownloadable>
      
      // Если текущая загрузка такая же, что собираемся начать, то продолжаем её
      if (currD && currD.id === startMediaD.download.id) {
        startMediaD.download = currD
        return { ...m, ...startMediaD }
      }
      
      // TODO Download - abort mechanism - abort() must setDownload(undefined)
      // Отменяем предыдущую загрузку и устанавливаем новую
      currD?.abort('Download is stale')
      setDownload(startMediaD.download)
      m = { ...m, ...startMediaD }
      
      const updateMedia = (
        updateForMedia?: Partial<MediaDownloadable>,
        updateForDownload?: Partial<MediaDownloadable['download']>,
      ) => {
        setMedia(m => {
          if (m && m.download?.id === startMediaD.download.id) {
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
          setDownload(undefined)
        }
        catch (ex) {
          if (abortCtrl.signal.aborted) {
            // TODO Download - setDownload(undefined)
            console.log('download aborted:', abortCtrl.signal.reason)
            return
          }
          if (ApiUtils.isConnectionError(ex)) {
            updateMedia({ download: undefined, downloadError: ex, needRetryDownload: true })
            setDownload(undefined)
            return
          }
          
          //console.log('download error', ex)
          updateMedia({ download: undefined, downloadError: ex })
          setDownload(undefined)
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



