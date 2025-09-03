import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from '@libs/short-propsed/components/Flex.tsx'

const BowAndArrowsPage = React.lazy(
  () => import('src/components/pages/BowAndArrows/BowAndArrowsPage.tsx')
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
