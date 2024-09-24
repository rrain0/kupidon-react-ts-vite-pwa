import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'

const ChatPage = React.lazy(() => import('src/ui/2-pages/Chat/ChatPage.tsx'))







// path: 'chat / <check here>'
export const chatRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ChatPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
