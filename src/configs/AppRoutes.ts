import { RouteBuilder } from '@mini-libs/route-builder/RouteBuilder.tsx'
import buildRoute = RouteBuilder.buildRoute
import buildPath = RouteBuilder.buildPath
import path = RouteBuilder.path
import params = RouteBuilder.params




export namespace AppRoutes {
  
  
  export const overlayParamName = 'overlay' as const
  
  
  
  const login = buildRoute({
    [path]: 'login',
    [params]: {
      returnPath: 'returnPath',
    },
  })
  const autologin = buildRoute({
    [path]: 'autologin',
    [params]: {
      useAccount: 'useAccount',
      returnPath: 'returnPath',
    },
  })
  const signup = buildRoute({
    [path]: 'signup',
    [params]: {
      returnPath: 'returnPath',
    },
  })
  
  
  
  
  
  const profile = buildRoute({
    [path]: 'p',
    id: buildRoute({
      [path]: 'id',
      userId: buildRoute({
        [path]: ':userId',
        summary: buildPath('summary'),
        tab: buildRoute({
          [path]: 'tab',
          preview: buildPath('preview'),
          edit: buildPath('edit'),
          tests: buildPath('tests'),
        }),
        share: buildPath('share'),
        overview: buildPath('overview'),
      }),
    }),
  })
  const chats = buildRoute({
    [path]: 'chats',
  })
  const findPair = buildRoute({
    [path]: 'find-pair',
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
  
  
  
  const chat = buildRoute({
    [path]: 'chat',
    userId: buildRoute({
      [path]: 'user-id',
      id: buildPath(':id'),
    }),
    id: buildRoute({
      [path]: 'id',
      id: buildPath(':id'),
    }),
  })
  const likedMe = buildRoute({
    [path]: 'liked-me',
  })
  
  
  
  const test = buildRoute({
    [path]: 'test',
    mbti: buildPath('mbti'),
  })
  
  
  
  
  const devTest = buildRoute({
    [path]: 'dev-test',
    
    theme: buildPath('theme'),
    icons: buildPath('icons'),
    buttons: buildPath('buttons'),
    scrollbar: buildPath('scrollbar'),
    bottomSheet: buildPath('bottom-sheet'),
    viewsSelectItem: buildPath('views-select-item'),
    ripple: buildPath('ripple'),
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
    cssTest: buildPath('css'),
    
    emulatedScroll: buildPath('emulated-scroll'),
  })
  
  
  
  
  export const RootRoute = buildRoute({
    [path]: '',
    
    login,
    autologin,
    signup,
    
    profile,
    chats,
    findPair,
    bowAndArrows,
    settings,
    
    datePlaces,
    datePlace,
    
    dateArticles,
    dateArticle,
    
    chat,
    likedMe,
    
    test,
    
    
    devTest,
  })
  
}
