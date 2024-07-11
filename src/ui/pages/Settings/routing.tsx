import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { settingsAccountRouting } from 'src/ui/pages/AccountSettings/routing'
import { settingsApplicationRouting } from 'src/ui/pages/ApplicationSettings/routing'
import { settingsPwdChangeRouting } from 'src/ui/pages/PwdChange/routing.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path





// path: 'settings / <check here>'
export const settingRouting: RouteObject[] = [
  {
    path: '',
    children: settingsApplicationRouting,
  },
  {
    path: RootRoute.settings.account[path]+'/*',
    children: settingsAccountRouting,
  },
  {
    path: RootRoute.settings.app[path]+'/*',
    children: settingsApplicationRouting,
  },
  {
    path: RootRoute.settings.pwdChange[path]+'/*',
    children: settingsPwdChangeRouting,
  },
  clearUnknownPathEnding,
]

