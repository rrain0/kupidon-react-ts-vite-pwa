import { ObjectU } from '@utils/base/ObjectU.ts'
import React, { useMemo } from 'react'
import { ReactU } from '@utils/react/ReactU.ts'

import { Navigate, useSearchParams } from 'react-router'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import { Pu } from '@utils/base/TypeUtils.ts'
import RouteSegment = RouteBuilder.RouteSegment
import fullParams = RouteBuilder.fullParams
import AllowedNameParamsRoutes = RouteBuilder.AllowedNameParamsRoutes
import ObjectMap = ObjectU.ObjectMap
import AllowedNameParams = RouteBuilder.AllowedNameParams
import { isobject } from '@utils/base/TypeUtils.ts'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import AnyParams = RouteBuilder.AnyParams




export type AppNavigateProps<R extends RouteSegment> =
  & Omit<React.ComponentProps<typeof Navigate>, 'to'>
  & Pu<{
    toFull: R
    allowedNamedParams: NoInfer<AllowedNameParamsRoutes<R>>
    noSearchFromUrl: boolean
    anyParams: AnyParams
  }>



const AppNavigate = ReactU.memo(<R extends RouteSegment>(props: AppNavigateProps<R>) => {
  const {
    toFull,
    allowedNamedParams,
    noSearchFromUrl,
    anyParams,
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
  
  if (!toFull) return undefined
  
  const to = toFull[fullParams]({
    ...!noSearchFromUrl && { anySearchParams: searchParams },
    allowedNamedParams: allowedNamedParamsString,
    anyParams: anyParams,
  })
  
  return (
    <Navigate
      data-display-name='AppNavigate'
      to={to}
    />
  )
})
// @ts-expect-error
AppNavigate.displayName = 'AppNavigate'
export default AppNavigate

