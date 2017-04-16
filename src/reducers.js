import * as types from './actions';

function searchResults(state = {}, action) {
  switch (action.type) {
    case types.SEARCH_TOP_SUCCESS:
      return {
        ...state,
        [action.meta.text]: action.payload.items
      };
    default:
      return state;
  }
}

export default {
  searchResults
}
