import {
  BUSINESS_LOADED,
  BUSINESS_SAVE,
  BUSINESS_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  business: null
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case BUSINESS_LOADED:
      return {
        ...state,
        loading: false,
        business: payload
      };
    default:
      // need this for default case
      return state;
  }
}
