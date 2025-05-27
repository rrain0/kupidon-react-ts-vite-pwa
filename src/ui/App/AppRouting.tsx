import { useAuthSetup } from '@util/auth/useAuthSetup.ts'
import {
  createBrowserRouter,
  Navigate, Outlet,
  RouteObject,
  RouterProvider,
  useSearchParams,
} from 'react-router'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import BottomNavBarRouting from 'src/ui/1-widgets/NavBar/routing.tsx'
import { routingBowAndArrows } from 'src/ui/2-pages/BowAndArrows/routing.tsx'
import { routingChat } from 'src/ui/2-pages/Chat/routing.tsx'
import { routingChatList } from 'src/ui/2-pages/ChatList/routing.tsx'
import { routingDateArticle } from 'src/ui/2-pages/DateArticle/routing.tsx'
import { routingDateArticles } from 'src/ui/2-pages/DateArticles/routing.tsx'
import { routingDatePlace } from 'src/ui/2-pages/DatePlace/routing.tsx'
import { routingDatePlaces } from 'src/ui/2-pages/DatePlaces/routing.tsx'
import { routingFindPair } from 'src/ui/2-pages/FindPair/routing'
import { routingLikedMe } from 'src/ui/2-pages/LikedMe/routing.tsx'
import { routingLogin } from 'src/ui/2-pages/Login/routing'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { routingProfile } from 'src/ui/2-pages/Profile/routing.tsx'
import { routingSettings } from 'src/ui/2-pages/Settings/routing'
import { routingSignup } from 'src/ui/2-pages/Signup/routing'
import { routingDevTest } from 'src/ui/2-pages/DevTest/routing.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { routingTest } from 'src/ui/2-pages/Test/routing.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams




const RouteAny = React.memo(() => {
  //useNavBar(undefined)
  //const navBar = useZustand(s => s.navBar)
  
  const authIsReady = useAuthSetup()
  
  if (!authIsReady) return <Flex fullW h='100dvh' center>Загрузка...</Flex>
  
  return (
    <>
      {/* Это место, где будут рендериться children */}
      <Outlet/>
      
      {/* {navBar?.show && <NavBar place={navBar.place}/>} */}
      <BottomNavBarRouting/>
    </>
  )
})



const RouteAnyAny = React.memo(() => {
  const [searchParams] = useSearchParams()
  return (
    <Navigate
      to={RootRoute.findPair[fullAnySearchParams](searchParams)}
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
        children: routingLogin,
      },
      {
        path: RootRoute.signup[path]+'/*',
        children: routingSignup,
      },
      
      
      
      {
        path: RootRoute.profile[path]+'/*',
        children: routingProfile,
      },
      {
        path: RootRoute.findPair[path]+'/*',
        children: routingFindPair,
      },
      {
        path: RootRoute.bowAndArrows[path]+'/*',
        children: routingBowAndArrows,
      },
      {
        path: RootRoute.chatList[path]+'/*',
        children: routingChatList,
      },
      
      
      
      {
        path: RootRoute.settings[path]+'/*',
        children: routingSettings,
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
        path: RootRoute.chat[path]+'/*',
        children: routingChat,
      },
      {
        path: RootRoute.test[path]+'/*',
        children: routingTest,
      },
      
      
      
      {
        path: RootRoute.likedMe[path]+'/*',
        children: routingLikedMe,
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
const router = createBrowserRouter(routingRoot)




const AppRouting = React.memo(() => {
  return (
    <RouterProvider router={router}/>
  )
})
AppRouting.displayName = 'AppRouting'
export default AppRouting


