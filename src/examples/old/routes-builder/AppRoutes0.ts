import { RoutesBuilder } from 'src/examples/old/routes-builder/RoutesBuilder'




/* export */ namespace AppRoutes0 {
  
  
  import RouteDescription = RoutesBuilder.RouteDescription
  const testRoutes = {
    path: 'test',
    paths: {
      scrollbar: 'scrollbar',
      bottomSheet: 'bottom-sheet',
      resizeObserver: 'resize-observer',
    }
  }
  
  
  
  const mainRoutes = {
    path: 'main'
  } satisfies RouteDescription
  
  
  const loginRoutes = {
    path: 'login',
    params: {
      returnPath: 'return-path',
    }
  } satisfies RouteDescription
  
  
  
  const signupRoutes = {
    path: 'signup',
    params: {
      returnPath: 'return-path',
    }
  } satisfies RouteDescription
  
  
  
  const profileIdRoutes = {
    path: 'p',
    paths: {
      id: { path: 'id',
        paths: {
          userId: ':userId',
        }
      },
    }
  } satisfies RouteDescription
  
  
  
  /*
   const settingsRoutes = {
   path: 'settings'
   } satisfies RouteDescription
   */
  
  
  const rootRoutes = {
    path: '/',
    paths: {
      test: testRoutes,
      main: mainRoutes,
      login: loginRoutes,
      signup: signupRoutes,
      profile: profileIdRoutes,
      //settings: settingsRoutes,
    }
  } satisfies RouteDescription
  
  export const RootRoutes = RoutesBuilder.buildRoutes(rootRoutes)
  
}
