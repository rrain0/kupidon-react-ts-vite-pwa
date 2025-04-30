


export const Env = {
  isDev: import.meta.env.DEV satisfies boolean,
  isProd: import.meta.env.PROD satisfies boolean,
  
  // with '/' at the end
  baseUrl: import.meta.env.BASE_URL satisfies string,
  backendBaseUrl:  import.meta.env.BACKEND_BASE_URL satisfies string,
  
  buildDate: import.meta.env.BUILD_DATE satisfies string,
}


