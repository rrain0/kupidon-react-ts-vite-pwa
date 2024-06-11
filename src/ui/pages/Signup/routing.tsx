import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import SignupPage from 'src/ui/pages/Signup/SignupPage.tsx'




// path: 'signup / <check here>'
export const signupRouting: RouteObject[] = [
  {
    path: '',
    Component: SignupPage,
  },
  clearUnknownPathEnding,
]

