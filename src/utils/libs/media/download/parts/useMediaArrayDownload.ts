import { ArrayU } from 'src/utils/base/ArrayU.ts'
import { withThrottle } from 'src/utils/base/asyncUtils.ts'
import { random } from 'src/utils/base/math/randomUtils.ts'
import { FileU } from '@utils/file/FileU.ts'
import { StagedProgress } from 'src/utils/ui/StagedProgress.ts'
import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { useEffect } from 'react'
import { ApiResponseUtils } from '@libs/api/ApiResponseUtils.ts'
import {
  MediaDownloadable,
  MediaOperation,
  newDefaultMediaOperation,
} from '@libs/media/Media.ts'
import fetchToBlob = FileU.fetchToBlob
import blobToDataUrl = FileU.blobToDataUrl
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import { SetterOrUpdater } from 'src/utils/base/math/typeUtils.ts'



// Если начнётся несколько загрузок с одинаковым урлом одновременно,
// то это не проблема, потому что браузер кэширует.


export const useMediaArrayDownload = <T extends MediaDownloadable | undefined>(
  medias: T[] | undefined, setMedias: SetterOrUpdater<T[] | undefined>,
) => {
  
  type Downloads = Map<string, { cnt: number, download: MediaOperation }> | undefined
  const [getDownloads, setDownloads] = useRefGetSet<Downloads>(undefined)
  
  useEffect(() => {
    setMedias(medias => {
      const savedDownloads = getDownloads()
      const usedDownloads: Downloads = new Map()
      
      const newMedias = ArrayU.mapToIf(medias, m => {
        // Если нет медиа, то ничего не делаем
        if (!m) return m
        
        // Ищем загрузку сначала в используемых, потом в предыдущих
        const mediaD = m.download
        let usedDownload = usedDownloads.get(mediaD?.id as any) ?? (() => {
          const currD = savedDownloads?.get(mediaD?.id as any)?.download
          if (currD) return { cnt: 0, download: currD }
        })()
        
        // Если для загрузки в медиа есть сохранённая загрузка, то используем её.
        // При необходимости станавливаем, что начинать загрузку не нужно.
        if (mediaD && usedDownload && mediaD.id === usedDownload.download.id) {
          usedDownload.cnt++
          usedDownloads.set(usedDownload.download.id, usedDownload)
          if (m.needDownload) return { ...m, needDownload: false }
          return m
        }
        
        // Начинать загрузку не нужно и сохранённых загрузок в медиа нет
        if (!m.needDownload) return m
        
        
        const fetchToBlobAbortCtrl = new AbortController()
        const blobToDataUrlAbortCtrl = new AbortController()
        const abortCtrl = new AbortController()
        abortCtrl.signal.onabort = function() {
          fetchToBlobAbortCtrl.abort(this.reason)
          blobToDataUrlAbortCtrl.abort(this.reason)
        }
        const abortOperation = reason => abortCtrl.abort(reason)
        
        const startMediaD = {
          isReady: false,
          needDownload: false,
          download: { ...newDefaultMediaOperation(),
            id: m.id,
            abort: reason => abortOperation(reason),
          },
          downloadError: undefined,
        } satisfies Partial<MediaDownloadable>
        
        usedDownload = usedDownloads.get(startMediaD.download.id as any) ?? (() => {
          const currD = savedDownloads?.get(startMediaD.download.id as any)?.download
          if (currD) return { cnt: 0, download: currD }
        })()
        
        // Если уже есть такая же сохранённая загрузка, то используем её
        if (usedDownload && usedDownload.download.id === startMediaD.download.id) {
          startMediaD.download = usedDownload.download
          usedDownload.cnt++
          usedDownloads.set(usedDownload.download.id, usedDownload)
          return { ...m, ...startMediaD }
        }
        
        // Устанавливаем новую загрузку
        usedDownload = { cnt: 1, download: startMediaD.download }
        usedDownloads.set(usedDownload.download.id, usedDownload)
        m = { ...m, ...startMediaD }
        
        // Здесь загрузка не должна отменяться, даже если её не нашли
        // Сохранённую загрузку удаляем не здесь
        const updateMedia = ({
          updateMedia, updateDownload, removeDownload,
        }: {
          updateMedia?: Partial<MediaDownloadable>,
          updateDownload?: Partial<MediaDownloadable['download']>,
          removeDownload?: boolean,
        }) => {
          const savedDownload = getDownloads()?.get(startMediaD.download.id)
          if (savedDownload) {
            savedDownload.download = { ...savedDownload.download, ...updateDownload }
          }
          setMedias(medias => mapFirstToIfFoundBy({
            arr: medias,
            filter: m => m?.download && m.download.id === startMediaD.download.id,
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
          random(1500, 2300), updateMedia,
        )
        
        ;(async () => {
          try {
            const progress = new StagedProgress(2, [90, 10])
            const onProgress = (p = 0) => {
              progress.set(p)
              //console.log('progress', progress.value)
              updateMediaThrottled({ updateDownload: { progress: progress.value } })
            }
            
            //console.log('download started')
            const blob = await fetchToBlob(m.remoteUrl, {
              onProgress, abortCtrl: fetchToBlobAbortCtrl,
            })
            abortCtrl.signal.throwIfAborted()
            
            progress.set(0, { next: true })
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
            if (ApiResponseUtils.isConnectionError(ex)) {
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
      
      savedDownloads?.forEach((d, key) => {
        if (!usedDownloads.has(key)) d.download.abort('Download is stale')
      })
      setDownloads(usedDownloads.size ? usedDownloads : undefined)
      
      return newMedias
    })
  }, [medias])
  
  
  useEffect(() => {
    return () => setMedias(medias => {
      setDownloads(undefined)
      return medias?.map(m => {
        m?.download?.abort('Component-downloader was unmounted')
        return { ...m, download: undefined }
      })
    })
  }, [])
}



