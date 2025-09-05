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
import { SetterOrUpdater } from 'src/utils/base/typeUtils.ts'



export const useMediaDownload = <T extends MediaDownloadable | undefined>(
  media: T, setMedia: SetterOrUpdater<T>,
) => {
  
  const [getDownload, setDownload] = useRefGetSet<MediaOperation | undefined>(undefined)
  
  useEffect(() => {
    setMedia(m => {
      const savedD = getDownload()
      let usedDownload: MediaOperation | undefined
      
      
      m = (() => {
        // Нет медиа
        if (!m) return m
        
        const mediaD = m.download
        let usedD = mediaD && savedD && mediaD.id === savedD.id ? savedD : undefined
        
        // Если для загрузки в медиа есть сохранённая загрузка, то используем её.
        // При необходимости станавливаем, что начинать загрузку не нужно.
        if (mediaD && usedD && mediaD.id === usedD.id) {
          usedDownload = usedD
          if (m.needDownload) return { ...m, needDownload: false }
          return m
        }
        
        // Начинать загрузку не нужно и сохранённых загрузок в медиа нет
        if (!m.needDownload) return m
        
        
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
        
        usedD = savedD && savedD.id === startMediaD.download.id ? savedD : undefined
        
        // Если уже есть такая же сохранённая загрузка, то используем её
        if (usedD && usedD.id === startMediaD.download.id) {
          usedDownload = usedD
          startMediaD.download = usedD
          return { ...m, ...startMediaD }
        }
        
        // Устанавливаем новую загрузку
        usedDownload = startMediaD.download
        m = { ...m, ...startMediaD }
        
        // Здесь загрузка не должна отменяться, даже если её не нашли
        // Сохранённую загрузку удаляем не здесь
        const updateMedia = ({
          updateMedia, updateDownload, removeDownload,
        }: {
          updateMedia?: Partial<MediaDownloadable>
          updateDownload?: Partial<MediaOperation>
          removeDownload?: boolean
        }) => {
          const savedD = getDownload()
          if (savedD && savedD.id === startMediaD.download.id) {
            setDownload({ ...savedD, ...updateDownload })
          }
          setMedia(m => {
            if (m?.download && m.download.id === startMediaD.download.id) {
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
      })()
      
      if (savedD && (!usedDownload || savedD.id !== usedDownload.id)) {
        savedD.abort('Download is stale')
      }
      setDownload(usedDownload)
      
      return m
    })
  }, [media])
  
  
  useEffect(() => {
    return () => setMedia(m => {
      setDownload(undefined)
      m?.download?.abort('Component-downloader was unmounted')
      return { ...m, download: undefined }
    })
  }, [])
  
}



