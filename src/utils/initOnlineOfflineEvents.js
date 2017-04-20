import {changeOnlineStatus} from '../actions';

export default function initOnlineOfflineEvents(store) {
  const setStatus = status => store.dispatch(changeOnlineStatus(status));

  setStatus(navigator.onLine);
  window.addEventListener('online', () => setStatus(true))
  window.addEventListener('offline', () => setStatus(false))

  setInterval(async () => {
    try {
      await fetch('https://status.github.com/api/status.json', {mode: 'no-cors'})
      setStatus(true)
    } catch (e) {
      setStatus(false)
    }
  }, 5000)
}
