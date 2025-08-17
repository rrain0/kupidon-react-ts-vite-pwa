import React from 'react'
import { Route, Routes } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import NavBar from 'src/ui/1-widgets/NavBar/NavBar.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute




const RouteBottomNavBar = React.memo(() => {
  
  return (
    <Routes>
      {
        [RootRoute.profile[full]()]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place='profile'/>}
            />
          ))
      }
      {
        [RootRoute.chats[full]()]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place='chat'/>}
            />
          ))
      }
      {
        [RootRoute.findPair[full]()]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place='findPair'/>}
            />
          ))
      }
      {
        [
          RootRoute.bowAndArrows[full](),
          RootRoute.datePlaces[full](),
        ]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place='bowAndArrows'/>}
            />
          ))
      }
      {
        [RootRoute.settings[full]()]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place='settings'/>}
            />
          ))
      }
    </Routes>
  )
})
RouteBottomNavBar.displayName = 'RouteBottomNavBar'
export default RouteBottomNavBar
