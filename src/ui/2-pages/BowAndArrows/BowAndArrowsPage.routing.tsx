import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'

const BowAndArrowsPage = React.lazy(
  () => import('src/ui/2-pages/BowAndArrows/BowAndArrowsPage.tsx')
)


const RouteBowAndArrows = React.memo(() => {
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <BowAndArrowsPage/>
    </Suspense>
  )
})




// path: 'bow-and-arrows / ...'
export const routingBowAndArrows: RouteObject[] = [
  {
    path: '',
    Component: RouteBowAndArrows,
  },
  clearUnknownPathEnding,
]
