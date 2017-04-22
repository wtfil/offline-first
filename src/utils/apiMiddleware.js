import qs from 'querystring';

const API_HOST = 'https://api.github.com/';

export default store => dispatch => async action => {
  if (action.type || !action.url) {
    return dispatch(action);
  }
  const meta = action.meta || {};

  if (action.types && action.types.start) {
    dispatch({type: action.start, meta});
  }
  const {auth} = store.getState();
  const url = API_HOST + action.url +
    (action.query ? ('?' + qs.stringify(action.query)) : '');
  const headers = {
    ...action.headers,
    Accept: 'application/json'
  };
  if (auth.token) {
    headers.Authorization = 'token ' + auth.token;
  }
  const opts = {
    method: action.method || 'get',
    headers
  };

  try {
    const res = await fetch(url, opts);
    const payload = res.statusText === 'No Content' ?
      '' :
      await res.json();

    if (res.status >= 400) {
      const error = Object.assign(new Error(), payload);
      throw error;
    }
    if (action.types && action.types.success) {
      dispatch({type: action.types.success, payload, meta});
    }
    return payload;
  } catch (e) {
    if (action.types && action.types.error) {
      dispatch({type: action.types.error, error: e, meta});
    }
    throw e;
  }
}
