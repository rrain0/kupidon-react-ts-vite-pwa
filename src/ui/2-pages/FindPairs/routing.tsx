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

const FindPairsPage = React.lazy(() => import('src/ui/2-pages/FindPairs/FindPairsPage'))




const FindPairsEmpty =
  React.memo(
    () => {
      const [searchParams] = useSearchParams()
      const auth = useRecoilValue(AuthRecoil)
      
      if (!auth) return (
        <Navigate
          to={RootRoute.login[fullAllowedNameParams]({
            returnPath: RootRoute.findPairs[fullAnySearchParams](searchParams),
          })}
          replace={true}
        />
      )
      
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <FindPairsPage/>
        </Suspense>
      )
    }
  )



// path: 'findPairs / <check here>'
export const findPairsRouting: RouteObject[] = [
  {
    path: '',
    Component: FindPairsEmpty,
  },
  clearUnknownPathEnding,
]
