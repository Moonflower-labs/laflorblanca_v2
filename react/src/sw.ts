
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING')
    self.skipWaiting()
})

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// Check if the application is running in production
const isProduction = process.env.NODE_ENV === 'production';
// clean old assets
cleanupOutdatedCaches()

let allowlist: undefined | RegExp[]
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

const denylist: undefined | RegExp[] = [/^\/backoffice/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist, denylist }
))

// External images runtime caching
registerRoute(
  new RegExp('^https://i.ytimg.com/.*'),
  new StaleWhileRevalidate({
      cacheName: 'yt-images',
      plugins: [
          new ExpirationPlugin({
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          })
      ],
  })
);



// Cache static assets (images, CSS, JS) using CacheFirst strategy
registerRoute(
  ({ url }) => url.pathname.startsWith('/static/'),
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: isProduction ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 Days in production, 1 Day in development
      }),
    ],
  })
);

// Cache API responses using NetworkFirst strategy
// registerRoute(
//   ({ request }) => request.url.startsWith('/api/'),
//   new NetworkFirst({
//     cacheName: 'api-cache',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 24 * 60 * 60, // 1 Day
//       }),
//     ],
//   })
// );

// Ensure internal app routes are cached appropriately
registerRoute(
  new RegExp('/src/.*'),
  new StaleWhileRevalidate({
      cacheName: 'internal-resources',
  })
);

// Fallback for offline API responses
const FALLBACK_JSON = { error: 'This is a fallback response because the network is currently unavailable.' };

self.addEventListener('fetch', (event) => {
    // Match any API request
    if (event.request.url.startsWith('http://localhost:8000/api/')) {
        event.respondWith(
            // Try to fetch the request from the network
            fetch(event.request).catch(() => {
                // If the network is unavailable, respond with the fallback JSON
                return new Response(JSON.stringify(FALLBACK_JSON), {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
    }
});


// **********************************************

// // /* eslint-disable @typescript-eslint/no-unused-vars */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { createHandlerBoundToURL } from 'workbox-precaching'
// // import { cacheNames, clientsClaim } from 'workbox-core'
// // import { NavigationRoute, registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing'
// // import type { StrategyHandler } from 'workbox-strategies'
// // import {
// //   CacheFirst,
// //   NetworkFirst,
// //   NetworkOnly,
// //   Strategy
// // } from 'workbox-strategies'

// // // Give TypeScript the correct global.
// // declare let self: ServiceWorkerGlobalScope 

// // declare type ExtendableEvent = any

// // const data = {
// //   race: false,
// //   debug: true,
// //   credentials: 'same-origin' as RequestCredentials,
// //   networkTimeoutSeconds: 0,
// //   fallback: 'index.html'
// // }
// // const { race, debug, credentials, networkTimeoutSeconds, fallback } = data


// // const cacheName = cacheNames.runtime

// // // self.addEventListener('message', (event) => {
// // //   if (event.data && event.data.type === 'SKIP_WAITING')
// // //     self.skipWaiting()
// // // })

// // function buildStrategy(): Strategy {
// //   if (race) {
// //     class CacheNetworkRace extends Strategy {
// //       _handle(request: Request, handler: StrategyHandler): Promise<Response | undefined> {
// //         const fetchAndCachePutDone: Promise<Response> = handler.fetchAndCachePut(request)
// //         const cacheMatchDone: Promise<Response | undefined> = handler.cacheMatch(request)

// //         return new Promise((resolve, reject) => {
// //           fetchAndCachePutDone.then(resolve).catch((e) => {
// //             if (debug)
// //               console.log(`Cannot fetch resource: ${request.url}`, e)
// //           })
// //           cacheMatchDone.then(response => response && resolve(response))

// //           // Reject if both network and cache error or find no response.
// //           Promise.allSettled([fetchAndCachePutDone, cacheMatchDone]).then((results) => {
// //             const [fetchAndCachePutResult, cacheMatchResult] = results

// //             const fetchAndCachePutRejected = fetchAndCachePutResult.status === 'rejected';
// //             const cacheMatchResolved = cacheMatchResult.status === 'fulfilled' && cacheMatchResult.value;

// //             if (fetchAndCachePutRejected && !cacheMatchResolved) 
// //               reject(fetchAndCachePutResult.reason)
// //           })
// //         })
// //       }
// //     }
// //     return new CacheNetworkRace()
// //   }
// //   else {
// //     if (networkTimeoutSeconds > 0)
// //       return new NetworkFirst({ cacheName, networkTimeoutSeconds })
// //     else
// //       return new NetworkFirst({ cacheName })
// //   }
// // }

// // const manifest = self.__WB_MANIFEST

// // // self.addEventListener('message', (event) => {
// // //   if (event.data && event.data.type === 'SKIP_WAITING')
// // //     self.skipWaiting()
// // // })

// // const cacheEntries: RequestInfo[] = []

// // const manifestURLs = manifest.map(
// //   (entry:any) => {
// //     const url = new URL(entry.url, self.location.href)
// //     cacheEntries.push(new Request(url.href, {
// //       credentials: credentials
// //     }))
// //     return url.href
// //   }
// // )

// // self.addEventListener('install', (event: ExtendableEvent) => {
// //   event.waitUntil(
// //     caches.open(cacheName).then((cache) => {
// //       return cache.addAll(cacheEntries)
// //     })
// //   )
// // })

// // self.addEventListener('activate', (event: ExtendableEvent) => {
// //   // - clean up outdated runtime cache
// //   event.waitUntil(
// //     caches.open(cacheName).then((cache) => {
// //       // clean up those who are not listed in manifestURLs
// //       cache.keys().then((keys) => {
// //         keys.forEach((request) => {
// //           debug && console.log(`Checking cache entry to be removed: ${request.url}`)
// //           if (!manifestURLs.includes(request.url)) {
// //             cache.delete(request).then((deleted) => {
// //               if (debug) {
// //                 if (deleted)
// //                   console.log(`Precached data removed: ${request.url || request}`)
// //                 else
// //                   console.log(`No precache found: ${request.url || request}`)
// //               }
// //             })
// //           }
// //         })
// //       })
// //     })
// //   )
// // })



// // registerRoute(({ url }) => manifestURLs.includes(url.href), buildStrategy())


// // // to allow work offline
// // registerRoute(new NavigationRoute(
// //     createHandlerBoundToURL(fallback),
// //     { denylist: [/^\/backoffice/,/^\/api\//] },
// //   ))

// // // Cache public dir assets
// // registerRoute(
// //   ({ request }) => request.destination === 'image',
// //   new CacheFirst({
// //     cacheName:'images-cache',
// //     plugins:[
// //         {
// //             cacheWillUpdate: async ({ response}) => {
// //                 return response.status === 200 ? response : null;
// //             }
// //         }
// //     ]
// //   }),
// // )



// // setDefaultHandler(new NetworkOnly())

// // // fallback to app-shell for document request
// // setCatchHandler(({ event } : { event: any }): Promise<Response> => {
// //   switch (event.request.destination) {
// //     case 'document':
// //       return caches.match(fallback).then((r) => {
// //         return r ? Promise.resolve(r) : Promise.resolve(Response.error())
// //       })
// //     default:
// //       return Promise.resolve(Response.error())
// //   }
// // })

// // // this is necessary, since the new service worker will keep on skipWaiting state
// // // and then, caches will not be cleared since it is not activated
// // self.skipWaiting()
// // clientsClaim()