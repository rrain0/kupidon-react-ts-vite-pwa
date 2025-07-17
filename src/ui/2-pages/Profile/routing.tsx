import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import React, { Suspense } from 'react'
import {
  RouteObject,
  useMatch,
  useSearchParams,
} from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import full = RouteBuilder.full

const ProfileSummaryPage = React.lazy(() => import(
  'src/ui/2-pages/Profile/ProfileSummary/ProfileSummaryPage.tsx'
))
const ProfileSharePage = React.lazy(() => import(
  'src/ui/2-pages/Profile/ProfileShare/ProfileSharePage.tsx'
))
const ProfileOverviewPage = React.lazy(() => import(
  'src/ui/2-pages/Profile/ProfileOverview/ProfileOverviewPage.tsx'
))
const ProfilePage = React.lazy(() => import('src/ui/2-pages/Profile/ProfilePage.tsx'))




const RouteProfileIdUserIdTab = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authId = useAuthZustand(s => s.user?.id)
  const tabRoute = RootRoute.profile
    .id.userId[use](':userId')
    .tab.edit[use](':tab')
  const params = useMatch(tabRoute[full]() + '/*')?.params
  const urlUserId = params?.['userId']
  //const tab = params?.['tab']
  
  
  
  if (urlUserId !== authId) return (
    <div>
      <div>Просмотр чужого профиля пока что не реализован.</div>
      <AppLink
        toFull={RootRoute.login}
        allowedNamedParams={{ returnPath: RootRoute.profile[fullAnySearchParams](searchParams) }}
      >
        <button>Войти</button>
      </AppLink>
    </div>
  )
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ProfilePage/>
    </Suspense>
  )
})



const RouteProfileIdUserIdTabAny = React.memo(() => {
  const userIdRoute = RootRoute.profile.id.userId[use](':userId')
  const urlUserId = useMatch(userIdRoute[full]()+'/*')!.params['userId']!
  
  return (
    <AppNavigate
      toFull={RootRoute.profile.id.userId[use](urlUserId).tab.edit}
      replace
    />
  )
})



const RouteProfileIdUserIdOverview = React.memo(() => {
  const userIdRoute = RootRoute.profile.id.userId[use](':userId')
  const urlUserId = useMatch(userIdRoute[full]()+'/*')!.params['userId']!
  
  return (
    <ProfileOverviewPage userId={urlUserId}/>
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




// path: 'profile / id / :userId / tab / :tab / ...'
const routingProfileIdUserIdTabTab: RouteObject[] = [
  {
    path: '',
    Component: RouteProfileIdUserIdTab,
  },
  clearUnknownPathEnding,
]




// path: 'profile / id / :userId / summary / ...'
const routingProfileIdUserIdSummary: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ProfileSummaryPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]

// path: 'profile / id / :userId / share / ...'
const routingProfileIdUserIdShare: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ProfileSharePage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]

// path: 'profile / id / :userId / overview / ...'
const routingProfileIdUserIdOverview: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <RouteProfileIdUserIdOverview/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]

// path: 'profile / id / :userId / tab / ...'
const routingProfileIdUserIdTab: RouteObject[] = [
  {
    path: RootRoute.profile.id.userId.tab.preview[path]+'/*',
    children: routingProfileIdUserIdTabTab,
  },
  {
    path: RootRoute.profile.id.userId.tab.edit[path]+'/*',
    children: routingProfileIdUserIdTabTab,
  },
  {
    path: RootRoute.profile.id.userId.tab.tests[path]+'/*',
    children: routingProfileIdUserIdTabTab,
  },
  {
    path: '*',
    Component: RouteProfileIdUserIdTabAny,
  },
  clearUnknownPathEnding,
]



// path: 'profile / id / :userId / ...'
const routingProfileIdUserId: RouteObject[] = [
  {
    path: RootRoute.profile.id.userId.summary[path]+'/*',
    children: routingProfileIdUserIdSummary,
  },
  {
    path: RootRoute.profile.id.userId.tab[path]+'/*',
    children: routingProfileIdUserIdTab,
  },
  {
    path: RootRoute.profile.id.userId.share[path]+'/*',
    children: routingProfileIdUserIdShare,
  },
  {
    path: RootRoute.profile.id.userId.overview[path]+'/*',
    children: routingProfileIdUserIdOverview,
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

