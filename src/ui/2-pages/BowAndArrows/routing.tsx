import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { useNavBar } from 'src/ui/1-widgets/NavBar/useNavBar.ts'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'

const BowAndArrowsPage = React.lazy(
  () => import('src/ui/2-pages/BowAndArrows/BowAndArrowsPage.tsx')
)


const RouteBowAndArrows = React.memo(() => {
  
  useNavBar({ place: 'bowAndArrows' })
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BowAndArrowsPage />
    </Suspense>
  )
})




// path: 'bow-and-arrows / <check here>'
export const bowAndArrowsRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteBowAndArrows,
  },
  clearUnknownPathEnding,
]
