import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import React, { Suspense } from 'react'
import {
  RouteObject,
  useSearchParams,
} from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import use = RouteBuilder.use

const MbtiPage = React.lazy(
  () => import('src/ui/2-pages/Test/Mbti/MbtiTestingPage.tsx')
)




const RouteTestMbti = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authUserId = useAuthZustand(s => s.user?.id)
  
  if (!authUserId) return (
    <AppNavigate
      toFull={RootRoute.login}
      allowedNamedParams={{ returnPath: RootRoute.test[fullAnySearchParams](searchParams) }}
      replace={true}
    />
  )
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <MbtiPage/>
    </Suspense>
  )
})



// path: 'test / mbti / ...'
export const routingTestMbti: RouteObject[] = [
  {
    path: '',
    Component: RouteTestMbti,
  },
  clearUnknownPathEnding,
]





const RouteTest = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authUserId = useAuthZustand(s => s.user?.id)
  
  if (!authUserId) return (
    <AppNavigate
      toFull={RootRoute.login}
      allowedNamedParams={{ returnPath: RootRoute.test[fullAnySearchParams](searchParams) }}
      replace={true}
    />
  )
  
  return (
    <AppNavigate
      toFull={RootRoute.profile.id.userId[use](authUserId).tab.tests}
      replace={true}
    />
  )
})



// path: 'test / ...'
export const routingTest: RouteObject[] = [
  {
    path: '',
    Component: RouteTest,
  },
  {
    path: RootRoute.test.mbti[path]+'/*',
    children: routingTestMbti,
  },
  clearUnknownPathEnding,
]

