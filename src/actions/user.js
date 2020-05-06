import axios from 'axios';
import { setAlert } from './alert';
import {
  USERS_LOADED,
  USERS_SAVE,
  USERS_FAIL,
  USERS_UPDATE,
  USERS_UPDATE_FAIL,
  USERS_DELETE,
  USERS_DELETE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:8080/api/v1/users/listUsers');
    dispatch({
      type: USERS_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: USERS_FAIL
    });
  }
};

//Delete User
export const deleteUser = id => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/users/profile/${id}`,
      config
    );
    dispatch({ type: USERS_DELETE, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: USERS_DELETE_FAIL });
  }
};
