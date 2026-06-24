const CACHE = "miam-iam-v1.8";
const CACHE = "miam-iam-v1.9.1";
const ASSETS = [
"./", "./index.html", "./pois.js", "./evenements.js",
"./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"
];
self.addEventListener("install", e => {
e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener("activate", e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
)
);
self.clients.claim();
});
self.addEventListener("fetch", e => {
if (!e.request.url.startsWith("http")) return;
e.respondWith(
fetch(e.request).then(r => {
const clone = r.clone();
caches.open(CACHE).then(c => c.put(e.request, clone));
return r;
}).catch(() => caches.match(e.request))
);
