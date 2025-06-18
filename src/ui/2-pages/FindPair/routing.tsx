import { AsyncU } from '@util/common/AsyncU.ts'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { UsersApi } from 'src/api/requests/UsersApi.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import { RouteObject } from 'react-router'
import { MediaInArrayDUC } from 'src/ui-data/models/media/Media.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import {
  ProfileCardsStackListItem,
} from 'src/ui/1-widgets/ProfileCards/ProfileCardsStackList.tsx'
import { currentUserPhotosToProfilePhotos } from 'src/ui/2-pages/Profile/actions.ts'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import wait = AsyncU.wait

const FindPairPage = React.lazy(
  () => import('src/ui/2-pages/FindPair/FindPairPage.tsx')
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





const FindPairPageWithItems = React.memo(() => {
  
  const [items, setItems] = useState(undefined as ProfileCardsStackListItem[] | undefined)
  
  
  //wait(500, () => setItems(data))
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: { },
    prepareAndRequest: useCallback(() => {
      return UsersApi.get()
    }, []),
  })
  
  useEffect(() => {
    request()
  }, [])
  
  
  useEffect(() => {
    if (isSuccess && response?.isSuccess) {
      setItems(response.data.users.map(it => {
        return {
          id: it.id,
          photos: currentUserPhotosToProfilePhotos(it.photos),
          name: it.name,
          birthDate: it.birthDate,
          gender: it.gender,
          aboutMe: it.aboutMe,
        }
      }))
    }
  }, [isSuccess])
  
  
  if (!items) return <Flex fullW h='100dvh' center>Загрузка...</Flex>
  
  return <FindPairPage items={items}/>
})



const RouteFindPair = React.memo(() => {
  
  const isAuth = useAuthZustand(s => s.getIsAuth())
  
  if (!isAuth) return (
    <AppNavigate
      toFull={RootRoute.login}
      allowedNamedParams={{ returnPath: RootRoute.findPair }}
      replace={true}
    />
  )
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <FindPairPageWithItems/>
    </Suspense>
  )
})



// path: 'find-pair / ...'
export const routingFindPair: RouteObject[] = [
  {
    path: '',
    Component: RouteFindPair,
  },
  clearUnknownPathEnding,
]
