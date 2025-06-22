import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'

const ChatsPage = React.lazy(
  () => import('src/ui/2-pages/ChatList/ChatsPage.tsx')
)




const RouteChats = React.memo(() => {
  
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
