import { ArrayU } from '@util/common/ArrayU.ts'
import { AsyncU } from '@util/common/AsyncU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { FileU } from '@util/file/FileU.ts'
import { StageProgress } from '@util/progress/StageProgress.ts'
import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import { useAsyncEffect } from '@util/react/useAsyncEffect.ts'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { ApiUtils } from 'src/api/ApiUtils.ts'
import { AuthApi } from 'src/api/requests/AuthApi.ts'
import { ProfileShowcaseApi } from 'src/api/requests/ProfileShowcaseApi.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { Navigate, RouteObject, useSearchParams } from 'react-router'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import {
  MediaDownloadable,
  MediaOperation,
  newDefaultMediaOperation,
} from 'src/ui-data/models/media/Media.ts'
import { FindCouplePageItem } from 'src/ui/2-pages/FindCouple/FindCouplePage.tsx'
import { currentUserPhotosToProfilePhotos } from 'src/ui/2-pages/Profile/actions.ts'
import { ProfilePhoto } from 'src/ui/2-pages/Profile/ProfilePage.model.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import wait = AsyncU.wait
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import withThrottle = AsyncU.withThrottle
import blobToDataUrl = FileU.blobToDataUrl
import fetchToBlob = FileU.fetchToBlob

const FindCouplePage = React.lazy(
  () => import('src/ui/2-pages/FindCouple/FindCouplePage.tsx')
)




const photos = [
  {
    type: 'local', isEmpty: false, id: '0',
    remoteUrl: '', name: '0', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[0],
    isInited: true, isReady: true, remoteI: 0,
  },
  {
    type: 'local', isEmpty: false, id: '1',
    remoteUrl: '', name: '1', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[1],
    isInited: true, isReady: true, remoteI: 1,
  },
  {
    type: 'local', isEmpty: false, id: '2',
    remoteUrl: '', name: '2', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[2],
    isInited: true, isReady: true, remoteI: 2,
  },
  {
    type: 'local', isEmpty: false, id: '3',
    remoteUrl: '', name: '3', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[3],
    isInited: true, isReady: true, remoteI: 3,
  },
  {
    type: 'local', isEmpty: false, id: '4',
    remoteUrl: '', name: '4', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[4],
    isInited: true, isReady: true, remoteI: 4,
  },
  {
    type: 'local', isEmpty: false, id: '5',
    remoteUrl: '', name: '5', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[5],
    isInited: true, isReady: true, remoteI: 5,
  },
] as ProfilePhoto[]
const data = [
  {
    photos,
    name: 'Test',
    birthDate: '2000-10-10',
    gender: 'MALE' as const,
    aboutMe: 'Тестовое описание 1',
  },
  {
    photos: photos.map((p, i) => ({ ...p, dataUrl: MockData.images.sixImages2[i] })),
    name: 'test',
    birthDate: '2000-10-10',
    gender: 'MALE' as const,
    aboutMe: 'Тестовое описание 2',
  },
  /* {
   photos: [photos[2], ...photos.slice(1)],
   name: 'test',
   birthDate: '2000-10-10',
   gender: 'MALE' as const,
   aboutMe: 'Тестовое описание 3',
   }, */
]
const FindCouplePageWithItems = React.memo(() => {
  
  const [items, setItems] = useState(undefined as FindCouplePageItem[] | undefined)
  
  
  //wait(500, () => setItems(data))
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: { },
    failedFields: [],
    prepareAndRequest: useCallback(() => {
      return ProfileShowcaseApi.listAll()
    }, []),
  })
  
  useEffect(() => {
    request()
  }, [])
  
  
  useEffect(() => {
    if (isSuccess && response?.isSuccess) {
      setItems((response.data.items as any[]).map(it => {
        return {
          photos: currentUserPhotosToProfilePhotos(it.photos),
          name: it.name,
          birthDate: it.birthDate,
          gender: it.gender,
          aboutMe: it.aboutMe,
        }
      }))
    }
  }, [isSuccess])
  
  /*
  // todo it retries endlessly if can't obtain photos
  useAsyncEffect((lock, unlock) => {
    //return;
    const photos = items?.flatMap(it => it.photos) ?? []
    ;[...photos].forEach(photo => {
      if (!photo.isEmpty && photo.type === 'remote' && !photo.isReady
        && !photo.download && !photo.conversion
        && lock(photo.remoteUrl)
      ) {
        const fetchToBlobAbortCtrl = new AbortController()
        const blobToDataUrlAbortCtrl = new AbortController()
        const abortCtrl = new AbortController()
        abortCtrl.signal.onabort = function() {
          fetchToBlobAbortCtrl.abort(this.reason)
          blobToDataUrlAbortCtrl.abort(this.reason)
        }
        const downloadStart = {
          isInited: true,
          isReady: false,
          download: { ...newDefaultMediaOperation(),
            id: photo.id,
            showProgress: true,
            abort: reason => abortCtrl.abort(reason),
          },
        } satisfies Partial<ProfilePhoto>
        
        setItems(items => {
          return items?.map(it => ({
            ...it,
            photos: mapFirstToIfFoundBy(it.photos,
              elem => ({ ...elem, ...downloadStart }),
              elem => elem.id === photo.id
            ),
          }))
        })
        
        const updatePhoto = (
          photoUpdate?: Partial<ProfilePhoto>,
          downloadUpdate?: Partial<MediaOperation>,
        ) => {
          setItems(items => {
            return items?.map(it => ({
              ...it,
              photos: mapFirstToIfFoundBy(it.photos,
                photo => ({ ...photo,
                  ...photoUpdate,
                  ...downloadUpdate && photo.download && {
                    download: { ...photo.download, ...downloadUpdate },
                  },
                }),
                elem => elem.download?.id === downloadStart.download.id
              ),
            }))
          })
        }
        const updatePhotoThrottled = withThrottle(
          RangeU.random(1500, 2300), updatePhoto
        )
        
        ;(async () => {
          try {
            const progress = new StageProgress(2, [90, 10])
            const onProgress = (p = 0) => {
              progress.progress = p
              //console.log('progress', photo.id, progress.value)
              updatePhotoThrottled(undefined, { progress: progress.value })
            }
            
            //console.log('start download id',photo.id)
            const blob = await fetchToBlob(photo.remoteUrl, {
              onProgress, abortCtrl: fetchToBlobAbortCtrl,
            })
            abortCtrl.signal.throwIfAborted()
            
            progress.stage++
            progress.progress = 0
            const dataUrl = await blobToDataUrl(blob,
              { onProgress, abortCtrl: blobToDataUrlAbortCtrl }
            )
            abortCtrl.signal.throwIfAborted()
            
            //console.log('completed',photo.id)
            updatePhoto({ isReady: true, download: undefined, dataUrl })
          }
          catch (ex) {
            if (abortCtrl.signal.aborted) {
              console.log('download aborted:', abortCtrl.signal.reason)
              return
            }
            // TODO notify about error
            console.log('download error', ex)
            //console.log('photo', photo)
            updatePhoto({ download: undefined, downloadError: ex })
          }
          finally {
            unlock(photo.remoteUrl)
          }
        })()
        
      }
    })
  }, [items])
   */
  
  
  
  if (!items) return <div>Loading...</div>
  
  return <FindCouplePage items={items} />
})



const RouteFindCouple = React.memo(() => {
  
  const [searchParams] = useSearchParams()
  const isAuth = useAuthZustand(s => s.getIsAuth())
  
  if (!isAuth) return (
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.findCouple[fullAnySearchParams](searchParams),
      })}
      replace={true}
    />
  )
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindCouplePageWithItems />
    </Suspense>
  )
})



// path: 'findCouple / ...'
export const findCoupleRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteFindCouple,
  },
  clearUnknownPathEnding,
]
