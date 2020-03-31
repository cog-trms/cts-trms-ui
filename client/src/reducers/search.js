import { SEARCH_LOADED, SEARCH_FAIL } from '../actions/types';

const initialState = {
  loading: true,
  searchResults: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_LOADED:
      return {
        ...state,
        loading: false,
        searchResults: payload
      };
    default:
      // need this for default case
      return state;
  }
}
