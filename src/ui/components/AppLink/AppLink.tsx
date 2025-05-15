import React from 'react'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { Link, useSearchParams } from 'react-router'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Children = ReactU.Children
import Pu = TypeU.Pu
import RouteSegment = RouteBuilder.RouteSegment
import fullParams = RouteBuilder.fullParams
import AllowedNameParams = RouteBuilder.AllowedNameParams




export type AppLinkProps<R extends RouteSegment> = Pu<{
  toFull: R
  allowedNameParams: AllowedNameParams<NoInfer<R>>
}> & Children



const AppLink = ReactU.memo(<R extends RouteSegment>(props: AppLinkProps<R>) => {
  const {
    children,
    toFull,
    allowedNameParams,
  } = props
  
  const [searchParams] = useSearchParams()
  
  if (!toFull) return children
  
  return (
    <Link
      data-display-name='AppLink'
      to={toFull[fullParams]({
        anySearchParams: searchParams,
        allowedNameParams,
      })}
    >
      {children}
    </Link>
  )
})
// @ts-ignore
AppLink.displayName = 'AppLink'
export default AppLink

