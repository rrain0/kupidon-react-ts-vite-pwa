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




const projectRoot: string = process.cwd() // Current Working Directory




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
  const buildDate = new Date().toISOString()
  
  let envVarsRuntime: Record<string, string> = {
    // support for legacy libs and node
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.BUILD_DATE': JSON.stringify(buildDate),
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
    // Pass desired env variables to runtime
    define: envVarsRuntime,
    
    resolve: {
      // Aliases for Vite PWA to build Service Worker.
      alias: {
        'src': path.resolve(__dirname, './src'),
        
        '@utils': path.resolve(__dirname, './src/utils'),
        '@res': path.resolve(__dirname, './src/res'),
        '@libs': path.resolve(__dirname, './src/utils/libs'),
        
        '@im': path.resolve(__dirname, './src/assets/im'),
        '@ic': path.resolve(__dirname, './src/assets/ic'),
        '@vid': path.resolve(__dirname, './src/assets/vid'),
        
        '@animated': path.resolve(__dirname, './src/utils/libs/animated'),
      },
    },
    
    // configure vite DEVELOPMENT server (yarn run dev)
    server: {
      host: true, // expose app via IP address from local network
      port: reactDevServerPort,
      allowedHosts: true, // allow any host
    },
    
    // make paths relative to index.html (starts with './', not with '/')
    //base: './',
    // make paths absolute, relative to root
    base: '/',
    
    esbuild: {
      supported: {
        // Browsers can handle top-level-await features
        'top-level-await': true,
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
      svgr({
        svgrOptions: {
          // These plugins must be manually installed as dev deps
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgo: true,
          ref: true,
          memo: true,
          titleProp: true, // title prop => title tag
          descProp: true, // desc prop => desc tag
          svgoConfig: {
            plugins: [
              //'removeTitle',
              //'removeDesc',
              {
                name: 'prefixIds',
                params: {
                  prefixIds: true,
                  prefixClassNames: false,
                  delim: '',
                  prefix: (() => {
                    let id = 0
                    return () => `--${(id++).toString(16).padStart(8, '0')}--`
                  })(),
                },
              },
            ],
          },
        },
      }),
      VitePWA(pwaOptions),
      checker({
        // Use TypeScript check on the fly in development
        typescript: true,
      }),
    ],
  }
})
