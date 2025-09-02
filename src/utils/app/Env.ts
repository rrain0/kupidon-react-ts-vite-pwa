



export namespace Env {
  export const isDev: boolean = import.meta.env.DEV
  export const isProd: boolean = import.meta.env.PROD
  
  // Will be with '/' at the end
  export const baseUrl: string = import.meta.env.BASE_URL
  
  export const backendHost: string = import.meta.env.BACKEND_HOST
  export const backendPort: string = import.meta.env.BACKEND_PORT
  
  export const backendHttpsHostPort = `https://${backendHost}:${backendPort}`
  export const backendWssHostPort = `wss://${backendHost}:${backendPort}`
  
  export const buildDate: string = import.meta.env.BUILD_DATE
}


