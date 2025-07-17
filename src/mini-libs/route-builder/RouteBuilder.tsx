import { ObjectU } from 'src/util/common/ObjectU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import emptyval = TypeU.emptyval
import ObjectValues = ObjectU.ObjectValues
import ObjectKeysType = ObjectU.ObjectKeysType
import ObjectEntries = ObjectU.ObjectEntries
import ObjectKeys = ObjectU.ObjectKeys
import isstring = TypeU.isstring
import Pu = TypeU.Pu




export namespace RouteBuilder {
  

  function todoRefactorVariants() {
    // Пока что выглядит это всё не очень
    
    const route = Symbol('route')
    const routes = {
      [route]: {
        path: 'chat',
        params: { returnPath: 'returnPath' },
      },
      userId: {
        [route]: { path: 'user-id' },
        id: ':id',
      },
      id: {
        [route]: { path: 'id' },
        id: ':id',
      },
    }
    
    const routes2 = {
      $path: 'chat',
      $params: { returnPath: 'returnPath' },
      userId: {
        $path: 'user-id',
        id: ':id',
      },
      id: {
        $path: 'id',
        id: ':id',
      },
      test: {
      
      },
    }
  }
  
  
  
  
  // null | undefined | '' for the first path means root
  export const pathConcat = (...paths: Array<string | emptyval>): string => {
    let result = paths[0] ?? ''
    for (let i = 1; i < paths.length; i++) {
      let path = paths[i] ?? ''
      result = result.replace(/\/$/, '')
      path = path.replace(/^\//, '')
      if (path) result += '/' + path
    }
    return result
  }
  
  export const asterisk = (path: string) => {
    return pathConcat(path, '*')
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
    // this path segment
    [path]: string
  }
  export type RouteProps = {
    [up]: undefined | RouteSegment
    [full]: typeof getFull
    [next]: typeof getNext
    // replace this path segment by provided string
    [use]: typeof getUse
    [fullParams]: typeof getFullParams
    [fullAnySearchParams]: typeof getFullAnySearchParams
    [fullAllowedNameParams]: typeof getFullAllowedNameParams
  }
  export type RoutePaths = {
    [params]?: emptyval | { [prop: string]: string }
    [prop: string]: RouteSegment
  }
  export type RouteSegment<R extends RouteSelf & RoutePaths = RouteSelf & RoutePaths> = (
    R & RouteProps
  )
  export type RouteSegmentPath = RouteSelf & RouteProps
  
  
  
  export function getFull(this: RouteSegment): string {
    const upPath = this[up]?.[full]?.()
    const currentPath = this[path]
    return pathConcat(upPath, currentPath)
  }
  
  
  export function getNext(this:RouteSegment, pathSegment: string): RouteSelf & RouteProps {
    const next = buildPath(pathSegment)
    next[up] = this
    return next
  }
  
  
  const copyRouteTree = <R extends RouteSegment>(node: R): R => {
    node = { ...node }
    ObjectEntries(node).forEach(([k, v]) => {
      const descendant = copyRouteTree(v)
      descendant[up] = node
      node[k] = descendant
    })
    return node
  }
  
  export function getUse<R extends RouteSegment>(this: R, pathSegment: string): R {
    const node = { ...this, [path]: pathSegment }
    return copyRouteTree(node)
  }
  
  
  
  
  export type AllowedNameParams<R extends RouteSegment> = (
    R[typeof params] extends object
      ? { [Path in ObjectKeysType<R[typeof params]>]?: string | emptyval }
      : never
  )
  export type AllowedNameParamsRoutes<R extends RouteSegment> = (
    R[typeof params] extends object
      ? { [Path in ObjectKeysType<R[typeof params]>]?: RouteSegment | string | emptyval }
      : never
  )
  export type AnyParams = Pu<{ [param: string]: string | null }>
  
  // TODO Route - support string array params
  export function getFullParams<R extends RouteSegment>(
    this: R,
    applyParams?: Pu<{
      allowedSearchParams: URLSearchParams | null
      allowedNamedParams: AllowedNameParams<R> | null
      allowedParams: AnyParams | null
      anySearchParams: URLSearchParams | null
      anyParams: AnyParams | null
    }>
  ): string {
    let fullPath = this[full]()
    const allowedParamNames = ObjectKeys(this[params])
    const allowedParamPaths = ObjectValues(this[params])
    const newParams = ObjectEntries(applyParams).reduce((newParams, [type, applyParam]) => {
      
      if (applyParam) {
        if (type === 'allowedSearchParams') {
          applyParam.forEach((v, n) => {
            newParams[n] = v
          })
        }
        else if (type === 'allowedNamedParams') {
          ObjectEntries(applyParam).forEach(([n, v]) => {
            if (allowedParamNames.includes(n)) {
              if (v === null) delete newParams[this[params]![n]]
              else if (isstring(v)) newParams[this[params]![n]] = v
            }
          })
        }
        else if (type === 'allowedParams') {
          ObjectEntries(applyParam).forEach(([n, v]) => {
            if (allowedParamPaths.includes(n)) {
              if (v === null) delete newParams[n]
              else if (isstring(v)) newParams[n] = v
            }
          })
        }
        else if (type === 'anySearchParams') {
          applyParam.forEach((v, n) => {
            newParams[n] = v
          })
        }
        else if (type === 'anyParams') {
          ObjectEntries(applyParam).forEach(([n, v]) => {
            if (v === null) delete newParams[n]
            else if (isstring(v)) newParams[n] = v
          })
        }
      }
      return newParams
    }, { } as { [prop: string]: string })
    const newParamsString = new URLSearchParams(newParams).toString()
    if (newParamsString) fullPath += '?' + newParamsString
    return fullPath
  }
  
  
  
  export function getFullAnySearchParams<R extends RouteSegment>(
    this: R,
    applyParams?: URLSearchParams | emptyval
  ): string {
    return this[fullParams]({ anySearchParams: applyParams })
  }
  
  
  
  export function getFullAllowedNameParams<R extends RouteSegment>(
    this: R,
    applyParams?: emptyval | AllowedNameParams<R>
  ): string {
    return this[fullParams]({ allowedNamedParams: applyParams })
  }
  
  
  
  
  
  export function buildPath(pathSegment: string): RouteSegmentPath {
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
  
  export function buildRoute<R extends RouteSelf & RoutePaths>(routeSegment: R): RouteSegment<R> {
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
      allowedNamedParams: { down: 'y', /!*param: 'a'*!/ }, // error for 'param' as expected
      anyParams: { downParam: 'y', param: 'a' },
      allowedParams: { downParam: 'y', param: 'a' }, // NO error for 'param' as expected
    })
    
  } */
  
}
