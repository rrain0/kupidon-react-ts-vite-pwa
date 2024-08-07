import {
  createBrowserRouter,
  Navigate, Outlet,
  RouteObject,
  RouterProvider,
  useSearchParams,
} from 'react-router-dom'
import { bowAndArrowsRouting } from 'src/ui/2-pages/BowAndArrows/routing.tsx'
import { chatRouting } from 'src/ui/2-pages/Chat/routing.tsx'
import BottomNavBarRouting from 'src/ui/1-widgets/NavBar/routing'
import { findPairsRouting } from 'src/ui/2-pages/FindPairs/routing'
import { loginRouting } from 'src/ui/2-pages/Login/routing'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { profileRouting } from 'src/ui/2-pages/Profile/routing.tsx'
import { settingRouting } from 'src/ui/2-pages/Settings/routing'
import { signupRouting } from 'src/ui/2-pages/Signup/routing'
import { testRouting } from 'src/ui/2-pages/Test/routing'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams




const Any =
React.memo(
() => {
  return <>
    <Outlet/> {/* Это место, где будут рендериться children */}
    <BottomNavBarRouting/>
  </>
})



const AnyAny =
React.memo(
() => {
  const [searchParams] = useSearchParams()
  return <Navigate
    to={RootRoute.findPairs[fullAnySearchParams](searchParams)}
    replace={true}
  />
})



// path: '/ <check here>'
const rootRoutes: RouteObject[] = [
  {
    path: '*',
    // If you specify 'Component' or 'element',
    // then in it must be <Outlet/> to render children.
    Component: Any,
    children: [
      {
        path: RootRoute.login[path]+'/*',
        children: loginRouting,
      },
      {
        path: RootRoute.signup[path]+'/*',
        children: signupRouting,
      },
      
      
      
      {
        path: RootRoute.profile[path]+'/*',
        children: profileRouting,
      },
      {
        path: RootRoute.findPairs[path]+'/*',
        children: findPairsRouting,
      },
      {
        path: RootRoute.bowAndArrows[path]+'/*',
        children: bowAndArrowsRouting,
      },
      {
        path: RootRoute.chat[path]+'/*',
        children: chatRouting,
      },
      
      
      
      {
        path: RootRoute.settings[path]+'/*',
        children: settingRouting,
      },
      
      {
        path: RootRoute.test[path]+'/*',
        children: testRouting,
      },
      
      
      
      {
        path: '*',
        Component: AnyAny,
      },
    ],
  },
]
const router = createBrowserRouter(rootRoutes)




const AppRouting = React.memo(
() => {
    return <RouterProvider router={router} />
  }
)
export default AppRouting


