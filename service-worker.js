const CACHE_NAME = "ny2026-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./create.html",
  "./celebrate.html",
  "./styles.css",
  "./create.js",
  "./celebrate.js",
  "./admin.html",
  "./admin.js",
  "./assets/newyear2026.mp3",
  "./icons/icon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => {
      // If fetch fails (offline) and request is HTML, return celebrate.html from cache if available
      if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
        return caches.match('./celebrate.html');
      }
      return new Response('', { status: 503, statusText: 'Service Unavailable' });
    }))
  );
});
