import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import { settingsAccountRouting } from 'src/pages/AccountSettings/routing'
import { settingsApplicationRouting } from 'src/pages/ApplicationSettings/routing'
import { settingsPwdChangeRouting } from 'src/pages/PwdChange/routing'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
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

