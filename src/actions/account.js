import axios from 'axios';
import { setAlert } from './alert';
import {
  ACCOUNT_LOADED,
  ACCOUNT_SAVE,
  ACCOUNT_FAIL,
  ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_DELETE,
  ACCOUNT_DELETE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load Account
export const loadAccount = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      'http://localhost:8080/api/v1/accounts/account/all'
    );
    dispatch({
      type: ACCOUNT_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_FAIL
    });
  }
};

//Save Account
export const saveAccount = (
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

    dispatch({ type: ACCOUNT_SAVE, payload: res.data });
    dispatch(loadAccount());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: ACCOUNT_FAIL });
  }
};

//Update Account
export const updateAccount = (
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
    dispatch({ type: ACCOUNT_UPDATE, payload: res.data });
    dispatch(loadAccount());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: ACCOUNT_UPDATE_FAIL });
  }
};

//Delete Account
export const deleteAccount = id => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/bu/${id}`,
      config
    );
    dispatch({ type: ACCOUNT_DELETE, payload: res.data });
    dispatch(loadAccount());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: ACCOUNT_DELETE_FAIL });
  }
};
