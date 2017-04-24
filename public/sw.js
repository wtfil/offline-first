const CACHE_NAME = 'v2';
const FILES = [
  '/',
  '/index.js',
  '/index.css'
];
const IGNORE_CACHE = [
  'https://status.github.com/api/status.json',
  'http://localhost:9002/sockjs-node/info'
];

/*self.skipWaiting();*/

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => {
    console.log('install caches');
    return cache.addAll(FILES);
  }))
})

self.addEventListener('fetch', e => {

  const request = e.request;
  const url = request.url;
  const path = url.split('?')[0];
  const ignoreCache = request.method !== 'GET' || IGNORE_CACHE.includes(path);

  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return fetch(request.clone())
      	.then(response => {
	  if(request && response.status < 400 && !ignoreCache) {
      	    cache.put(request, response.clone());
      	  }
      	  return response;
      	})
	.catch(err => {
	  if (ignoreCache) {
	    throw err
	  }
	  console.log('fallback to cache', url);
	  return caches.match(request)
	})
    })
  )
})

