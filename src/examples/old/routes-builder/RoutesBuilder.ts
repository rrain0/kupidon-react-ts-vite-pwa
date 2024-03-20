import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import exists = TypeUtils.exists
import ObjectEntries = ObjectUtils.ObjectEntries
import ObjectKeys = ObjectUtils.ObjectKeys
import ObjectValues = ObjectUtils.ObjectValues









/*
  to do
    Transform into
    {
      path: '',
      next: {
        login: build('login'),
        profile: build({ path: 'profile', next: {...} }),
      },
      params: {
        someParam: 'some-param',
      }
    }
    use(newPathSegment)
    next() instead of descent
    path
    full(searchParams)
    root path: '' or null ???

*/

export namespace RoutesBuilder {
  
  
  
  
  export const urlPathConcat = (basePath:string, path:string)=>{
    if (!path) return basePath
    if (!basePath) return path
    basePath = basePath.replace(/\/$/,'')
    path = path.replace(/^\//,'')
    return basePath+'/'+path
  }
  export const withAsterisk = (path: string) => {
    return urlPathConcat(path,'*')
  }
  
  
  
  
  export type RouteDescription<
    Paths extends string = never,
    Params extends string = never,
  > = {
    path?: empty | string
    paths?: empty | { [Path in Paths]: string|RouteDescription }
    params?: empty | { [Param in Params]: string }
  }
  
  
  
  
  
  // однако тайпскрипт переваривает все эти типы глубиной 1 роут
  export type RouteObjectFromRouteDescription<
    RD extends RouteDescription,
  > = {
      up?: empty | RouteObjectFromRouteDescription< RouteDescription<never,never> >
      path: string
      params?: empty | { [Param in string & keyof RD['params']]: string }
      fullPath(params?: empty | { [Param in string & keyof RD['params']]: string }): string
      fullPath2: typeof fullPath2
      fullPath3: typeof fullPath3
      descend(path: string): RouteObject<never,never>
    } & {
      [Path in keyof RD['paths'] as Path extends string ? Path : never]:
        RD['paths'] extends object
          ? RD['paths'][Path] extends string
            ? RouteObjectFromRouteDescription< RouteDescription<never,never> >
            : RD['paths'][Path] extends RouteDescription<infer Paths2, infer Params2>
              ? RouteObjectFromRouteDescription< RouteDescription<Paths2,Params2> >
              : never
          : never
    } & {
      [Path in keyof RD['paths'] as Path extends string ? `${Path}With` : never]:
        (pathSegment: string) => RD['paths'] extends object
          ? RD['paths'][Path] extends string
            ? RouteObjectFromRouteDescription< RouteDescription<never,never> >
            : RD['paths'][Path] extends RouteDescription<infer Paths2, infer Params2>
              ? RouteObjectFromRouteDescription< RouteDescription<Paths2,Params2> >
              : never
          : never
    } & { [prop: string]: any } // костыль
  
  
  
  
  export type RouteObject<
   Paths extends string = never,
   Params extends string = never
  > = {
    up?: empty | RouteObject
    path: string
    params?: empty | { [Param in Params]: string }
    fullPath: typeof fullPath<Params>
    fullPath2: typeof fullPath2
    fullPath3: typeof fullPath3
    descend: typeof descend
  }
  & { [Prop in string & keyof Paths]: RouteObject }
  & { [Prop in `${string & keyof Paths}With`]: (pathSegment: string)=>RouteObject }
  & { [prop: string]: any } // костыль
  
  
  
  
  // this doesn't work properly - need negate type that is in development
  /*export type RoutePaths<Paths extends string = string> =
   Exclude<Paths, keyof RouteObject>
   
   export type RoutePathsWith<Paths extends string = string> =
   Exclude<`${Paths}With`, keyof RouteObject>*/
  
  /*export type RouteObject<
    Paths extends string = string,
    Params extends string = string
  > = RouteObject<Paths,Params>*/
  //& { [Path in Paths]: RouteObject } // this doesn't work properly
  //& { [Path in `${Paths}With`]: RouteObject } // this doesn't work properly
  
  
  
  
  
  
  // copies only allowed params
  // accepts only name params
  export function fullPath<Params extends string = never>(
    this: RouteObject<never,Params>,
    params?: empty | { [Param in Params]: string|empty }
  ){
    const upPath = this.up?.fullPath() ?? ''
    const path = this.path ?? ''
    let fullPath = urlPathConcat(upPath,path)
    if (params){
      const newParams: { [Param in Params]?: string } = {}
      if (this.params) ObjectEntries(this.params).forEach(([paramName,paramPath])=>{
        if (exists(params[paramName])){
          newParams[paramPath as any] = params[paramName]
        }
      })
      const stringParams = new URLSearchParams(
        newParams as Record<string, string>
      ).toString()
      if (stringParams) fullPath += '?'+stringParams
    }
    return fullPath
  }
  
  
  // copies only allowed params
  // accepts url search params, path params, name params
  // the older entry in object - the more priority it has
  export function fullPath2(
    this: RouteObject<never,string>,
    params?: empty | {
      urlSearchParams?: URLSearchParams | empty
      pathParams?: { [PathParam in string]?: string | empty } | empty
      nameParams?: { [PathParam in string]?: string | empty } | empty
    }
  ){
    const upPath = this.up?.fullPath() ?? ''
    const path = this.path ?? ''
    let fullPath = urlPathConcat(upPath,path)
    if (this.params) {
      const allowedParamNames = ObjectKeys(this.params)
      const allowedParamPaths = ObjectValues(this.params)
      const newParams = ObjectEntries(params).reduce((newParams,[type,params])=>{
        if (params) switch (type){
          case 'urlSearchParams':
            (params as URLSearchParams).forEach((v,n)=>{
              if (allowedParamPaths.includes(n)) newParams[n]=v
            })
            break
          case 'pathParams':
            ObjectEntries(params as { [PathParam in string]?: string | empty }).forEach(([n,v])=>{
              if (allowedParamPaths.includes(n)) newParams[n]=v
            })
            break
          case 'nameParams':
            ObjectEntries(params as { [PathParam in string]?: string | empty }).forEach(([n,v])=>{
              if (allowedParamNames.includes(n)) newParams[this.params![n]]=v
            })
            break
        }
        return newParams
      },{})
      const newParamsString = new URLSearchParams(newParams).toString()
      if (newParamsString) fullPath += '?'+newParamsString
    }
    return fullPath
  }
  
  
  // just copies all params
  // accepts url search params, path params, name params
  // the older entry in object - the more priority it has
  export function fullPath3(
    this: RouteObject<never,string>,
    params?: empty | {
      urlSearchParams?: URLSearchParams | empty
      pathParams?: { [PathParam in string]?: string | empty } | empty
      nameParams?: { [PathParam in string]?: string | empty } | empty
    }
  ){
    const upPath = this.up?.fullPath() ?? ''
    const path = this.path ?? ''
    let fullPath = urlPathConcat(upPath,path)
    const newParams = ObjectEntries(params).reduce((newParams,[type,params])=>{
      if (params) switch (type){
        case 'urlSearchParams':
          (params as URLSearchParams).forEach((v,n)=>{
            newParams[n]=v
          })
          break
        case 'pathParams':
          ObjectEntries(params as { [PathParam in string]?: string | empty }).forEach(([n,v])=>{
            newParams[n]=v
          })
          break
        case 'nameParams':
          ObjectEntries(params as { [PathParam in string]?: string | empty }).forEach(([n,v])=>{
            newParams[this.params![n]]=v
          })
          break
      }
      return newParams
    },{})
    const newParamsString = new URLSearchParams(newParams).toString()
    if (newParamsString) fullPath += '?'+newParamsString
    
    return fullPath
  }
  
  
  export function descend(this: RouteObject, path: string): RouteObject<never,never> {
    // @ts-ignore
    return {
      up: this,
      path: path,
      fullPath: fullPath,
      descend: descend,
    }
  }
  
  
  
  export function buildRoutes<
    RD extends RouteDescription,
  >(rootRoutes: RD){
    type Paths = string & keyof RD['paths']
    type Params = string & keyof RD['params']
  
    const excludedPathsNames: (keyof RouteObject)[] = [
      'up','path','params',
      'fullPath','fullPath2','fullPath3',
      'descend'
    ]
    const usedPathNames: string[] = []
  
    const newRoute: Partial<RouteObject<Paths,Params>> = {}
    newRoute.up = undefined
    newRoute.path = rootRoutes.path ?? ''
    newRoute.params = rootRoutes.params as empty | { [Param in Params]: string }
    newRoute.fullPath = fullPath
    newRoute.fullPath2 = fullPath2
    newRoute.fullPath3 = fullPath3
    newRoute.descend = descend
  
    if (rootRoutes.paths) Object.entries(rootRoutes.paths).forEach(([routeName,routePath])=>{
      if (excludedPathsNames.includes(routeName) || excludedPathsNames.includes(`${routeName}With`))
        throw new Error(
          `You can't use path name ${routeName} because it is reserved path object property`
        )
      if (usedPathNames.includes(routeName) || usedPathNames.includes(`${routeName}With`))
        throw new Error(
          `Duplicate path name ${routeName}`
        )
      usedPathNames.push(routeName,`${routeName}With`)
    
      let subroute: RouteDescription
    
      if (typeof routePath === 'string') subroute = { path: routePath }
      else subroute = routePath as RouteDescription<never, never>
    
      const newSubroute = buildRoutes(subroute)
    
      newRoute[routeName] = newSubroute
      newSubroute.up = newRoute as RouteObjectFromRouteDescription<RouteDescription<never, never>>
    
      newRoute[`${routeName}With`] = function(pathSegment: string){
        const routeObj = {...this[routeName]}
        routeObj.path = pathSegment
        return routeObj
      }
    })
  
  
    return newRoute as unknown as RouteObjectFromRouteDescription<RD>
  }
  
}







//const str: string = RootRoutes.profile.userId.main.path
//const str2: string = RootRoutes.apartment.apartmentId.path
//const str3: string = RootRoutes.apartmentWith('ap').path

// Для тестов
export const pwdRecoveryRoutes2 = {
  path: 'pwd-recovery',
  paths: {
    enterEmail: {
      
      path: 'enter-email',
      params: {
        backPath: 'back-path',
      }
      
    },
    enterNewPwd: {
      
      path: 'enter-new-pwd',
      paths: {
        somePath: 'some-path'
      },
      params: {
        backPath: 'back-path',
        resetPwdToken: 'reset-pwd-token',
      }
      
    },
  }
} satisfies RoutesBuilder.RouteDescription


const www: RoutesBuilder.RouteObjectFromRouteDescription<typeof pwdRecoveryRoutes2> = {
  up: undefined,
  path: 'pwd-recovery',
  params: undefined,
  fullPath: RoutesBuilder.fullPath,
  fullPath2: RoutesBuilder.fullPath2,
  fullPath3: RoutesBuilder.fullPath3,
  descend: RoutesBuilder.descend,
  
  enterEmail: {
    up: undefined,
    path: 'enter-email',
    fullPath: RoutesBuilder.fullPath,
    fullPath2: RoutesBuilder.fullPath2,
    fullPath3: RoutesBuilder.fullPath3,
    descend: RoutesBuilder.descend,
    params: {
      backPath: 'back-path',
    },
  },
  enterEmailWith(pathSegment: string){ return this.enterEmail },
  
  enterNewPwd: {
    up: undefined,
    path: 'enter-email',
    fullPath: RoutesBuilder.fullPath,
    fullPath2: RoutesBuilder.fullPath2,
    fullPath3: RoutesBuilder.fullPath3,
    descend: RoutesBuilder.descend,
    params: {
      backPath: 'back-path',
      resetPwdToken: 'pwd-reset-token',
    },
    somePath: {
      up: undefined,
      path: 'some-path',
      fullPath: RoutesBuilder.fullPath,
      descend: RoutesBuilder.descend,
    },
    somePathWith(pathSegment: string){ return this.enterNewPwd },
  },
  enterNewPwdWith(pathSegment: string){ return this.enterNewPwd },
}


/*
 const obj = {
 a: 'a',
 b: 'b',
 c: 'c',
 }
 
 const obj2:
 { [Prop in keyof typeof obj]: string } &
 { [Prop in `${keyof typeof obj}With`]: (pathSegment?: string)=>string } = {
 a: 'a',
 aWith(pathSegment?: string){ return pathSegment ?? this.a },
 b: 'a',
 bWith(pathSegment?: string){ return pathSegment ?? this.a },
 c: 'c',
 cWith(pathSegment?: string){ return pathSegment ?? this.c },
 }
 */
 