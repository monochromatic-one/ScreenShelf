const CACHE = 'screenshelf-shell-v11';
const IMAGE_CACHE = 'screenshelf-images-v1';
const FIREBASE_SDK_URLS = [
  'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js',
];
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

function cacheResponse(cacheName, request, response) {
  if (!response || !response.ok) return Promise.resolve();
  return caches.open(cacheName).then(cache => cache.put(request, response.clone()));
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(async cache => {
        await cache.addAll(APP_SHELL);
        // Firebase supports CORS. Do not block installation of the local app
        // shell if this optional offline enhancement has a transient failure.
        await Promise.all(FIREBASE_SDK_URLS.map(url => cache.add(url).catch(() => undefined)));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(key => key !== CACHE && key !== IMAGE_CACHE)
        .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // App navigation: serve the cached shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Cache the exact Firebase ES modules used by the app. This lets a
  // previously loaded, signed-in app boot while offline and use Firestore's
  // own persistent local cache. Authentication still requires a prior session.
  if (FIREBASE_SDK_URLS.includes(url.href)) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(response => {
          event.waitUntil(cacheResponse(CACHE, req, response));
          return response;
        });
      })
    );
    return;
  }

  // Same-origin app files: cache first, then network and cache.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(response => {
          event.waitUntil(cacheResponse(CACHE, req, response));
          return response;
        });
      })
    );
    return;
  }

  // TMDB poster/backdrop artwork: cache-first, since a given image path is
  // effectively immutable. This is what makes posters show up offline now
  // that the app itself no longer keeps its own copy of them.
  if (url.hostname === 'image.tmdb.org') {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(response => {
          event.waitUntil(cacheResponse(IMAGE_CACHE, req, response));
          return response;
        }).catch(() => cached);
      })
    );
  }
});
