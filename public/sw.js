const CACHE_NAME = 'v2';
const FILES = [
  '/',
  '/index.js'
];
const IGNORE_CACHE = [
  'https://status.github.com/api/status.json',
  'http://localhost:9002/sockjs-node/info'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => {
    console.log('install caches');
    return cache.addAll(FILES);
  }))
});

self.addEventListener('fetch', e => {

  const request = e.request;
  const requestClone = request.clone();
  const url = request.url;
  const path = url.split('?')[0];
  const ignoreCache = IGNORE_CACHE.includes(path);
  console.log('fetch', url);

  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return fetch(requestClone)
      	.then(response => {
	  if(!response || response.status >= 400 || ignoreCache) {
      	    return response;
      	  }
      	  const responseClone = response.clone();
      	  console.log('put in cache', url);
      	  cache.put(request, responseClone);
      	  return response;
      	})
	.catch(err => {
	  if (ignoreCache) {
	    throw err
	  }
	  console.log('fallback to cache', url);
	  return caches.match(request)
	})
      	.catch(err => {
      	  console.log('not found in cache', url, err);
	  throw err;
      	})
    })
  );
});

