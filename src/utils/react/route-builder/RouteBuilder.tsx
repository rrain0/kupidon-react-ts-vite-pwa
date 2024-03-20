import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import ObjectValues = ObjectUtils.ObjectValues
import ObjectKeysType = ObjectUtils.ObjectKeysType
import ObjectEntries = ObjectUtils.ObjectEntries
import ObjectKeys = ObjectUtils.ObjectKeys
import exists = TypeUtils.exists



export namespace RouteBuilder {
  
  
  // null|undefined|'' for the first path means root
  export const pathConcat = (...paths: Array<string|empty>): string => {
    let result = paths[0] ?? ''
    for (let i = 1; i < paths.length; i++) {
      let path = paths[i] ?? ''
      result = result.replace(/\/$/,'')
      path = path.replace(/^\//,'')
      if (path) result += '/'+path
    }
    return result
  }
  
  export const asterisk = (path: string) => {
    return pathConcat(path,'*')
  }
  
  
  
  
  
  
  export const up = Symbol('up route')
  export const path = Symbol('path')
  export const params = Symbol('params')
  export const full = Symbol('full')
  export const next = Symbol('next')
  export const use = Symbol('use')
  export const fullParams = Symbol('fullParams')
  export const fullAnySearchParams = Symbol('fullAnySearchParams')
  export const fullAllowedNameParams = Symbol('fullAllowedNameParams')
  
  
  
  export type RouteSelf = {
    [path]: string
  }
  export type RouteProps = {
    [up]: undefined|RouteSegment
    [full]: typeof getFull
    [next]: typeof getNext
    [use]: typeof getUse
    [fullParams]: typeof getFullParams
    [fullAnySearchParams]: typeof getFullAnySearchParams
    [fullAllowedNameParams]: typeof getFullAllowedNameParams
  }
  export type RoutePaths = {
    [params]?: empty | { [prop: string]: string }
    [prop: string]: RouteSegment
  }
  export type RouteSegment = RouteSelf & RouteProps & RoutePaths
  
  
  
  
  export function getFull(this:RouteSegment): string {
    const upPath = this[up]?.[full]?.()
    const currentPath = this[path]
    return pathConcat(upPath,currentPath)
  }
  
  
  export function getNext
    (this:RouteSegment, pathSegment: string)
    : RouteSelf & RouteProps
  {
    const next = buildPath(pathSegment)
    next[up] = this
    return next
  }
  
  
  export function getUse
    <R extends RouteSegment>
    (this:R, pathSegment: string)
    : R
  {
    return {
      ...this,
      [path]: pathSegment,
    }
  }
  
  
  
  export function getFullParams
    <R extends RouteSegment>
    (this:R, applyParams?: empty | {
      anySearchParams?: URLSearchParams | empty
      allowedSearchParams?: URLSearchParams | empty
      anyNameParams?: { [pathName: string]: string | empty } | empty
      allowedNameParams?: empty | (
        R[typeof params] extends object
          ? { [Path in ObjectKeysType<R[typeof params]>]: string | empty }
          : never
        )
      anyPathParams?: { [path: string]: string | empty } | empty
      allowedPathParams?: { [path: string]: string | empty } | empty
    })
    : string
  {
    let fullPath = this[full]()
    const allowedParamNames = ObjectKeys(this[params])
    const allowedParamPaths = ObjectValues(this[params])
    const newParams = ObjectEntries(applyParams).reduce((newParams,[type,applyParam])=>{
      if (applyParam) switch (type){
        case 'allowedSearchParams':
          applyParam.forEach((v,n)=>{
            if (allowedParamPaths.includes(n) && exists(v)) newParams[n]=v
          })
          break
        case 'allowedNameParams':
          ObjectEntries(applyParam).forEach(([n,v])=>{
            if (allowedParamNames.includes(n) && exists(v)) newParams[this[params]![n]]=v
          })
          break
        case 'allowedPathParams':
          ObjectEntries(applyParam).forEach(([n,v])=>{
            if (allowedParamPaths.includes(n) && exists(v)) newParams[n]=v
          })
          break
        case 'anySearchParams':
          applyParam.forEach((v,n)=>{
            if (exists(v)) newParams[n]=v
          })
          break
        case 'anyNameParams':
          ObjectEntries(applyParam).forEach(([n,v])=>{
            if (exists(v)) newParams[this[params]![n]]=v
          })
          break
        case 'anyPathParams':
          ObjectEntries(applyParam).forEach(([n,v])=>{
            if (exists(v)) newParams[n]=v
          })
          break
      }
      return newParams
    },{} as { [prop: string]: string })
    const newParamsString = new URLSearchParams(newParams).toString()
    if (newParamsString) fullPath += '?'+newParamsString
    return fullPath
  }
  
  
  
  export function getFullAnySearchParams
    <R extends RouteSegment>
    (this:R, applyParams?: URLSearchParams | empty)
    : string
  {
    return this[fullParams]({ anySearchParams: applyParams })
  }
  
  
  
  export function getFullAllowedNameParams
    <R extends RouteSegment>
    (
      this:R,
      applyParams?: empty | (
        R[typeof params] extends object
          ? { [Path in ObjectKeysType<R[typeof params]>]: string | empty }
          : never
      )
    )
    : string
  {
    return this[fullParams]({ allowedNameParams: applyParams })
  }
  
  
  
  
  
  export function buildPath(pathSegment: string): RouteSelf & RouteProps {
    return {
      [path]: pathSegment,
      [up]: undefined,
      [full]: getFull,
      [next]: getNext,
      [use]: getUse,
      [fullParams]: getFullParams,
      [fullAnySearchParams]: getFullAnySearchParams,
      [fullAllowedNameParams]: getFullAllowedNameParams,
    }
  }
  
  export function buildRoute
    <R extends RouteSelf & RoutePaths>
    (routeSegment: R)
    : R & RouteProps
  {
    const route = {
      ...routeSegment,
      [up]: undefined,
      [full]: getFull,
      [next]: getNext,
      [use]: getUse,
      [fullParams]: getFullParams,
      [fullAnySearchParams]: getFullAnySearchParams,
      [fullAllowedNameParams]: getFullAllowedNameParams,
    }
    ObjectValues(route).forEach(downRoute => downRoute[up] = route)
    return route
  }
  
  
  
  
  /* {
    const testRoutes = buildRoute({
      [path]: '',
      [params]: {
        a: 'a'
      },
      
      profile: {
        [up]: undefined,
        [path]: 'profile',
        [full]: getFull,
        [next]: getNext,
        [use]: getUse,
        [fullParams]: getFullParams,
        [fullAnySearchParams]: getFullAnySearchParams,
        [fullAllowedNameParams]: getFullAllowedNameParams,
        [params]: {
          a: 'a',
          x: 'x',
        },
        id: {
          [up]: undefined,
          [path]: 'id',
          [full]: getFull,
          [next]: getNext,
          [use]: getUse,
          [fullParams]: getFullParams,
          [fullAnySearchParams]: getFullAnySearchParams,
          [fullAllowedNameParams]: getFullAllowedNameParams,
        } satisfies RouteSegment,
      } satisfies RouteSegment,
      
      main: {
        [up]: undefined,
        [path]: 'main',
        [full]: getFull,
        [next]: getNext,
        [use]: getUse,
        [fullParams]: getFullParams,
        [fullAnySearchParams]: getFullAnySearchParams,
        [fullAllowedNameParams]: getFullAllowedNameParams,
      } satisfies RouteSegment,
      
      profile2: buildRoute({
        [path]: 'profile',
        [params]: {
          a: 'a',
          x: 'x',
        },
        id: buildRoute({
          [path]: 'id',
          idName: buildPath('id-name'),
        }),
        id2: buildRoute({
          [path]: 'id',
          down: buildRoute({
            [path]: 'down',
            downX2: buildRoute({
              [path]: 'downX2',
              [params]: {
                down: 'downParam',
              }
            }),
            [params]: {
              a: 'a',
              return: 'return',
            }
          })
        }),
      }),
    })
    
    
    
    let testStringValue: string
    testStringValue = testRoutes.profile.id[full]()
    testStringValue = testRoutes.profile[full]()
    testStringValue = testRoutes.profile2.id2[full]()
    testStringValue = testRoutes.profile2.id2[full]()
    testStringValue = testRoutes.profile2.id2.down[params].return
    testStringValue = testRoutes.profile2.id2.down.downX2[params].down
    testStringValue = testRoutes.profile2.id2.down.downX2[full]()
    testStringValue = testRoutes.profile2.id[path]
    testStringValue = testRoutes.profile2.id.idName[full]()
    testStringValue = testRoutes.profile2.id2.down.downX2[fullParams]({
      anyNameParams: { down: 'y', param: 'a' },
      allowedNameParams: { down: 'y', /!*param: 'a'*!/ }, // error for 'param' as expected
      anyPathParams: { downParam: 'y', param: 'a' },
      allowedPathParams: { downParam: 'y', param: 'a' }, // NO error for 'param' as expected
    })
    
  } */
  
}