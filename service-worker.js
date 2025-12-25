// ===============================
// NY 2026 — OPTIMIZED SERVICE WORKER
// ===============================

const CACHE_NAME = "ny2026-v22.2";

// Only cache GET static files
const ASSETS = [
  "./",
  "./index.html",
  "./celebrate.html",
  "./create.html",
  "./admin.html",

  "./styles.css",
  "./celebrate.js",
  "./create.js",
  "./admin.js",

  "./manifest.json",
  "./assets/newyear2026.mp3",

  "./icons/icon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Install — Precache static assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate — Delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  clients.claim();
});

// Fetch — Cache First for static, Network for API/POST
self.addEventListener("fetch", (event) => {

  // Skip POST/PUT/DELETE requests
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Don’t cache Firestore calls or external resources
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request)
          .then(res => {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            return res;
          })
      );
    })
  );
});
