import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/react-router/ReactRouterUtils.tsx'
import LoginPage from './LoginPage'



// path: 'login / <check here>'
export const loginRouting: RouteObject[] = [
  {
    path: '',
    Component: LoginPage,
  },
  clearUnknownPathEnding,
]


