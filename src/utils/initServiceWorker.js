export default async function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      reloadAfterInstall(registration);
      await registration.update();
      reloadAfterInstall(registration);

      setInterval(() => {
        registration.sync.register('retry-requests');
      }, 5000);

    } catch (e) {
      console.error(e);
    }
  }
}

function reloadAfterInstall(registration) {
  const worker = registration.installing;
  if (worker) {
      worker.addEventListener('statechange', () => {
        if (worker.state === 'activated') {
          location.reload();
        }
      })
  }
}
