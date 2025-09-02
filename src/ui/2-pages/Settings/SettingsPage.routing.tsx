import { RouteObject } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import { routingSettingsAccount } from 'src/ui/2-pages/AccountSettings/AccountSettingsPage.routing.tsx'
import { routingSettingsApplication } from 'src/ui/2-pages/ApplicationSettings/ApplicationSettingsPage.routing.tsx'
import { routingSettingsPwdChange } from 'src/ui/2-pages/PwdChange/PwdChangePage.routing.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path





// path: 'settings / ...'
export const routingSettings: RouteObject[] = [
  {
    path: '',
    children: routingSettingsApplication,
  },
  {
    path: `${RootRoute.settings.account[path]}/*`,
    children: routingSettingsAccount,
  },
  {
    path: `${RootRoute.settings.app[path]}/*`,
    children: routingSettingsApplication,
  },
  {
    path: `${RootRoute.settings.pwdChange[path]}/*`,
    children: routingSettingsPwdChange,
  },
  clearUnknownPathEnding,
]

