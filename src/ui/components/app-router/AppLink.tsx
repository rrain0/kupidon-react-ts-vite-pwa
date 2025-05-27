import { ObjectU } from '@util/common/ObjectU.ts'
import React, { useMemo } from 'react'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { Link, useSearchParams } from 'react-router'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Pu = TypeU.Pu
import RouteSegment = RouteBuilder.RouteSegment
import fullParams = RouteBuilder.fullParams
import AllowedNameParams = RouteBuilder.AllowedNameParams
import AllowedNameParamsRoutes = RouteBuilder.AllowedNameParamsRoutes
import ObjectMap = ObjectU.ObjectMap
import isobject = TypeU.isobject
import fullAnySearchParams = RouteBuilder.fullAnySearchParams




export type AppLinkProps<R extends RouteSegment> =
  & Omit<React.ComponentProps<typeof Link>, 'to'>
  & Pu<{
    toFull: R
    allowedNameParams: NoInfer<AllowedNameParamsRoutes<R>>
  }>



const AppLink = ReactU.memo(<R extends RouteSegment>(props: AppLinkProps<R>) => {
  const {
    children,
    toFull,
    allowedNameParams,
  } = props
  
  const [searchParams] = useSearchParams()
  
  const allowedNameParamsString = useMemo(() => {
    if (!allowedNameParams) return allowedNameParams
    return ObjectMap<AllowedNameParamsRoutes<R>, AllowedNameParams<R>>(
      allowedNameParams,
      // @ts-expect-error
      ([k, v]) => {
        if (isobject(v)) return [k, v[fullAnySearchParams](searchParams)]
        return [k, v]
      }
    )
  }, [allowedNameParams])
  
  if (!toFull) return children
  
  return (
    <Link
      data-display-name='AppLink'
      to={toFull[fullParams]({
        anySearchParams: searchParams,
        allowedNameParams: allowedNameParamsString,
      })}
    >
      {children}
    </Link>
  )
})
// @ts-expect-error
AppLink.displayName = 'AppLink'
export default AppLink

