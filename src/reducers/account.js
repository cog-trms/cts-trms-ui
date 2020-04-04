import { ACCOUNT_LOADED, ACCOUNT_SAVE, ACCOUNT_FAIL } from '../actions/types';

const initialState = {
  loading: true,
  account: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_LOADED:
      return {
        ...state,
        loading: false,
        account: payload
      };
    default:
      // need this for default case
      return state;
  }
}
