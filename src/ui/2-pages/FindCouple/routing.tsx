import React, { Suspense } from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams

const FindCouplePage = React.lazy(
  () => import('src/ui/2-pages/FindCouple/FindCouplePage.tsx')
)




const RouteFindCouple = React.memo(() => {
  
  const [searchParams] = useSearchParams()
  const auth = useAuthZustand()
  
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
