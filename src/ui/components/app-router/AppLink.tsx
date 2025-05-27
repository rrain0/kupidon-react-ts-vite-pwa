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
import AnyParams = RouteBuilder.AnyParams
import Getter = TypeU.Getter




export type AppLinkProps<R extends RouteSegment> =
  & Omit<React.ComponentProps<typeof Link>, 'to'>
  & Pu<{
    toFull: R
    allowedNamedParams: NoInfer<AllowedNameParamsRoutes<R>>
    anyParams: AnyParams
  }>



const AppLink = ReactU.memo(<R extends RouteSegment>(props: AppLinkProps<R>) => {
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
  
  if (!toFull) return children
  
  return (
    <Link
      data-display-name='AppLink'
      to={toFull[fullParams]({
        anySearchParams: searchParams,
        allowedNamedParams: allowedNamedParamsString,
        anyParams: anyParams,
      })}
      {...restProps}
    >
      {children}
    </Link>
  )
})
// @ts-expect-error
AppLink.displayName = 'AppLink'
export default AppLink

