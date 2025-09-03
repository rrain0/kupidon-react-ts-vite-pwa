import { ObjectU } from '@utils/base/ObjectU.ts'
import React, { useMemo } from 'react'
import { ReactU } from '@utils/react/ReactU.ts'

import { NavLink, useSearchParams } from 'react-router'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import { Pu } from '@utils/base/TypeUtils.ts'
import RouteSegment = RouteBuilder.RouteSegment
import fullParams = RouteBuilder.fullParams
import AllowedNameParams = RouteBuilder.AllowedNameParams
import AllowedNameParamsRoutes = RouteBuilder.AllowedNameParamsRoutes
import ObjectMap = ObjectU.ObjectMap
import { isobject } from '@utils/base/TypeUtils.ts'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import AnyParams = RouteBuilder.AnyParams
import { isfunction } from '@utils/base/TypeUtils.ts'




export type AppNavLinkProps<R extends RouteSegment> =
  & Omit<React.ComponentProps<typeof NavLink>, 'to'>
  & Pu<{
    toFull: R
    allowedNamedParams: NoInfer<AllowedNameParamsRoutes<R>>
    noSearchFromUrl: boolean
    anyParams: AnyParams
  }>



const AppNavLink = ReactU.memo(<R extends RouteSegment>(props: AppNavLinkProps<R>) => {
  const {
    children,
    toFull,
    allowedNamedParams,
    noSearchFromUrl,
    anyParams,
    ...restProps
  } = props
  
  const [searchParams] = useSearchParams()
  
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
  
  const to = toFull[fullParams]({
    ...!noSearchFromUrl && { anySearchParams: searchParams },
    allowedNamedParams: allowedNamedParamsString,
    anyParams: anyParams,
  })
  
  return (
    <NavLink
      data-display-name='AppNavLink'
      to={to}
      {...restProps}
    >
      {children}
    </NavLink>
  )
})
// @ts-expect-error
AppNavLink.displayName = 'AppNavLink'
export default AppNavLink

