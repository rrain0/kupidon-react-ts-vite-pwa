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
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileSummaryPage />
    </Suspense>
  )
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePage />
    </Suspense>
  )
})



const RouteProfileIdUserIdAny = React.memo(() => {
  const [searchParams] = useSearchParams()
  const userIdRoute = RootRoute.profile.id.userId[use](':userId')
  const urlUserId = useMatch(userIdRoute[full]()+'/*')!.params['userId']!
  
  return (
    <Navigate
      to={RootRoute.profile.id.userId[use](urlUserId).summary[fullAnySearchParams](searchParams)}
      replace={true}
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
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.profile[fullAnySearchParams](searchParams),
      })}
      replace={true}
    />
  )
  
  return (
    <Navigate
      to={RootRoute.profile.id.userId[use](authId)[fullAnySearchParams](searchParams)}
      replace={true}
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





const RouteProfileAny = React.memo(() => {
  const [searchParams] = useSearchParams()
  return (
    <Navigate
      to={RootRoute.profile.id[fullAnySearchParams](searchParams)}
      replace={true}
    />
  )
})



// path: 'profile / ...'
export const routingProfile: RouteObject[] = [
  {
    path: RootRoute.profile.id[path]+'/*',
    children: routingProfileId,
  },
  {
    path: '*',
    Component: RouteProfileAny,
  },
]

