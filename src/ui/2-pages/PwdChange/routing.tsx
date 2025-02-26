import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useNavBar } from 'src/ui/1-widgets/NavBar/useNavBar.ts'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams

const PwdChangePage = React.lazy(() => import('src/ui/2-pages/PwdChange/PwdChangePage.tsx'))



const SettingsPwdChangeEmpty = React.memo(() => {
  
  useNavBar({ place: 'settings' })
  
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  
  if (!auth) return (
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.settings.pwdChange[fullAnySearchParams](searchParams),
      })}
      replace={true}
    />
  )
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PwdChangePage />
    </Suspense>
  )
})



// path: 'settings / pwdChange / <check here>'
export const settingsPwdChangeRouting: RouteObject[] = [
  {
    path: '',
    Component: SettingsPwdChangeEmpty,
  },
  clearUnknownPathEnding,
]
