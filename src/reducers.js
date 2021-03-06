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

function readmes(state = {}, action) {
  switch (action.type) {
    case types.GET_README_SUCCESS:
      return {
        ...state,
        [action.meta.fullName]: action.payload
      }
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
        token: null
      }
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}

function stars(state = [], action) {
  switch (action.type) {
    case types.GET_STARS_SUCCESS:
      return action.payload.map(item => item.full_name);
    case types.TOGGLE_STAR_START:
      return action.meta.method === 'put' ?
        state.concat(action.meta.fullName) :
        state.filter(item => item !== action.meta.fullName);
    case types.LOGOUT:
      return [];
    default:
      return state;
  }
}

export default {
  auth,
  stars,
  readmes,
  searchResults,
  onlineStatus,
  repositories
}
