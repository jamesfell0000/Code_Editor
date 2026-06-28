const CACHE_NAME = 'code-editor-gh-v1';
const ASSETS = [
  '/Code_Editor/',
  '/Code_Editor/index.html',
  '/Code_Editor/manifest.json',
  
  // Google Fonts & Material Symbols 
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  
  // CodeMirror Dependencies
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/material-darker.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/eclipse.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/python/python.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/r/r.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/xml/xml.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/javascript/javascript.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/css/css.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/htmlmixed/htmlmixed.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/julia/julia.min.js',
  
  // App Icon
  'https://cdn-icons-png.flaticon.com/512/2911/2911230.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => { 
        if (key !== CACHE_NAME) return caches.delete(key); 
    })))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.startsWith('https://fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(e.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
