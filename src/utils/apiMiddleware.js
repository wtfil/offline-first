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
  const url = API_HOST + action.url + '?' + qs.stringify(action.query);
  const opts = {
    method: action.method || 'get'
  };

  try {
    const res = await fetch(url, opts);
    const payload = await res.json();
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
