import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  isSignedUp: false,
  loginUser: null
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        loginUser: payload
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...payload,
        isSignedUp: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true
      };
    default:
      // need this for default case
      return state;
  }
}
