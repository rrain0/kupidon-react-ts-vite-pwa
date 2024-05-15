import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import NavBar from 'src/ui/widgets/NavBar/NavBar.tsx'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute




const BottomNavBarRouting =
React.memo(
()=>{
  
  return <Routes>
    {
      [
        RootRoute.profile[full](),
        RootRoute.profile.id[full](),
        RootRoute.profile.id.userId[full](),
        
        RootRoute.findPairs[full](),
        
        RootRoute.bowAndArrows[full](),
        
        RootRoute.chat[full](),
        
        //RootRoute.settings[full](),
      ]
        //.map(path=>path+'/*')
        .map(path=><Route
          key={path}
          path={path}
          element={<NavBar/>}
        />)
    }
  </Routes>
})
export default BottomNavBarRouting