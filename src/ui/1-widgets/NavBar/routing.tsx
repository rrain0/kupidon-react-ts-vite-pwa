import React from 'react'
import { Route, Routes } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import NavBar from 'src/ui/1-widgets/NavBar/NavBar.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute




const BottomNavBarRouting = React.memo(() => {
  
  return (
    <Routes>
      {
        [RootRoute.profile[full]()]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place="profile" />}
            />
          ))
      }
      {
        [RootRoute.chat[full]()]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place="chat" />}
            />
          ))
      }
      {
        [RootRoute.findCouple[full]()]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place="findCouple" />}
            />
          ))
      }
      {
        [
          RootRoute.bowAndArrows[full](),
          // TODO Route - стоит ли показывать навбар на странице конкретнорго места?
          RootRoute.datePlaces[full](),
        ]
          .map(path => path+'/*')
          .map(path => (
            <Route
              key={path}
              path={path}
              element={<NavBar place="bowAndArrows" />}
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
              element={<NavBar place="settings" />}
            />
          ))
      }
    </Routes>
  )
})
export default BottomNavBarRouting
