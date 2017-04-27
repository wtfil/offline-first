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
export const getRepository = fullName => ({
  url: 'repos/' + fullName,
  types: {
    success: GET_REPOSITORY_SUCCESS
  }
})

export const GET_README_SUCCESS = 'GET_README_SUCCESS';
export const getReadme = fullName => ({
  url: 'repos/' + fullName + '/readme',
  json: false,
  meta: {fullName},
  headers: {
    accept: 'application/vnd.github.VERSION.html'
  },
  types: {
    success: GET_README_SUCCESS
  }
})

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const getUser = () => ({
  url: 'user',
  onlyAuthorized: true,
  types: {
    success: GET_USER_SUCCESS
  }
})

export const GET_STARS_SUCCESS = 'GET_STARS_SUCCESS';
export const getStars = () => ({
  url: 'user/starred',
  onlyAuthorized: true,
  types: {
    success: GET_STARS_SUCCESS
  }
})

export const TOGGLE_STAR_START = 'TOGGLE_STAR_START';
export const TOGGLE_STAR_SUCCESS = 'TOGGLE_STAR_SUCCESS';
export const toggleStar = fullName => (dispatch, getState) => {
  const {stars, auth} = getState();
  if (!auth.token) {
    return;
  }
  const method = stars.includes(fullName) ? 'delete': 'put';
  return dispatch({
    url: 'user/starred/' + fullName,
    json: false,
    retry: true,
    meta: {
      fullName,
      method
    },
    method,
    types: {
      start: TOGGLE_STAR_START,
      success: TOGGLE_STAR_SUCCESS
    }
  })
}

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
