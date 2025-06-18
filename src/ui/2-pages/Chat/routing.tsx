import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { RouteObject, useMatch } from 'react-router'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { ChatCompanionData } from 'src/ui/2-pages/Chat/ChatPage.tsx'
import { mockChatItems } from 'src/ui/2-pages/ChatList/ChatListPage.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import full = RouteBuilder.full
import use = RouteBuilder.use

const ChatPage = React.lazy(() => import('src/ui/2-pages/Chat/ChatPage.tsx'))




const chatItem = mockChatItems.find(it => it.id === '175dc7be-3f56-4b9d-9403-e994b72624dc')!
const messages = []


const RouteChatUserIdId = React.memo(() => {
  const chatUserIdRoute = RootRoute.chat.user.id.id[use](':id')
  const urlChatUserId = useMatch(chatUserIdRoute[full]()+'/*')!.params['id']!
  
  // TODO request for messages
  //  Backend checks if i can chat with user if user exists
  
  const [companion, setCompanion] = useState<ChatCompanionData | undefined>(undefined)
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: { },
    prepareAndRequest: useCallback(() => {
      return UserApi.userById(urlChatUserId)
    }, [urlChatUserId]),
  })
  
  useEffect(() => {
    setCompanion(undefined)
    request()
  }, [urlChatUserId])
  
  
  useEffect(() => {
    if (response?.isSuccess) {
      const u = response.data.user
      setCompanion({
        id: u.id,
        ava: u.photos.find(p => p.index === 0)?.url,
        online: false,
        name: u.name,
        mute: false,
        pinned: undefined,
        isWriting: false,
      })
    }
  }, [isSuccess])
  
  if (isError) return <Flex fullW h='100dvh' center>Ошибка</Flex>
  
  if (!companion) return <Flex fullW h='100dvh' center>Загрузка...</Flex>
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ChatPage companion={companion} messages={messages}/>
    </Suspense>
  )
})



// path: 'chat / user / id / :id / ...'
const routingChatUserIdId: RouteObject[] = [
  {
    path: '',
    Component: RouteChatUserIdId,
  },
  clearUnknownPathEnding,
]



// path: 'chat / user / id / ...'
const routingChatUserId: RouteObject[] = [
  {
    path: RootRoute.chat.user.id.id[path] + '/*',
    children: routingChatUserIdId,
  },
  {
    path: '*',
    element: <AppNavigate toFull={RootRoute.chatList} replace/>,
  },
]



// path: 'chat / user / ...'
const routingChatUser: RouteObject[] = [
  {
    path: '',
    element: <AppNavigate toFull={RootRoute.chatList} replace/>,
  },
  {
    path: RootRoute.chat.user.id[path] + '/*',
    children: routingChatUserId,
  },
]




// path: 'chat / ...'
export const routingChat: RouteObject[] = [
  {
    path: RootRoute.chat.user[path] + '/*',
    children: routingChatUser,
  },
  {
    path: '*',
    element: <AppNavigate toFull={RootRoute.chatList} replace/>,
  },
]
