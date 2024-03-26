import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import ChatPage from 'src/ui/pages/Chat/ChatPage.tsx'







// path: 'chat / <check here>'
export const chatRouting: RouteObject[] = [
  {
    path: '',
    Component: ChatPage,
  },
  clearUnknownPathEnding,
]