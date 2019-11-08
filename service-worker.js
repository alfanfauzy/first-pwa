const CACHE_NAME = "pwasubmission-v2";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/profile.html",
  "/pages/contact.html",
  "/pages/portofolio.html",
  "/css/materialize.min.css",
  "/css/custom.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/register.js",
  "/icon.png",
  "/img/img-home1.jpg",
  "/img/img-profile1.jpg",
  "/img/telkom-logo.png",
  "/img/xxi-logo.png",
  "/img/icon-socmed/icons8-facebook-color.svg",
  "/img/icon-socmed/icons8-github-color.svg",
  "/img/icon-socmed/icons8-instagram-color.svg",
  "/img/icon-socmed/icons8-linkedin-color.svg",
  "/img/icon-socmed/icons8-twitter-color.svg",
  "/manifest.json",
  "/img/icon/icon-72x72.png",
  "/img/icon/icon-96x96.png",
  "/img/icon/icon-128x128.png",
  "/img/icon/icon-144x144.png",
  "/img/icon/icon-152x152.png",
  "/img/icon/icon-192x192.png",
  "/img/icon/icon-384x384.png",
  "/img/icon/icon-512x512.png",
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});