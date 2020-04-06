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

//Save User
export const saveUser = (
  accountName,
  businessUnitId,
  userId
) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    accountName,
    businessUnitId,
    userId
  });
  try {
    const res = await axios.post(
      'http://localhost:8080/api/v1/accounts/account',
      body,
      config
    );

    dispatch({ type: USERS_SAVE, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: USERS_FAIL });
  }
};

//Update User
export const updateUser = (
  id,
  accountName,
  businessUnitId,
  userId
) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    id,
    accountName,
    businessUnitId,
    userId
  });

  try {
    const res = await axios.put(
      'http://localhost:8080/api/v1/accounts/account',
      body,
      config
    );
    dispatch({ type: USERS_UPDATE, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: USERS_UPDATE_FAIL });
  }
};

//Delete User
export const deleteUser = id => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/bu/${id}`,
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
