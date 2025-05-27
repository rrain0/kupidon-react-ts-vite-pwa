import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'

const ChatPage = React.lazy(
  () => import('src/ui/2-pages/Chat/ChatPage.tsx')
)




const RouteChat = React.memo(() => {
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ChatPage/>
    </Suspense>
  )
})


// path: 'chat / ...'
export const routingChat: RouteObject[] = [
  {
    path: '',
    Component: RouteChat,
  },
  clearUnknownPathEnding,
]
