import { ObjectU } from '@util/common/ObjectU.ts'
import React, { useMemo } from 'react'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { NavLink, useSearchParams } from 'react-router'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Pu = TypeU.Pu
import RouteSegment = RouteBuilder.RouteSegment
import fullParams = RouteBuilder.fullParams
import AllowedNameParams = RouteBuilder.AllowedNameParams
import AllowedNameParamsRoutes = RouteBuilder.AllowedNameParamsRoutes
import ObjectMap = ObjectU.ObjectMap
import isobject = TypeU.isobject
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import AnyParams = RouteBuilder.AnyParams
import isfunction = TypeU.isfunction




export type AppNavLinkProps<R extends RouteSegment> =
  & Omit<React.ComponentProps<typeof NavLink>, 'to'>
  & Pu<{
    toFull: R
    allowedNamedParams: NoInfer<AllowedNameParamsRoutes<R>>
    anyParams: AnyParams
  }>



const AppNavLink = ReactU.memo(<R extends RouteSegment>(props: AppNavLinkProps<R>) => {
  const {
    children,
    toFull,
    allowedNamedParams,
    anyParams,
    ...restProps
  } = props
  
  const [searchParams, setSearch] = useSearchParams()
  
  const allowedNamedParamsString = useMemo(() => {
    if (!allowedNamedParams) return allowedNamedParams
    return ObjectMap<AllowedNameParamsRoutes<R>, AllowedNameParams<R>>(
      allowedNamedParams,
      // @ts-expect-error
      ([k, v]) => {
        if (isobject(v)) return [k, v[fullAnySearchParams](searchParams)]
        return [k, v]
      }
    )
  }, [allowedNamedParams])
  
  if (!toFull) {
    if (isfunction(children)) {
      return children({ isActive: false, isPending: false, isTransitioning: false })
    }
    return children
  }
  
  return (
    <NavLink
      data-display-name='AppNavLink'
      to={toFull[fullParams]({
        anySearchParams: searchParams,
        allowedNamedParams: allowedNamedParamsString,
        anyParams: anyParams,
      })}
      {...restProps}
    >
      {children}
    </NavLink>
  )
})
// @ts-expect-error
AppNavLink.displayName = 'AppNavLink'
export default AppNavLink

