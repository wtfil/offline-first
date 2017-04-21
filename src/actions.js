const TOKEN_KEY = 'auth-token';

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const searchTop = text => ({
  url: 'search/repositories',
  query: {
    q: text,
    sort: 'stars'
  },
  meta: {text},
  types:  {
    success: SEARCH_SUCCESS,
    error: SEARCH_ERROR
  }
})

export const GET_REPOSITORY_SUCCESS = 'GET_REPOSITORY_SUCCESS';
export const getRepository = params => ({
  url: 'repos/' + params.user + '/' + params.repo,
  types: {
    success: GET_REPOSITORY_SUCCESS
  }
})

export const CHANGE_ONLINE_STATUS = 'CHANGE_ONLINE_STATUS';
export const changeOnlineStatus = isOnline => ({
  type: CHANGE_ONLINE_STATUS,
  payload: isOnline
})

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = token => dispatch => {
  localStorage.setItem(TOKEN_KEY, token);
  dispatch({
    type: SET_AUTH_TOKEN,
    payload: token
  })
}

export const getAuthFromStorage = () => dispatch => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch({
      type: SET_AUTH_TOKEN,
      payload: token
    })
  }
}

export const LOGOUT = 'LOGOUT';
export const logout = () => dispatch => {
  localStorage.removeItem(TOKEN_KEY);
  dispatch({
    type: LOGOUT
  })
}
