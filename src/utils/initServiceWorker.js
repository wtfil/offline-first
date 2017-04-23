export default async function initServiceWorker() {

  if ('serviceWorker' in navigator) {
    try {
      const res = await navigator.serviceWorker.register('/sw.js');
      const worker = res.installing;
      if (worker) {
        worker.addEventListener('statechange', () => {
          if (worker.state === 'activated') {
            location.reload();
          }
        })
      } else {
        res.update();
      }
    } catch (e) {
      console.error(e);
    }
  }

}
