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
// partial fix for vite-plugin-checker to make file links clickable in the IDE console
{
  const nm = path.join(projectRoot, 'node_modules')
  const loggerFile = path.join(nm, 'vite-plugin-checker', 'dist', 'esm', 'logger.js')
  
  try {
    fs.accessSync(loggerFile)
    let source = fs.readFileSync(loggerFile, 'utf-8')
    
    if (!source.includes('pathToFileURL')) {
      source = `import { pathToFileURL } from "url";\n${source}`
    }
    source = source.replace(
      /(fileLabel ?\+ ?)(d\.id)/,
      (_m, p1, p2) => `${p1} pathToFileURL(${p2})`
    )
    
    fs.writeFileSync(loggerFile, source)
  }
  catch (err) { /* empty */ }
}




const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  devOptions: {
    // enable PWA in dev mode
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
  strategies: 'injectManifest',
  srcDir: 'src/service-worker',
  filename: 'service-worker.ts',

  // do not inject manifest, only service worker,
  // so you can write your own link to manifest in index.html
  // https://vite-pwa-org.netlify.app/guide/service-worker-without-pwa-capabilities
  injectRegister: 'script',
  manifest: false,

  base: '/',
  
  includeAssets: ['favicon.svg'],
}



// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  
  let envFileConfig: Record<string, string> = { }
  const envVarsRuntime: Record<string, string> = {
    // node / legacy libs support
    'process.env.NODE_ENV': JSON.stringify(mode),
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
  
  
  return {
    
    // configure vite DEVELOPMENT server (yarn run dev)
    server: {
      host: true, // expose app via IP address from local network
      port: +(envFileConfig.REACT_PORT ?? process.env.REACT_PORT ?? 40009),
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
