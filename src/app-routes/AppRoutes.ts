import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import buildRoute = RouteBuilder.buildRoute
import buildPath = RouteBuilder.buildPath
import path = RouteBuilder.path
import params = RouteBuilder.params




export namespace AppRoutes {
  
  
  
  const test = buildRoute({
    [path]: 'test',
    scrollbar: buildPath('scrollbar'),
    bottomSheet: buildPath('bottom-sheet'),
    resizeObserver: buildPath('resize-observer'),
    moveElementToAnotherView: buildPath('move-element-to-another-view'),
    pointer: buildPath('pointer'),
    tabs: buildPath('tabs'),
    state: buildPath('state'),
  })
  
  
  
  const findPairs = buildRoute({
    [path]: 'find-pairs'
  })
  
  
  
  const login = buildRoute({
    [path]: 'login',
    [params]: {
      returnPath: 'return-path',
    }
  })
  
  
  
  const signup = buildRoute({
    [path]: 'signup',
    [params]: {
      returnPath: 'return-path',
    }
  })
  
  
  
  const profileId = buildRoute({
    [path]: 'id',
    userId: buildPath(':userId'),
  })
  const profile = buildRoute({
    [path]: 'p',
    id: profileId,
  })
  
  
  
  const settings = buildRoute({
    [path]: 'settings',
    account: buildPath('account'),
    app: buildPath('app'),
    pwdChange: buildPath('pwd-change'),
  })
  
  
  
  export const RootRoute = buildRoute({
    [path]: '',
    test,
    findPairs,
    login,
    signup,
    profile,
    settings,
  })
  
}