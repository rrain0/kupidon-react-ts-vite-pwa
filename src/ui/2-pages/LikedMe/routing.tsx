import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import React, { Suspense } from 'react'
import {
  Navigate,
  RouteObject,
  useSearchParams,
} from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams

const LikedMePage = React.lazy(
  () => import('src/ui/2-pages/LikedMe/LikedMePage.tsx')
)




const RouteLikedMe = React.memo(() => {
  const [searchParams] = useSearchParams()
  const authUserId = useAuthZustand(s => s.user?.id)
  
  if (!authUserId) return (
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.likedMe[fullAnySearchParams](searchParams),
      })}
      replace={true}
    />
  )
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LikedMePage/>
    </Suspense>
  )
})







// path: 'liked-me / ...'
export const routingLikedMe: RouteObject[] = [
  {
    path: '',
    Component: RouteLikedMe,
  },
  clearUnknownPathEnding,
]

