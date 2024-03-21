/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare const self: ServiceWorkerGlobalScope

const selfWbManifest = self.__WB_MANIFEST
// self.__WB_MANIFEST is default injection point
precacheAndRoute(selfWbManifest)

// clean old res
cleanupOutdatedCaches()

let allowlist: undefined | RegExp[]
if (import.meta.env.DEV) allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  // @ts-ignore
  { allowlist }
))

console.log('msgFromServiceWorker')
console.log(selfWbManifest)

self.skipWaiting()
clientsClaim()
