const CACHE_NAME = 'todo-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/icon-1024.png',
    'https://fonts.googleapis.com/css2?family=Handlee&family=Roboto+Slab:wght@100..900&family=Underdog&family=Winky+Sans:ital,wght@0,300..900;1,300..900&display=swap'
];

// Install event – caching files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
    console.log('Service Worker installed.');
});

// Activate event – clean up old caches if any
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch event – try cache first, then network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
