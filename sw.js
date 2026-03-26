const CACHE = "miam-iam-v1.2";
const ASSETS = [
  "./",
  "./index.html",
];

// Tuiles OSM à mettre en cache dynamiquement
const TILE_CACHE = "miam-tiles-v1.2";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== TILE_CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // Tuiles OpenStreetMap → cache-first, stockage dynamique
  if (url.hostname.endsWith("tile.openstreetmap.org")) {
    e.respondWith(
      caches.open(TILE_CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        try {
          const response = await fetch(e.request);
          if (response.ok) cache.put(e.request, response.clone());
          return response;
        } catch {
          return new Response("", { status: 503 });
        }
      })
    );
    return;
  }

  // Images des POI (woopic, wikimedia...) → network-first avec fallback cache
  if (e.request.destination === "image") {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        try {
          const response = await fetch(e.request);
          if (response.ok) cache.put(e.request, response.clone());
          return response;
        } catch {
          return cache.match(e.request) || new Response("", { status: 404 });
        }
      })
    );
    return;
  }

  // App shell → cache-first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
