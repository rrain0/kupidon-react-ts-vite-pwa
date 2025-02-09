import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import React, { Suspense } from 'react'
import {
  Navigate,
  RouteObject,
  useSearchParams,
} from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import use = RouteBuilder.use

const MbtiPage = React.lazy(
  () => import('src/ui/2-pages/Test/Mbti/MbtiTestingPage.tsx')
)




const TestMbtiEmpty = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authUserId = useRecoilValue(AuthRecoil)?.user.id
  
  if (!authUserId) return (
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.test.mbti[fullAnySearchParams](searchParams),
      })}
      replace={true}
    />
  )
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MbtiPage />
    </Suspense>
  )
})



// path: 'test / mbti / <check here>'
export const testMbtiRouting: RouteObject[] = [
  {
    path: '',
    Component: TestMbtiEmpty,
  },
  clearUnknownPathEnding,
]





const TestEmpty = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authUserId = useRecoilValue(AuthRecoil)?.user.id
  
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



// path: 'test / <check here>'
export const testRouting: RouteObject[] = [
  {
    path: '',
    Component: TestEmpty,
  },
  {
    path: RootRoute.test.mbti[path]+'/*',
    children: testMbtiRouting,
  },
  clearUnknownPathEnding,
]

