import { objectMap } from '@utils/base/ObjectU.ts'
import React, { useMemo } from 'react'
import { ReactU } from '@utils/react/ReactU.ts'
import { Link, useSearchParams } from 'react-router'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import { Pu } from '@utils/base/tsUtils.ts'
import RouteSegment = RouteBuilder.RouteSegment
import fullParams = RouteBuilder.fullParams
import AllowedNameParams = RouteBuilder.AllowedNameParams
import AllowedNameParamsRoutes = RouteBuilder.AllowedNameParamsRoutes
import { isobject } from '@utils/base/tsUtils.ts'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import AnyParams = RouteBuilder.AnyParams




export type AppLinkProps<R extends RouteSegment> =
  & Omit<React.ComponentProps<typeof Link>, 'to'>
  & Pu<{
    toFull: R
    allowedNamedParams: NoInfer<AllowedNameParamsRoutes<R>>
    noSearchFromUrl: boolean
    anyParams: AnyParams
  }>



const AppLink = ReactU.memo(<R extends RouteSegment>(props: AppLinkProps<R>) => {
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
    return objectMap<AllowedNameParamsRoutes<R>, AllowedNameParams<R>>(
      allowedNamedParams,
      // @ts-expect-error
      ([k, v]) => {
        if (isobject(v)) return [k, v[fullAnySearchParams](searchParams)]
        return [k, v]
      }
    )
  }, [allowedNamedParams])
  
  if (!toFull) return children
  
  const to = toFull[fullParams]({
    ...!noSearchFromUrl && { anySearchParams: searchParams },
    allowedNamedParams: allowedNamedParamsString,
    anyParams: anyParams,
  })
  
  return (
    <Link
      data-display-name='AppLink'
      to={to}
      {...restProps}
    >
      {children}
    </Link>
  )
})
// @ts-expect-error
AppLink.displayName = 'AppLink'
export default AppLink

