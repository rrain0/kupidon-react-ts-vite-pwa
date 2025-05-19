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




export type AppNavigateProps<R extends RouteSegment> =
  & Omit<React.ComponentProps<typeof Navigate>, 'to'>
  & Pu<{
    toFull: R
    allowedNameParams: NoInfer<AllowedNameParamsRoutes<R>>
  }>



const AppNavigate = ReactU.memo(<R extends RouteSegment>(props: AppNavigateProps<R>) => {
  const {
    toFull,
    allowedNameParams,
  } = props
  
  const [searchParams] = useSearchParams()
  
  const allowedNameParamsString = useMemo(() => {
    if (!allowedNameParams) return allowedNameParams
    return ObjectMap<AllowedNameParamsRoutes<R>, AllowedNameParams<R>>(
      allowedNameParams,
      // @ts-ignore
      ([k, v]) => {
        if (isobject(v)) return [k, v[fullAnySearchParams](searchParams)]
        return [k, v]
      }
    )
  }, [allowedNameParams])
  
  if (!toFull) return undefined
  
  return (
    <Navigate
      data-display-name='AppNavigate'
      to={toFull[fullParams]({
        anySearchParams: searchParams,
        allowedNameParams: allowedNameParamsString,
      })}
    />
  )
})
// @ts-ignore
AppNavigate.displayName = 'AppNavigate'
export default AppNavigate

