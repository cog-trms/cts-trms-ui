import { USERS_LOADED, USERS_SAVE, USERS_FAIL } from '../actions/types';

const initialState = {
  loading: true,
  user: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USERS_LOADED:
      return {
        ...state,
        loading: false,
        user: payload
      };
    default:
      // need this for default case
      return state;
  }
}
