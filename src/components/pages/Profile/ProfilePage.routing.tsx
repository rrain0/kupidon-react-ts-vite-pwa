import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import React, { Suspense } from 'react'
import {
  Outlet,
  RouteObject,
  useMatch,
} from 'react-router'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import AppNavigate from 'src/components/components/app-router/AppNavigate.tsx'
import CheckAuth from 'src/components/components/app-router/CheckAuth.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import use = RouteBuilder.use
import full = RouteBuilder.full

const ProfileSummaryPage = React.lazy(() => import(
  'src/components/pages/Profile/ProfileSummary/ProfileSummaryPage.tsx'
))
const ProfileSharePage = React.lazy(() => import(
  'src/components/pages/Profile/ProfileShare/ProfileSharePage.tsx'
))
const ProfileOverviewPage = React.lazy(() => import(
  'src/components/pages/Profile/ProfileOverview/ProfileOverviewPage.tsx'
))
const ProfilePage = React.lazy(() => import('src/components/pages/Profile/ProfilePage.tsx'))




const RouteProfileIdUserIdTab = React.memo(() => {
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ProfilePage/>
    </Suspense>
  )
})



const RouteProfileIdUserIdTabAny = React.memo(() => {
  const userIdRoute = RootRoute.profile.id.userId[use](':userId')
  const urlUserId = useMatch(`${userIdRoute[full]()}/*`)!.params['userId']!
  
  return (
    <AppNavigate
      toFull={RootRoute.profile.id.userId[use](urlUserId).tab.edit}
      replace
    />
  )
})



const RouteProfileIdUserIdOverview = React.memo(() => {
  const userIdRoute = RootRoute.profile.id.userId[use](':userId')
  const urlUserId = useMatch(`${userIdRoute[full]()}/*`)!.params['userId']!
  
  return (
    <ProfileOverviewPage userId={urlUserId}/>
  )
})



const RouteProfileIdUserIdAny = React.memo(() => {
  const userIdRoute = RootRoute.profile.id.userId[use](':userId')
  const urlUserId = useMatch(`${userIdRoute[full]()}/*`)!.params['userId']!
  
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
      <CheckAuth>
        <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
          <ProfileSummaryPage/>
        </Suspense>
      </CheckAuth>
    ),
  },
  clearUnknownPathEnding,
]

// path: 'profile / id / :userId / share / ...'
const routingProfileIdUserIdShare: RouteObject[] = [
  {
    path: '',
    element: (
      <CheckAuth>
        <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
          <ProfileSharePage/>
        </Suspense>
      </CheckAuth>
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
    path: `${RootRoute.profile.id.userId.tab.preview[path]}/*`,
    children: routingProfileIdUserIdTabTab,
  },
  {
    path: `${RootRoute.profile.id.userId.tab.edit[path]}/*`,
    children: routingProfileIdUserIdTabTab,
  },
  {
    path: `${RootRoute.profile.id.userId.tab.tests[path]}/*`,
    children: routingProfileIdUserIdTabTab,
  },
  {
    path: '*',
    Component: RouteProfileIdUserIdTabAny,
  },
  clearUnknownPathEnding,
]





const RouteProfileIdUserId = React.memo(() => {
  const authId = useAuthZustand(s => s.user?.id)
  
  const userIdRoute = RootRoute.profile.id.userId[use](':userId')
  const userIdMatch = useMatch(`${userIdRoute[full]()}/*`)
  const urlUserId = userIdMatch?.params?.['userId']
  
  const overviewRoute = userIdRoute.overview
  const overviewMatch = useMatch(`${overviewRoute[full]()}/*`)
  
  if (!overviewMatch && urlUserId !== authId) return (
    <AppNavigate
      toFull={RootRoute.profile.id.userId[use](urlUserId!).overview}
      replace
    />
  )
  
  return <Outlet/>
})
// path: 'profile / id / :userId / ...'
const routingProfileIdUserId: RouteObject[] = [
  {
    path: `${RootRoute.profile.id.userId.summary[path]}/*`,
    children: routingProfileIdUserIdSummary,
  },
  {
    path: `${RootRoute.profile.id.userId.tab[path]}/*`,
    children: routingProfileIdUserIdTab,
  },
  {
    path: `${RootRoute.profile.id.userId.share[path]}/*`,
    children: routingProfileIdUserIdShare,
  },
  {
    path: `${RootRoute.profile.id.userId.overview[path]}/*`,
    children: routingProfileIdUserIdOverview,
  },
  {
    path: '*',
    Component: RouteProfileIdUserIdAny,
  },
]




const RouteProfileId = React.memo(() => {
  const authId = useAuthZustand(s => s.user?.id)
  
  return (
    <CheckAuth>
      <AppNavigate
        toFull={RootRoute.profile.id.userId[use](authId!)}
        replace
      />
    </CheckAuth>
  )
})



// path: 'profile / id / ...'
export const routingProfileId: RouteObject[] = [
  {
    path: '',
    Component: RouteProfileId,
  },
  {
    path: `${RootRoute.profile.id.userId[path]}/*`,
    Component: RouteProfileIdUserId,
    children: routingProfileIdUserId,
  },
]




// path: 'profile / ...'
export const routingProfile: RouteObject[] = [
  {
    path: `${RootRoute.profile.id[path]}/*`,
    children: routingProfileId,
  },
  {
    path: '*',
    element: <AppNavigate toFull={RootRoute.profile.id} replace/>,
  },
]

