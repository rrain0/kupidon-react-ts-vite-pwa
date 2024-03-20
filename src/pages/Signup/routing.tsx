import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import SignupPage from './SignupPage'




// path: 'signup / <check here>'
export const signupRouting: RouteObject[] = [
  {
    path: '',
    Component: SignupPage,
  },
  clearUnknownPathEnding,
]

