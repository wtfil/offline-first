import * as types from './actions';

function searchResults(state = {}, action) {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        [action.meta.text]: action.payload.items
      };
    default:
      return state;
  }
}

function repositories(state = [], action) {
  switch (action.type) {
    case types.GET_REPOSITORY_SUCCESS:
      return state.concat(action.payload);
    default:
      return state;
  }
}

function onlineStatus(state = {isOnline: true}, action) {
  switch (action.type) {
    case types.CHANGE_ONLINE_STATUS:
      return {
        ...state,
        isOnline: action.payload
      }
    default:
      return state;
  }
}

function auth(state = {token: null}, action) {
  switch (action.type) {
    case types.SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case types.LOGOUT:
      return {
        ...state,
        token: null
      }
    default:
      return state;
  }
}

export default {
  auth,
  searchResults,
  onlineStatus,
  repositories
}
