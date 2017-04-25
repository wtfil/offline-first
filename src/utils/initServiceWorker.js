export default async function initServiceWorker() {

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      reloadAfterInstall(registration);
      await registration.update();
      reloadAfterInstall(registration);
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
