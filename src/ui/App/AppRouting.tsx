import { useAuthSetup } from '@util/auth/useAuthSetup.ts'
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import RouteBottomNavBar from 'src/ui/1-widgets/NavBar/NavBar.routing.tsx'
import { routingBowAndArrows } from 'src/ui/2-pages/BowAndArrows/BowAndArrowsPage.routing.tsx'
import { routingChat } from 'src/ui/2-pages/Chat/ChatPage.routing.tsx'
import { routingChats } from 'src/ui/2-pages/Chats/ChatsPage.routing.tsx'
import { routingDateArticle } from 'src/ui/2-pages/DateArticle/DateArticlePage.routing.tsx'
import { routingDateArticles } from 'src/ui/2-pages/DateArticles/DateArticlesPage.routing.tsx'
import { routingDatePlace } from 'src/ui/2-pages/DatePlace/DatePlacePage.routing.tsx'
import { routingDatePlaces } from 'src/ui/2-pages/DatePlaces/DatePlacesPage.routing.tsx'
import { routingFindPair } from 'src/ui/2-pages/FindPair/FindPairPage.routing.tsx'
import { routingLikedMe } from 'src/ui/2-pages/LikedMe/LikedMePage.routing.tsx'
import { routingLogin } from 'src/ui/2-pages/Login/LoginPage.routing.tsx'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { routingProfile } from 'src/ui/2-pages/Profile/ProfilePage.routing.tsx'
import { routingSettings } from 'src/ui/2-pages/Settings/SettingsPage.routing.tsx'
import { routingSignup } from 'src/ui/2-pages/Signup/SignupPage.routing.tsx'
import { routingDevTest } from 'src/ui/2-pages/DevTest/DevTestPage.routing.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { routingTest } from 'src/ui/2-pages/Test/TestPage.routing.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path




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
      <RouteBottomNavBar/>
    </>
  )
})



const RouteAnyAny = React.memo(() => {
  return <AppNavigate toFull={RootRoute.findPair} replace/>
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
        path: RootRoute.chats[path]+'/*',
        children: routingChats,
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


