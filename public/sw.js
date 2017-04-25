const CACHE_NAME = 'v8';
const FILES = [
  '/',
  '/index.css',
  '//cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css',
  '//fonts.googleapis.com/icon?family=Material+Icons',
  '//fonts.gstatic.com/s/materialicons/v22/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2'
];
const IGNORE_CACHE = [
  'https://status.github.com/api/status.json',
  /sockjs\-node/
];
const failedRequests = [];
var origin;

self.skipWaiting();

self.addEventListener('install', e => {
  origin = e.target.location.origin;
  e.waitUntil(caches.open(CACHE_NAME).then(cache => {
    console.log('install caches');
    return cache.addAll(FILES);
  }))
})

self.addEventListener('fetch', e => {

  const request = e.request;
  const url = request.url;
  const ignoreCache = request.method !== 'GET' || IGNORE_CACHE.some(pattern => url.match(pattern));

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
	  if (request.method !== 'GET') {
	    failedRequests.push(request.clone());
	  }
	  if (ignoreCache) {
	    throw err
	  }
	  console.log('fallback to cache', url);
	  return caches.match(request)
	})
	.then(response => {
	  if (response) {
	    return response;
	  }
	  if (request.url.indexOf(origin) === 0 && !ignoreCache) {
	    return caches.match('/');
	  }
	})
    })
  )
})

async function retryRequests() {
  console.log('retry', failedRequests.length, 'requests');
  try {
    while (failedRequests.length) {
      console.log('retry', failedRequests[0].url);
      await fetch(failedRequests[0].clone());
      failedRequests.splice(0, 1);
    }
  } catch (e) {}
}

self.addEventListener('sync', e => {
  if (e.tag === 'retry-requests') {
    e.waitUntil(retryRequests());
  }
})
