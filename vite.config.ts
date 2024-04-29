import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import checker from 'vite-plugin-checker'




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
export default defineConfig({
  server: {
    host: true, // expose app via IP access from local network
    port: 40029,
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    tsconfigPaths(),
    svgr(),
    VitePWA(pwaOptions),
    checker({
      // use TypeScript check
      typescript: true,
    }),
  ],
  define: {
    // pass desired env variables
    'import.meta.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
  },
})
