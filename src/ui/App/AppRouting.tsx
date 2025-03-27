import {
  createBrowserRouter,
  Navigate, Outlet,
  RouteObject,
  RouterProvider,
  useSearchParams,
} from 'react-router-dom'
import BottomNavBarRouting from 'src/ui/1-widgets/NavBar/routing.tsx'
import { bowAndArrowsRouting } from 'src/ui/2-pages/BowAndArrows/routing.tsx'
import { chatRouting } from 'src/ui/2-pages/Chat/routing.tsx'
import { routingDateArticle } from 'src/ui/2-pages/DateArticle/routing.tsx'
import { routingDateArticles } from 'src/ui/2-pages/DateArticles/routing.tsx'
import { routingDatePlace } from 'src/ui/2-pages/DatePlace/routing.tsx'
import { routingDatePlaces } from 'src/ui/2-pages/DatePlaces/routing.tsx'
import { findCoupleRouting } from 'src/ui/2-pages/FindCouple/routing'
import { loginRouting } from 'src/ui/2-pages/Login/routing'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { routingProfile } from 'src/ui/2-pages/Profile/routing.tsx'
import { settingRouting } from 'src/ui/2-pages/Settings/routing'
import { signupRouting } from 'src/ui/2-pages/Signup/routing'
import { routingDevTest } from 'src/ui/2-pages/DevTest/routing.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { RoutingTest } from 'src/ui/2-pages/Test/routing.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams




const RouteAny = React.memo(() => {
  //useNavBar(undefined)
  //const navBar = useZustand(s => s.navBar)
  
  return (
    <>
      {/* Это место, где будут рендериться children */}
      <Outlet />
      
      {/* {navBar?.show && <NavBar place={navBar.place} />} */}
      <BottomNavBarRouting />
    </>
  )
})



const RouteAnyAny = React.memo(() => {
  const [searchParams] = useSearchParams()
  return (
    <Navigate
      to={RootRoute.findCouple[fullAnySearchParams](searchParams)}
      replace={true}
    />
  )
})



// path: '/ ...'
const routingRoot: RouteObject[] = [
  {
    path: '*',
    // If you specify 'Component' or 'element',
    // then in it must be <Outlet/> to render children.
    Component: RouteAny,
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
        path: RootRoute.datePlace[path]+'/*',
        children: routingDatePlace,
      },
      
      {
        path: RootRoute.dateArticles[path]+'/*',
        children: routingDateArticles,
      },
      {
        path: RootRoute.dateArticle[path]+'/*',
        children: routingDateArticle,
      },
      
      
      
      {
        path: RootRoute.test[path]+'/*',
        children: RoutingTest,
      },
      
      
      
      
      {
        path: RootRoute.devTest[path]+'/*',
        children: routingDevTest,
      },
      
      
      
      {
        path: '*',
        Component: RouteAnyAny,
      },
    ],
  },
]
const router = createBrowserRouter(routingRoot, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
})




const AppRouting = React.memo(() => {
  return (
    <RouterProvider router={router}
      future={{
        // TODO !!! это вызывает флики при переключении табов
        //v7_startTransition: true,
      }}
    />
  )
})
export default AppRouting


