import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import CheckAuth from 'src/components/components/app-router/CheckAuth.tsx'

const ChatsPage = React.lazy(
  () => import('src/components/pages/Chats/ChatsPage.tsx')
)




const RouteChats = React.memo(() => {
  
  return (
    <CheckAuth>
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ChatsPage/>
      </Suspense>
    </CheckAuth>
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
