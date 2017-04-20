const CACHE_NAME = 'v1';
const files = [
  '/',
  '/index.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => {
    console.log('install caches');
    return cache.addAll(files);
  }))
});

self.addEventListener('fetch', e => {

  const request = e.request;
  const requestClone = request.clone();
  const url = request.url;
  console.log('fetch', url);

  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      console.log('got cache', url);
      return fetch(requestClone)
      	.then(response => {
	  console.log('got response', url);
      	  if(!response || response.status >= 400) {
      	    return response;
      	  }
      	  const responseClone = response.clone();
      	  console.log('put in cache', url);
      	  cache.put(request, responseClone);
      	  return response;
      	})
	.catch(err => {
	  console.log('fallback to cache', url);
      	  return caches.match(request).then(res => {
      	    console.log('found in cache', url);
      	    return res;
      	  })
	})
      	.catch(err => {
      	  console.log('not found in cache', url, err);
	  throw err;
      	})
    })
  );

  return;
  fetch(requestClone).then(response => {
    if(!response || response.status !== 200) {
      return response;
    }
    const responseClone = response.clone();
    caches.open(CACHE_NAME).then(cache => {
      console.log('add to cache', request.url);
      cache.put(e.request, responseClone);
    });

    e.respondWith(response);
    return response;
  });
});

