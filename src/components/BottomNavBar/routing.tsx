import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomNavBar from 'src/components/BottomNavBar/BottomNavBar'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
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
        
        //RootRoute.settings[full](),
      ]
        //.map(path=>path+'/*')
        .map(path=><Route
          key={path}
          path={path}
          element={<BottomNavBar/>}
        />)
    }
  </Routes>
})
export default BottomNavBarRouting