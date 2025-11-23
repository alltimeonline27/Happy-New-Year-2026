const CACHE_NAME = "ny2026-gift-v1";

const ASSETS_TO_CACHE = [
    "./celebrate.html",
    "./create.html",
    "./styles.css",
    "./celebrate.js",
    "./create.js",
    "./manifest.json",
    "./assets/newyear2026.mp3",
    "./icons/icon-32.png",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE).catch(() => {}))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.method !== "GET") return;

    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;
            return fetch(request)
                .then((networkResponse) =>
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    })
                )
                .catch(() => cached || Response.error());
        })
    );
});
