import { useAuthSetup } from '@utils/auth/useAuthSetup.ts'
import { SearchParams } from '@utils/url/SearchParams.ts'
import {
  parseSearchParams,
  setSearchParam,
  stringifySearchParams,
} from '@utils/url/SearchParamsU.ts'
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider, useLocation, useMatch,
} from 'react-router'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import RouteBottomNavBar from 'src/components/widgets/NavBar/NavBar.routing.tsx'
import { routingAutologin } from 'src/components/pages/Autologin/AutologinPage.routing.tsx'
import { routingBowAndArrows } from 'src/components/pages/BowAndArrows/BowAndArrowsPage.routing.tsx'
import { routingChat } from 'src/components/pages/Chat/ChatPage.routing.tsx'
import { routingChats } from 'src/components/pages/Chats/ChatsPage.routing.tsx'
import { routingDateArticle } from 'src/components/pages/DateArticle/DateArticlePage.routing.tsx'
import { routingDateArticles } from 'src/components/pages/DateArticles/DateArticlesPage.routing.tsx'
import { routingDatePlace } from 'src/components/pages/DatePlace/DatePlacePage.routing.tsx'
import { routingDatePlaces } from 'src/components/pages/DatePlaces/DatePlacesPage.routing.tsx'
import { routingFindPair } from 'src/components/pages/FindPair/FindPairPage.routing.tsx'
import { routingLikedMe } from 'src/components/pages/LikedMe/LikedMePage.routing.tsx'
import { routingLogin } from 'src/components/pages/Login/LoginPage.routing.tsx'
import React from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { routingProfile } from 'src/components/pages/Profile/ProfilePage.routing.tsx'
import { routingSettings } from 'src/components/pages/Settings/SettingsPage.routing.tsx'
import { routingSignup } from 'src/components/pages/Signup/SignupPage.routing.tsx'
import { routingDevTest } from 'src/components/pages/DevTest/DevTestPage.routing.tsx'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import { routingTest } from 'src/components/pages/Test/TestPage.routing.tsx'
import AppNavigate from 'src/components/components/app-router/AppNavigate.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import params = RouteBuilder.params
import full = RouteBuilder.full




const RouteAny = React.memo(() => {
  //useNavBar(undefined)
  //const navBar = useZustand(s => s.navBar)
  
  const { pathname: path, search, hash } = useLocation()
  
  const useAccountParam = RootRoute.autologin[params].useAccount
  const searchParams = new SearchParams(search)
  const accountName = searchParams.get(useAccountParam) ?? ''
  const returnPathSearch = searchParams.with(useAccountParam, { noParam: true }).toString()
  const returnPath = `${path}${returnPathSearch}${hash}`
  const isAutologin = !!useMatch(`${RootRoute.autologin[full]()}/*`)
  
  const authIsReady = useAuthSetup()
  
  if (accountName && !isAutologin) return (
    <AppNavigate
      toFull={RootRoute.autologin}
      allowedNamedParams={{ useAccount: accountName, returnPath }}
      noSearchFromUrl
      replace
    />
  )
  
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
        path: RootRoute.autologin[path]+'/*',
        children: routingAutologin,
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


