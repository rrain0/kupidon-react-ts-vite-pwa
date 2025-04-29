import { ArrayU } from '@util/common/ArrayU.ts'
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
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import SetterOrUpdater = TypeU.SetterOrUpdater



// Если начнётся несколько загрузок с одинаковым урлом одновременно,
// то это не проблема, потому что браузер кэширует.


export const useMediaArrayDownload = <T extends MediaDownloadable | undefined>(
  medias: T[] | undefined, setMedias: SetterOrUpdater<T[] | undefined>,
) => {
  
  type Downloads = Map<string, { cnt: number, download: MediaOperation }>
  const [getDownloads, setDownloads] = useRefGetSet<Downloads>(new Map())
  
  useEffect(() => {
    setMedias(medias => {
      // const currDownloads = getDownloads()
      // const newDownloads: Downloads = new Map()
      
      const newMedias = ArrayU.mapToIf(medias, m => {
        if (!m) return m
        const mediaD = m.download
        // const newDownload = newDownloads.get(mediaD?.id as any) ?? (() => {
        //   const currD = currDownloads.get(mediaD?.id as any)?.download
        //   if (currD) return { cnt: 0, download: currD }
        // })()
        if (!m.needDownload) {
          // if (mediaD && newDownload && mediaD.id === newDownload.download.id) {
          //   newDownload.cnt++
          //   newDownloads.set(mediaD.id, newDownload)
          // }
          return m
        }
        
        
        const fetchToBlobAbortCtrl = new AbortController()
        const blobToDataUrlAbortCtrl = new AbortController()
        const abortCtrl = new AbortController()
        abortCtrl.signal.onabort = function() {
          fetchToBlobAbortCtrl.abort(this.reason)
          blobToDataUrlAbortCtrl.abort(this.reason)
        }
        const abortOperation = reason => abortCtrl.abort(reason)
        
        const downloadStart = {
          isReady: false,
          needDownload: false,
          download: { ...newDefaultMediaOperation(),
            id: m.id,
            abort: reason => abortOperation(reason),
          },
          downloadError: undefined,
        } satisfies Partial<MediaDownloadable>
        
        // Если уже есть такая же загрузка, то пусть продолжается
        if (m.download?.id === downloadStart.download.id) return m
        
        // Отменяем предыдущую загрузку и устанавливаем новую
        // TODO Download - Тут хз, отменять её тут или это должны делать снаружи
        m.download?.abort('Download is stale')
        m = { ...m, ...downloadStart }
        
        const updateMedia = ({
          updateMedia, updateDownload, removeDownload,
        }: {
          updateMedia?: Partial<MediaDownloadable>,
          updateDownload?: Partial<MediaDownloadable['download']>,
          removeDownload?: boolean,
        }) => {
          // TODO Download - Если 2 медиа с одинаковым id, то до второго медиа мы никогда не доберёмся
          // TODO Если не нашли загрузку при обновлении, то отменить её? Или пусть снаружи отменяют?
          setMedias(medias => mapFirstToIfFoundBy({
            arr: medias,
            filter: m => m && m.download?.id === downloadStart.download.id,
            mapper: m => m && ({
              ...m,
              ...updateMedia,
              ...updateDownload && m.download && {
                download: { ...m.download, ...updateDownload },
              },
              ...removeDownload && { download: undefined },
            }),
          }))
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
            updateMedia({ updateMedia: { isReady: true, dataUrl }, removeDownload: true })
          }
          catch (ex) {
            if (abortCtrl.signal.aborted) {
              console.log('download aborted:', abortCtrl.signal.reason)
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
      
      return newMedias
    })
  }, [medias])
  
  
  useEffect(() => {
    return () => setMedias(medias => {
      return medias?.map(m => {
        m?.download?.abort('Component-downloader was unmounted')
        return { ...m, download: undefined }
      })
    })
  }, [])
}



