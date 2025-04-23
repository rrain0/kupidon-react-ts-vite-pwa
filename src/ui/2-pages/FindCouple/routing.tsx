import { AsyncU } from '@util/common/AsyncU.ts'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { ProfileShowcaseApi } from 'src/api/requests/ProfileShowcaseApi.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { Navigate, RouteObject, useSearchParams } from 'react-router'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { MediaInArrayDUC } from 'src/ui-data/models/media/Media.ts'
import { FindCouplePageItem } from 'src/ui/2-pages/FindCouple/FindCouplePage.tsx'
import { currentUserPhotosToProfilePhotos } from 'src/ui/2-pages/Profile/actions.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import wait = AsyncU.wait

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
] as MediaInArrayDUC[]
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
  
  
  // TODO Download -  make generic photo update.
  //  Need save current dataUrl or download if photo the same
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
