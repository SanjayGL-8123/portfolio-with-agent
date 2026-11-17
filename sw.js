const CACHE_NAME = 'sanjay-portfolio-v6';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/projects',
  '/projects.html',
  '/privacy',
  '/privacy.html',
  '/css/clean-redesign.css?v=3.0.1',
  '/css/styles.css',
  '/js/projectsData.js',
  '/assets/project_placeholder.svg',
  '/assets/project_placeholder.svg?v=2',
  '/knowledge.json'
];

// Resilient install: cache each asset individually so one failure doesn't block the rest
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Failed to cache "${url}":`, err.message);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  const requestUrl = new URL(event.request.url);

  // Bypass service worker on local development and local LAN IPs
  const isLocal = requestUrl.hostname === 'localhost' ||
    requestUrl.hostname === '127.0.0.1' ||
    requestUrl.hostname === '[::1]' ||
    requestUrl.hostname.startsWith('10.') ||
    requestUrl.hostname.startsWith('192.168.') ||
    requestUrl.hostname.startsWith('172.');

  if (isLocal) {
    return;
  }

  // Skip third-party requests (CDN fonts, analytics, etc.)
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    // Network-first strategy: try network, fall back to cache
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        // Fallback to cached homepage for navigation requests
        const acceptHeader = event.request.headers.get('accept') || '';
        if (acceptHeader.includes('text/html')) {
          const fallbackHtml = await caches.match('/');
          if (fallbackHtml) return fallbackHtml;
        }

        return new Response('Offline — Network request failed', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain' })
        });
      })
  );
});
