import { ObjectU } from '@util/common/ObjectU.ts'
import React, { useMemo } from 'react'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { Navigate, useSearchParams } from 'react-router'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Pu = TypeU.Pu
import RouteSegment = RouteBuilder.RouteSegment
import fullParams = RouteBuilder.fullParams
import AllowedNameParamsRoutes = RouteBuilder.AllowedNameParamsRoutes
import ObjectMap = ObjectU.ObjectMap
import AllowedNameParams = RouteBuilder.AllowedNameParams
import isobject = TypeU.isobject
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

