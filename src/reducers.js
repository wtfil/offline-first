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

export default {
  searchResults,
  repositories
}
