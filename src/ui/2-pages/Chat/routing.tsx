import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import ChatPage from 'src/ui/2-pages/Chat/ChatPage.tsx'







// path: 'chat / <check here>'
export const chatRouting: RouteObject[] = [
  {
    path: '',
    Component: ChatPage,
  },
  clearUnknownPathEnding,
]