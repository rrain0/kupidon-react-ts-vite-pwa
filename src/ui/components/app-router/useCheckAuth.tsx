import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RouteSegment = RouteBuilder.RouteSegment
import RootRoute = AppRoutes.RootRoute



export const useCheckAuth = (returnPath: RouteSegment) => {
  const isAuth = useAuthZustand(s => s.getIsAuth())
  
  if (!isAuth) return (
    <AppNavigate
      toFull={RootRoute.login}
      allowedNamedParams={{ returnPath }}
      replace={true}
    />
  )
  
  return undefined
}
