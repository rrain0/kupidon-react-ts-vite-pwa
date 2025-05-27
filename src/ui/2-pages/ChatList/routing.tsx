import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'

const ChatListPage = React.lazy(
  () => import('src/ui/2-pages/ChatList/ChatListPage.tsx')
)




const RouteChatList = React.memo(() => {
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ChatListPage/>
    </Suspense>
  )
})


// path: 'chat-list / ...'
export const routingChatList: RouteObject[] = [
  {
    path: '',
    Component: RouteChatList,
  },
  clearUnknownPathEnding,
]
