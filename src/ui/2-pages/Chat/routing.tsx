import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'

const ChatPage = React.lazy(
  () => import('src/ui/2-pages/Chat/ChatPage.tsx')
)




const RouteChat = React.memo(() => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPage />
    </Suspense>
  )
})


// path: 'chat / ...'
export const chatRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteChat,
  },
  clearUnknownPathEnding,
]
