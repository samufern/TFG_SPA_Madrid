/**
 * RentIA service worker — v2
 * - Cache-first para assets, network-first para navegaciones.
 * - Auto-update: cuando hay un nuevo SW listo, el client recibe un postMessage
 *   y muestra un banner que permite recargar para activar la nueva versión.
 */
const CACHE = 'rentia-v4';
const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './og-image.svg',
  './metodologia.html',
  './sobre.html',
  './contacto.html',
  './aviso-legal.html',
  './privacidad.html',
  './terminos.html',
  './cookies.html',
  './data/opportunities_pool.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL).catch(()=>null))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
    // Notify clients that a fresh SW is now active
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => c.postMessage({ type: 'sw-updated', version: CACHE }));
  })());
});

// Allow the client to trigger an immediate activation when prompted
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navigation requests: network first, fall back to cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Assets: cache first
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(r => {
        if (!r || r.status !== 200) return r;
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return r;
      });
    })
  );
});
