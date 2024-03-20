import React from 'react'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import FindPairsPage from 'src/pages/FindPairs/FindPairsPage'




const FindPairsEmpty =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  
  return auth
    ? <FindPairsPage/>
    : <Navigate
        to={RootRoute.login[fullAllowedNameParams]({
          returnPath: RootRoute.findPairs[fullAnySearchParams](searchParams)
        })}
        replace={true}
      />
})



// path: 'findPairs / <check here>'
export const findPairsRouting: RouteObject[] = [
  {
    path: '',
    Component: FindPairsEmpty
  },
  clearUnknownPathEnding,
]