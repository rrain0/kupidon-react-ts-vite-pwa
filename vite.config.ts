import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import checker from 'vite-plugin-checker'
//import ReactInspector from 'vite-plugin-react-inspector'



/*
const manifest: VitePWAOptions['manifest'] = {
  name: 'PWA Inject Manifest',
  short_name: 'PWA Inject',
  theme_color: '#ffffff',
  icons: [
    {
      src: 'pwa-192x192.png', // <== don't add slash, for testing
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/pwa-512x512.png', // <== don't remove slash, for testing
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'pwa-512x512.png', // <== don't add slash, for testing
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
}
*/

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

  // inject manifest from the upper object
  /*
   injectManifest: {
   minify: false,
   enableWorkboxModulesLogs: true,
   },
   manifest: manifest,
   */

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
    port: 40030,
  },
  plugins: [
    //ReactInspector(),
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
})
