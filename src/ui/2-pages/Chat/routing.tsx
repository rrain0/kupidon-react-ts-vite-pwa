import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import React, { Suspense } from 'react'
import { RouteObject, useMatch } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { mockChatItems } from 'src/ui/2-pages/ChatList/ChatsPage.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import full = RouteBuilder.full
import use = RouteBuilder.use

const ChatPage = React.lazy(() => import('src/ui/2-pages/Chat/ChatPage.tsx'))




const chatItem = mockChatItems.find(it => it.id === '175dc7be-3f56-4b9d-9403-e994b72624dc')!
const messages = []


const RouteChatUserIdOrIdId = React.memo(() => {
  const chatUserIdRoute = RootRoute.chat.userId.id[use](':id')
  const urlChatUserId = useMatch(chatUserIdRoute[full]()+'/*')?.params['id']
  
  const chatIdRoute = RootRoute.chat.id.id[use](':id')
  const urlChatId = useMatch(chatIdRoute[full]()+'/*')?.params['id']
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ChatPage toUserId={urlChatUserId} toChatId={urlChatId}/>
    </Suspense>
  )
})



// path: 'chat / user-id or id / :id / ...'
const routingChatUserIdOrIdId: RouteObject[] = [
  {
    path: '',
    Component: RouteChatUserIdOrIdId,
  },
  clearUnknownPathEnding,
]



// path: 'chat / user-id / ...'
const routingChatUserId: RouteObject[] = [
  {
    path: '',
    element: <AppNavigate toFull={RootRoute.chats} replace/>,
  },
  {
    path: RootRoute.chat.userId.id[path] + '/*',
    children: routingChatUserIdOrIdId,
  },
]
// path: 'chat / id / ...'
const routingChatId: RouteObject[] = [
  {
    path: '',
    element: <AppNavigate toFull={RootRoute.chats} replace/>,
  },
  {
    path: RootRoute.chat.id.id[path] + '/*',
    children: routingChatUserIdOrIdId,
  },
]




// path: 'chat / ...'
export const routingChat: RouteObject[] = [
  {
    path: RootRoute.chat.userId[path] + '/*',
    children: routingChatUserId,
  },
  {
    path: RootRoute.chat.id[path] + '/*',
    children: routingChatId,
  },
  {
    path: '*',
    element: <AppNavigate toFull={RootRoute.chats} replace/>,
  },
]
