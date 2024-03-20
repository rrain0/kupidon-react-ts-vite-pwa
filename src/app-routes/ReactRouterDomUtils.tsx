import React from 'react'
import {
  Navigate,
  NonIndexRouteObject,
  redirect,
  useLocation, useParams,
} from 'react-router-dom'




const ClearUnknownPathEnding =
React.memo(
()=>{
  const location = useLocation()
  const params = useParams()
  const pathEnding = params['*']!
  const newUrlString = location.pathname.slice(0, -pathEnding.length) + location.search
  
  return <Navigate
    to={newUrlString}
    replace={true}
  />
})



// path: <any-path> / *
export const clearUnknownPathEnding: NonIndexRouteObject = {
  path: '*',
  Component: ClearUnknownPathEnding,
}














// !!! redirect with replace is not possible in loader
const clearUnknownPathEnding0: NonIndexRouteObject = {
  path: '*',
  loader: (params)=>{
    //console.log('params',params)
    //console.log('url.pathname',new URL(params.request.url).pathname)
    const url = new URL(params.request.url)
    return redirect(
      url.pathname.slice(0, -params.params['*']!.length) +
      url.search
    )
  },
}


