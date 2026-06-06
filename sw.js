const CACHE = 'ifitness-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.jpg', './icon-512.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      return caches.open(CACHE).then(c => { c.put(e.request, resp.clone()); return resp; });
    })).catch(() => caches.match('./index.html'))
  );
});
