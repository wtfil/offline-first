export const SEARCH_TOP_SUCCESS = 'SEARCH_TOP_SUCCESS';
export const searchTop = text => ({
  url: 'search/repositories',
  query: {
    q: text,
    sort: 'stars'
  },
  meta: {text},
  types:  {
    success: SEARCH_TOP_SUCCESS
  }
})
