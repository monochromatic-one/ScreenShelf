const CACHE = 'screenshelf-shell-v2';
const IMAGE_CACHE = 'screenshelf-images-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL))
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

  // Same-origin app files: cache first, then network and cache.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(req, copy));
          }
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
          if (response.ok) {
            const copy = response.clone();
            caches.open(IMAGE_CACHE).then(cache => cache.put(req, copy));
          }
          return response;
        }).catch(() => cached);
      })
    );
  }
});
