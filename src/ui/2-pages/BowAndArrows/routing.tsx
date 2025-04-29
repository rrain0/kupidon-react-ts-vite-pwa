import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'

const BowAndArrowsPage = React.lazy(
  () => import('src/ui/2-pages/BowAndArrows/BowAndArrowsPage.tsx')
)


const RouteBowAndArrows = React.memo(() => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BowAndArrowsPage/>
    </Suspense>
  )
})




// path: 'bow-and-arrows / ...'
export const bowAndArrowsRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteBowAndArrows,
  },
  clearUnknownPathEnding,
]
