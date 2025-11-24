// ===============================
// HAPPY NEW YEAR 2026 — SERVICE WORKER (UPDATED)
// ===============================

// Change this version every time you update your website
const CACHE_NAME = "ny2026-v5";

// List of files to cache
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

// Install event
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Activate new version immediately

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Delete old caches
          }
        })
      )
    )
  );
  clients.claim(); // Take control of pages immediately
});

// Fetch event (Network-first then cache fallback)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and store in cache
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => {
        // If offline → return cached version
        return caches.match(event.request).then((cached) => {
          // If HTML request fails → fallback to celebrate page
          if (!cached && event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match("./celebrate.html");
          }
          return cached || new Response("", { status: 503 });
        });
      })
  );
});
