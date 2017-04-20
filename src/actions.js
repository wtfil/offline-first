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
