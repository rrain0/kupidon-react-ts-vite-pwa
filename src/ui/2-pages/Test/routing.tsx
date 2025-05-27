import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import React, { Suspense } from 'react'
import {
  Navigate,
  RouteObject,
  useSearchParams,
} from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import use = RouteBuilder.use

const MbtiPage = React.lazy(
  () => import('src/ui/2-pages/Test/Mbti/MbtiTestingPage.tsx')
)




const RouteTestMbti = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authUserId = useAuthZustand(s => s.user?.id)
  
  if (!authUserId) return (
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.test.mbti[fullAnySearchParams](searchParams),
      })}
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
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.test[fullAnySearchParams](searchParams),
      })}
      replace={true}
    />
  )
  
  return (
    <Navigate
      to={RootRoute.profile.id.userId[use](authUserId)
        .tests[fullAnySearchParams](searchParams)
      }
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

