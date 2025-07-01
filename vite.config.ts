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
    enabled: true, // enable PWA in dev mode
    type: 'module', // Service Worker is module
  },

  // Do not inject manifest, only service worker,
  // so you can write your own link to manifest in index.html
  // https://vite-pwa-org.netlify.app/guide/service-worker-without-pwa-capabilities
  injectRegister: 'script',
  manifest: false,

  base: '/',
  
  includeAssets: ['public/**'],
  pwaAssets: { disabled: true },
}



// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  
  let reactDevServerPort = 40009
  const now = new Date().toISOString()
  
  let envVarsRuntime: Record<string, string> = {
    // support for legacy libs and node
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.BUILD_DATE': JSON.stringify(now),
  }
  
  // LOAD ENVS BY VITE (with respect to vite env filename rules!!!)
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env vars regardless of the `VITE_` prefix.
  //const env = loadEnv(mode, process.cwd(), '')
  
  // LOAD CUSTOM ENV FILES (any env filename & any env var name)
  if (mode === 'development') {
    const envFileName = 'react.dev.env'
    const envFileConfig: Record<string, string> = dotenvExpand
      .expand({ parsed: dotenv.parse(fs.readFileSync(envFileName)) })
      .parsed as Record<string, string>
    reactDevServerPort = +envFileConfig.REACT_PORT
    envVarsRuntime = { ...envVarsRuntime,
      'import.meta.env.BACKEND_HOST': JSON.stringify(envFileConfig.BACKEND_HOST),
      'import.meta.env.BACKEND_PORT': JSON.stringify(envFileConfig.BACKEND_PORT),
      //'process.env.TEST': JSON.stringify(envFileConfig[TEST]),
    }
  }
  if (mode === 'production') {
    envVarsRuntime = { ...envVarsRuntime,
      'import.meta.env.BACKEND_HOST': JSON.stringify(process.env.BACKEND_HOST),
      'import.meta.env.BACKEND_PORT': JSON.stringify(process.env.BACKEND_PORT),
    }
  }
  
  
  return {
    // configure vite DEVELOPMENT server (yarn run dev)
    server: {
      host: true, // expose app via IP address from local network
      port: reactDevServerPort,
      allowedHosts: true, // allow any host
    },
    
    // make paths relative to index.html (starts with './', not with '/')
    //base: './',
    // make paths absolute, relative root
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
    
    // Pass to runtime desired env variables
    define: envVarsRuntime,
  }
})
