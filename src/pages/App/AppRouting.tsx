/** @jsxImportSource @emotion/react */
import {
  createBrowserRouter,
  Navigate, Outlet,
  RouteObject,
  RouterProvider,
  useSearchParams,
} from 'react-router-dom'
import BottomNavBarRouting from 'src/components/BottomNavBar/routing'
import { findPairsRouting } from 'src/pages/FindPairs/routing'
import { loginRouting } from 'src/pages/Login/routing'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { profileRouting } from 'src/pages/Profile/routing'
import { settingRouting } from 'src/pages/Settings/routing'
import { signupRouting } from 'src/pages/Signup/routing'
import { testRouting } from 'src/pages/Test/routing'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams




const Any =
React.memo(
()=>{
  return <>
    <Outlet/> {/* Это место, где будут рендериться children */}
    <BottomNavBarRouting/>
  </>
})



const AnyAny =
React.memo(
()=>{
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
    // If you specify 'Component' or 'element', then in it must be <Outlet/> to render children.
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
        path: RootRoute.findPairs[path]+'/*',
        children: findPairsRouting,
      },
      {
        path: RootRoute.profile[path]+'/*',
        children: profileRouting,
      },
      
      
      
      {
        path: RootRoute.test[path]+'/*',
        children: testRouting,
      },
      {
        path: RootRoute.settings[path]+'/*',
        children: settingRouting,
      },
      
      
      
      {
        path: '*',
        Component: AnyAny,
      }
    ]
  },
]
const router = createBrowserRouter(rootRoutes)




const AppRouting =
React.memo(
()=>{
  return <RouterProvider router={router} />
})
export default AppRouting


