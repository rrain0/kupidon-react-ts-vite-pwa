import {
  createBrowserRouter,
  Navigate, Outlet,
  RouteObject,
  RouterProvider,
  useSearchParams,
} from 'react-router-dom'
import NavBar from 'src/ui/1-widgets/NavBar/NavBar.tsx'
import { useNavBar } from 'src/ui/1-widgets/NavBar/useNavBar.ts'
import { bowAndArrowsRouting } from 'src/ui/2-pages/BowAndArrows/routing.tsx'
import { chatRouting } from 'src/ui/2-pages/Chat/routing.tsx'
import { routingDatePlaces } from 'src/ui/2-pages/DatePlaces/routing.tsx'
import { findCoupleRouting } from 'src/ui/2-pages/FindCouple/routing'
import { loginRouting } from 'src/ui/2-pages/Login/routing'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { routingProfile } from 'src/ui/2-pages/Profile/routing.tsx'
import { settingRouting } from 'src/ui/2-pages/Settings/routing'
import { signupRouting } from 'src/ui/2-pages/Signup/routing'
import { devRouting } from 'src/ui/2-pages/Dev/routing.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { testRouting } from 'src/ui/2-pages/Test/routing.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import { useZustand } from 'src/zustand/ZustandStore.ts'




const Any = React.memo(() => {
  useNavBar(undefined)
  const navBar = useZustand(s => s.navBar)
  
  return (
    <>
      {/* Это место, где будут рендериться children */}
      <Outlet />
      {navBar?.show && <NavBar place={navBar.place} />}
    </>
  )
})



const AnyAny = React.memo(() => {
  const [searchParams] = useSearchParams()
  return (
    <Navigate
      to={RootRoute.findCouple[fullAnySearchParams](searchParams)}
      replace={true}
    />
  )
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
        children: routingProfile,
      },
      {
        path: RootRoute.findCouple[path]+'/*',
        children: findCoupleRouting,
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
        path: RootRoute.datePlaces[path]+'/*',
        children: routingDatePlaces,
      },
      
      
      
      {
        path: RootRoute.test[path]+'/*',
        children: testRouting,
      },
      
      
      
      
      {
        path: RootRoute.dev[path]+'/*',
        children: devRouting,
      },
      
      
      
      {
        path: '*',
        Component: AnyAny,
      },
    ],
  },
]
const router = createBrowserRouter(rootRoutes)




const AppRouting = React.memo(() => {
  return <RouterProvider router={router} />
})
export default AppRouting


