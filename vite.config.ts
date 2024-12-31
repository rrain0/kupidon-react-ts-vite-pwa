import * as fs from 'node:fs'
import * as path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import checker from 'vite-plugin-checker'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'




const projectRoot: string = process.cwd() // current working directory




const pwaOptions: Partial<VitePWAOptions> = {
  strategies: 'injectManifest',
  // SW folder
  srcDir: 'src/service-worker',
  // SW filename
  filename: 'service-worker.ts',
  // Prompt user to reload page when SW was updated
  registerType: 'prompt',
  
  devOptions: {
    // enable PWA in dev mode
    enabled: true,
    // The Service Worker type - 'module' - ES module-based service worker (for modern browsers)
    type: 'module',
    navigateFallback: 'index.html',
  },

  // Do not inject manifest, only service worker,
  // so you can write your own link to manifest in index.html
  // https://vite-pwa-org.netlify.app/guide/service-worker-without-pwa-capabilities
  injectRegister: 'script',
  manifest: false,

  base: '/',
  
  includeAssets: ['public/**'],
}



// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  
  let envFileConfig: Record<string, string> = { }
  const envVarsRuntime: Record<string, string> = {
    // support for node and legacy libs
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.BUILD_DATE': JSON.stringify(new Date().toISOString()),
  }
  
  // LOAD ENVS BY VITE (with respect to vite env filename rules)
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env vars regardless of the `VITE_` prefix.
  //const env = loadEnv(mode, process.cwd(), '')
  
  // LOAD CUSTOM ENV FILES (any env filename)
  if (mode === 'development') {
    const envFileName = 'react.dev.env'
    envFileConfig = dotenvExpand.expand({
      parsed: dotenv.parse(fs.readFileSync(envFileName)),
    }).parsed as Record<string, string>
    envVarsRuntime[`import.meta.env.API_BASE_URL`] = JSON.stringify(envFileConfig.API_BASE_URL)
    //envVarsRuntime[`process.env.TEST`] = JSON.stringify(envFileConfig[TEST])
  }
  if (mode === 'production') {
    envVarsRuntime[`import.meta.env.API_BASE_URL`] = JSON.stringify(process.env.API_BASE_URL)
  }
  
  
  return {
    
    // configure vite DEVELOPMENT server (yarn run dev)
    server: {
      host: true, // expose app via IP address from local network
      port: +(envFileConfig.REACT_PORT ?? process.env.REACT_PORT ?? 40009),
    },
    
    // make paths in build relative to index.html (starts with './', not with '/')
    //base: './',
    // make paths in index.html absolute relative root
    base: '/',
    
    esbuild: {
      supported: {
        'top-level-await': true, // browsers can handle top-level-await features
      },
    },
    
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      tsconfigPaths(),
      svgr(),
      VitePWA(pwaOptions),
      checker({
        // use TypeScript check
        typescript: true,
      }),
    ],
    
    // pass desired env variables
    define: envVarsRuntime,
    
  }
})
