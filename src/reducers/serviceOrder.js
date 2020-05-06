import {
  SERVICE_ORDER_LOADED_BY_ID,
  SERVICE_ORDER_FAIL_BY_ID,
  SERVICEORDER_FAIL,
  SERVICE_ORDER_ALL_LOADED,
  SERVICE_ORDER_ALL_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  serviceOrder: [],
  serviceOrderById: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SERVICE_ORDER_ALL_LOADED:
      return {
        ...state,
        loading: false,
        serviceOrder: payload
      };
    case SERVICE_ORDER_LOADED_BY_ID:
      return {
        ...state,
        loading: false,
        serviceOrderById: payload
      };
    default:
      // need this for default case
      return state;
  }
}
