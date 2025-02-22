import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import buildRoute = RouteBuilder.buildRoute
import buildPath = RouteBuilder.buildPath
import path = RouteBuilder.path
import params = RouteBuilder.params




export namespace AppRoutes {
  
  
  export const overlayParamName = 'overlay' as const
  
  
  
  const login = buildRoute({
    [path]: 'login',
    [params]: {
      returnPath: 'return-path',
    },
  })
  const signup = buildRoute({
    [path]: 'signup',
    [params]: {
      returnPath: 'return-path',
    },
  })
  
  
  
  
  
  const profile = buildRoute({
    [path]: 'p',
    id: buildRoute({
      [path]: 'id',
      userId: buildRoute({
        [path]: ':userId',
        summary: buildPath('summary'),
        preview: buildPath('preview'),
        profile: buildPath('profile'),
        tests: buildPath('tests'),
      }),
    }),
  })
  const chat = buildRoute({
    [path]: 'chat',
  })
  const findPairs = buildRoute({
    [path]: 'find-pairs',
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
  const datePlaces = buildRoute({
    [path]: 'date-places',
    [params]: {
      // ...?category=romantic
      category: 'category',
      // ...?type=cafe
      type: 'type',
    },
  })
  
  
  
  
  const test = buildRoute({
    [path]: 'test',
    mbti: buildPath('mbti'),
  })
  
  
  
  
  const dev = buildRoute({
    [path]: 'dev',
    
    scrollbar: buildPath('scrollbar'),
    bottomSheet: buildPath('bottom-sheet'),
    viewsSelectItem: buildPath('views-select-item'),
    ripple: buildPath('ripple'),
    buttons: buildPath('buttons'),
    slider: buildPath('slider'),
    image: buildPath('image'),
    
    resizeObserver: buildPath('resize-observer'),
    moveElementToAnotherView: buildPath('move-element-to-another-view'),
    pointer: buildPath('pointer'),
    tabs: buildPath('tabs'),
    state: buildPath('state'),
    pageLifecycle: buildPath('page-lifecycle'),
    useEvent: buildPath('use-event'),
    elemRef: buildPath('elem-ref'),
    elemStyle: buildPath('elem-style'),
    oldProfileOptions: buildPath('old-profile-options'),
    shadowDOMTest: buildPath('shadow-dom'),
    
    emulatedScroll: buildPath('emulated-scroll'),
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
    datePlaces,
    
    test,
    
    dev,
  })
  
}
