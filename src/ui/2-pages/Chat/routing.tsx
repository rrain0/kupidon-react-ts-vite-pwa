import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { useNavBar } from 'src/ui/1-widgets/NavBar/useNavBar.ts'

const ChatPage = React.lazy(
  () => import('src/ui/2-pages/Chat/ChatPage.tsx')
)




const RouteChat = React.memo(() => {
  
  useNavBar({ place: 'chat' })
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPage />
    </Suspense>
  )
})


// path: 'chat / <check here>'
export const chatRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteChat,
  },
  clearUnknownPathEnding,
]
