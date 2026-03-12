const CACHE_NAME='ai-classroom-cache-v1'
const urlsToCache=['/','/index.html','/dashboard.html','/whiteboard.html','/style.css','/app.js']
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)))
})
self.addEventListener('fetch',event=>{
  event.respondWith(caches.match(event.request).then(resp=>resp || fetch(event.request)))
})
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(key=>{if(key!==CACHE_NAME) return caches.delete(key)}))))
})
