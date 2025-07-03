import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import { useCheckAuth } from 'src/ui/components/app-router/useCheckAuth.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute

const ChatsPage = React.lazy(
  () => import('src/ui/2-pages/Chats/ChatsPage.tsx')
)




const RouteChats = React.memo(() => {
  
  const redirectToLogin = useCheckAuth(RootRoute.chats)
  if (redirectToLogin) return redirectToLogin
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ChatsPage/>
    </Suspense>
  )
})


// path: 'chats / ...'
export const routingChats: RouteObject[] = [
  {
    path: '',
    Component: RouteChats,
  },
  clearUnknownPathEnding,
]
