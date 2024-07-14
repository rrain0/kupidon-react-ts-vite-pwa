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
// partial fix for vite-plugin-checker to make file links clickable in IDE console
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
  
  const envVars: Record<string, string> = {
    'process.env.NODE_ENV': JSON.stringify(mode),
  }
  const fileEnvVarsNames = [
    'API_BASE_URL',
  ]
  
  // LOAD ENVS BY VITE
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  //const env = loadEnv(mode, process.cwd(), '')
  
  // LOAD CUSTOM ENV FILES
  if (mode === 'development') {
    const envFileName = 'react.dev.env'
    const envConfig = dotenvExpand.expand({
      parsed: dotenv.parse(fs.readFileSync(envFileName)),
    }).parsed as Record<string, string>
    fileEnvVarsNames.forEach(envName => {
      envVars[`import.meta.env.${envName}`] = JSON.stringify(envConfig[envName])
      //envVars[`process.env.${envName}`] = JSON.stringify(envConfig[envName])
    })
  }
  
  
  return {
    server: {
      host: true, // expose app via IP access from local network
      port: +(process.env.REACT_PORT ?? 40009),
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
    define: envVars,
  }
})
