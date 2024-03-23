import React from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils.tsx'
import PwdChangePage from 'src/ui/pages/PwdChange/PwdChangePage.tsx'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams



const SettingsPwdChangeEmpty =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  
  return auth
    ? <PwdChangePage/>
    : <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.settings.pwdChange[fullAnySearchParams](searchParams)
      })}
      replace={true}
    />
})



// path: 'settings / pwdChange / <check here>'
export const settingsPwdChangeRouting: RouteObject[] = [
  {
    path: '',
    Component: SettingsPwdChangeEmpty
  },
  clearUnknownPathEnding,
]