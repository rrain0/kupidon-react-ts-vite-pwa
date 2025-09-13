import { ReactU } from '@utils/react/ReactU.ts'
import React from 'react'
import { useLocation } from 'react-router'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import AppNavigate from 'src/components/components/app-router/AppNavigate.tsx'
import { useAuthZustand } from 'src/zustand/auth/authZustand.ts'
import RootRoute = AppRoutes.RootRoute
import Children = ReactU.Children



const CheckAuth = React.memo((props: Children) => {
  const { children } = props
  
  const isAuth = useAuthZustand(s => s.getIsAuth())
  
  const { pathname: path, search, hash } = useLocation()
  //console.log('location', `${path}${search}${hash}`)
  
  const returnPath = `${path}${search}${hash}`
  
  if (!isAuth) return (
    <AppNavigate
      toFull={RootRoute.login}
      allowedNamedParams={{ returnPath }}
      noSearchFromUrl
      replace
    />
  )
  
  return children
})
CheckAuth.displayName = 'CheckAuth'
export default CheckAuth
