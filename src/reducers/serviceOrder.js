import {
  SERVICEORDER_LOADED,
  SERVICEORDER_SAVE,
  SERVICEORDER_FAIL,
  SERVICEORDER_ALL_LOADED,
  SERVICEORDER_ALL_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  serviceOrder: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SERVICEORDER_LOADED:
      return {
        ...state,
        loading: false,
        serviceOrder: payload
      };
    default:
      // need this for default case
      return state;
  }
}
