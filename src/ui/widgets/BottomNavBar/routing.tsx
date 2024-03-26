import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import BottomNavBar from 'src/ui/widgets/BottomNavBar/BottomNavBar.tsx'
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