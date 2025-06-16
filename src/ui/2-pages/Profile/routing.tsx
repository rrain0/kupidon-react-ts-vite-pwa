import React, { Suspense } from 'react'
import {
  Link,
  Navigate,
  RouteObject,
  useMatch,
  useSearchParams,
} from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import full = RouteBuilder.full

const ProfileSummaryPage = React.lazy(() => import('src/ui/2-pages/Profile/ProfileSummary/ProfileSummaryPage.tsx'))
const ProfilePage = React.lazy(() => import('src/ui/2-pages/Profile/ProfilePage.tsx'))



const RouteProfileIdUserIdTab = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authId = useAuthZustand(s => s.user?.id)
  const tabRoute = RootRoute.profile.id.userId[use](':userId').profile[use](':tab')
  const params = useMatch(tabRoute[full]()+'/*')?.params
  const urlUserId = params?.['userId']
  const tab = params?.['tab']
  const summary = RootRoute.profile.id.userId.summary[path]
  
  if (urlUserId !== authId) return (
    <div>
      <div>Просмотр чужого профиля пока что не реализован.</div>
      <Link
        to={RootRoute.login[fullAllowedNameParams]({
          returnPath: RootRoute.profile[fullAnySearchParams](searchParams),
        })}
      >
        <button>Войти</button>
      </Link>
    </div>
  )
  
  if (tab === summary) return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ProfileSummaryPage/>
    </Suspense>
  )
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ProfilePage/>
    </Suspense>
  )
})



const RouteProfileIdUserIdAny = React.memo(() => {
  const userIdRoute = RootRoute.profile.id.userId[use](':userId')
  const urlUserId = useMatch(userIdRoute[full]()+'/*')!.params['userId']!
  
  return (
    <AppNavigate
      toFull={RootRoute.profile.id.userId[use](urlUserId).summary}
      replace
    />
  )
})



// path: 'profile / id / :userId / <check-here>'
const routingProfileIdUserId: RouteObject[] = [
  {
    path: RootRoute.profile.id.userId.summary[path]+'/*',
    Component: RouteProfileIdUserIdTab,
  },
  {
    path: RootRoute.profile.id.userId.preview[path]+'/*',
    Component: RouteProfileIdUserIdTab,
  },
  {
    path: RootRoute.profile.id.userId.profile[path]+'/*',
    Component: RouteProfileIdUserIdTab,
  },
  {
    path: RootRoute.profile.id.userId.tests[path]+'/*',
    Component: RouteProfileIdUserIdTab,
  },
  {
    path: '*',
    Component: RouteProfileIdUserIdAny,
  },
]




const RouteProfileId = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authId = useAuthZustand(s => s.user?.id)
  
  if (!authId) return (
    <AppNavigate
      toFull={RootRoute.login}
      allowedNamedParams={{
        returnPath: RootRoute.profile[fullAnySearchParams](searchParams),
      }}
      replace
    />
  )
  
  return (
    <AppNavigate
      toFull={RootRoute.profile.id.userId[use](authId)}
      replace
    />
  )
})



// path: 'profile / id / ...'
export const routingProfileId: RouteObject[] = [
  {
    path: '',
    Component: RouteProfileId,
  },
  {
    path: RootRoute.profile.id.userId[path]+'/*',
    children: routingProfileIdUserId,
  },
]




// path: 'profile / ...'
export const routingProfile: RouteObject[] = [
  {
    path: RootRoute.profile.id[path]+'/*',
    children: routingProfileId,
  },
  {
    path: '*',
    element: <AppNavigate toFull={RootRoute.profile.id} replace/>,
  },
]

