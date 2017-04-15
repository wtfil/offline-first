import * as types from './actions';

function search(state = {}, action) {
  switch (action.type) {
    case types.SEARCH_TOP_SUCCESS:
      return {
        ...state,
        [action.meta.text]: action.payload
      };
    default:
      return state;
  }
}

export default {
  search
}
