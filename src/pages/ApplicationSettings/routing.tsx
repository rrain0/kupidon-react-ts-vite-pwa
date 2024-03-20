import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import ApplicationSettingsPage from 'src/pages/ApplicationSettings/ApplicationSettingsPage'







// path: 'settings / app / <check here>'
export const settingsApplicationRouting: RouteObject[] = [
  {
    path: '',
    Component: ApplicationSettingsPage,
  },
  clearUnknownPathEnding,
]