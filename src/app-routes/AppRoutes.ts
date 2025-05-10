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
  const findCouple = buildRoute({
    [path]: 'find-couple',
  })
  const bowAndArrows = buildRoute({
    [path]: 'bow-and-arrows',
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
  const datePlace = buildRoute({
    [path]: 'date-place',
    placeId: buildPath(':placeId'),
  })
  
  const dateArticles = buildRoute({
    [path]: 'date-articles',
    [params]: {
      // ...?category=...
      category: 'category',
      // ...?type=...
      type: 'type',
    },
  })
  const dateArticle = buildRoute({
    [path]: 'date-article',
    articleId: buildPath(':articleId'),
  })
  
  
  
  
  const test = buildRoute({
    [path]: 'test',
    mbti: buildPath('mbti'),
  })
  
  
  
  
  const devTest = buildRoute({
    [path]: 'dev-test',
    
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
    findCouple,
    bowAndArrows,
    settings,
    
    test,
    
    datePlaces,
    datePlace,
    
    dateArticles,
    dateArticle,
    
    
    devTest,
  })
  
}
