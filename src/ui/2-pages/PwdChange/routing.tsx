import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams

const PwdChangePage = React.lazy(
  () => import('src/ui/2-pages/PwdChange/PwdChangePage.tsx')
)



const RouteSettingsPwdChange = React.memo(() => {
  
  const [searchParams] = useSearchParams()
  const isAuth = useAuthZustand(s => s.getIsAuth())
  
  if (!isAuth) return (
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



// path: 'settings / pwdChange / ...'
export const routingSettingsPwdChange: RouteObject[] = [
  {
    path: '',
    Component: RouteSettingsPwdChange,
  },
  clearUnknownPathEnding,
]
