import { RouteBuilder } from '@util/mini-libs/route-builder/RouteBuilder'
import buildRoute = RouteBuilder.buildRoute
import buildPath = RouteBuilder.buildPath
import path = RouteBuilder.path
import params = RouteBuilder.params




export namespace AppRoutes {
  
  
  export const overlayParam = 'overlay'
  
  
  
  
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
  
  
  
  
  const chat = buildRoute({
    [path]: 'chat',
  })
  
  
  
  
  const findPairs = buildRoute({
    [path]: 'find-pairs'
  })
  
  
  
  
  const bowAndArrows = buildRoute({
    [path]: 'bow-and-arrows',
    allEvents: buildPath('all-events'),
  })
  
  
  
  
  const settings = buildRoute({
    [path]: 'settings',
    account: buildPath('account'),
    app: buildPath('app'),
    pwdChange: buildPath('pwd-change'),
  })
  
  
  
  
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
  
  
  
  
  export const RootRoute = buildRoute({
    [path]: '',
    login,
    signup,
    
    profile,
    chat,
    findPairs,
    bowAndArrows,
    settings,
    
    test,
  })
  
}