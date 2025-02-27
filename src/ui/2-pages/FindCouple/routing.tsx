import React, { Suspense } from 'react'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams

const FindCouplePage = React.lazy(
  () => import('src/ui/2-pages/FindCouple/FindCouplePage.tsx')
)




const RouteFindCouple = React.memo(() => {
  
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  
  if (!auth) return (
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.findCouple[fullAnySearchParams](searchParams),
      })}
      replace={true}
    />
  )
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindCouplePage />
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
