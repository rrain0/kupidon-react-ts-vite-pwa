import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import LoginPage from './LoginPage'



// path: 'login / <check here>'
export const loginRouting: RouteObject[] = [
  {
    path: '',
    Component: LoginPage,
  },
  clearUnknownPathEnding,
]


