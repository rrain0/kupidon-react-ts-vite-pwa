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
      const mediaD = m.download
      if (!m.needDownload) {
        // Отменяем текущую загрузку, если у медиа нет загрузки или она другая
        if (currD && (!mediaD || mediaD.id !== currD?.id)) {
          currD?.abort('Download is stale')
          setDownload(undefined)
        }
        // Не нужно начинать загрузку
        return m
      }
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
      const abortOperation = reason => abortCtrl.abort(reason)
      
      const startMediaD = {
        isReady: false,
        needDownload: false,
        download: {
          ...newDefaultMediaOperation(),
          id: m.id,
          abort: reason => abortOperation(reason),
        },
        downloadError: undefined,
      } satisfies Partial<MediaDownloadable>
      
      // Если текущая загрузка такая же, что собираемся начать, то продолжаем её
      if (currD && currD.id === startMediaD.download.id) {
        startMediaD.download = currD
        return { ...m, ...startMediaD }
      }
      
      // Отменяем предыдущую загрузку и устанавливаем новую
      currD?.abort('Download is stale')
      setDownload(startMediaD.download)
      m = { ...m, ...startMediaD }
      
      // Здесь загрузка не должна отменяться, даже если её не нашли
      const updateMedia = ({
        updateMedia, updateDownload, removeDownload,
      }: {
        updateMedia?: Partial<MediaDownloadable>
        updateDownload?: Partial<MediaOperation>
        removeDownload?: boolean
      }) => {
        const currD = getDownload()
        if (currD && currD.id === startMediaD.download.id) {
          setDownload({ ...currD, ...updateDownload })
          if (removeDownload) setDownload(undefined)
        }
        setMedia(m => {
          if (m && m.download?.id === startMediaD.download.id) {
            return {
              ...m,
              ...updateMedia,
              ...updateDownload && m.download && {
                download: { ...m.download, ...updateDownload },
              },
              ...removeDownload && { download: undefined },
            }
          }
          return m
        })
      }
      const updateMediaThrottled = withThrottle(
        RangeU.random(1500, 2300), updateMedia,
      )
      
      ;(async () => {
        try {
          const progress = new StageProgress(2, [90, 10])
          const onProgress = (p = 0) => {
            progress.progress = p
            //console.log('progress', progress.value)
            updateMediaThrottled({ updateDownload: { progress: progress.value } })
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
          updateMedia({ updateMedia: { isReady: true, dataUrl }, removeDownload: true })
        }
        catch (ex) {
          if (abortCtrl.signal.aborted) {
            //console.log('download aborted:', abortCtrl.signal.reason)
            updateMedia({ removeDownload: true })
            return
          }
          if (ApiUtils.isConnectionError(ex)) {
            updateMedia({
              updateMedia: { downloadError: ex, needRetryDownload: true },
              removeDownload: true,
            })
            return
          }
          
          //console.log('download error', ex)
          updateMedia({ updateMedia: { downloadError: ex }, removeDownload: true })
        }
      })()
      
      return m
    })
  }, [media])
  
  
  useEffect(() => {
    return () => setMedia(m => {
      m?.download?.abort('Component-downloader was unmounted')
      setDownload(undefined)
      return { ...m, download: undefined }
    })
  }, [])
  
}



