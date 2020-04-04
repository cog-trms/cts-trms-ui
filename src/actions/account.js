import axios from 'axios';
import { setAlert } from './alert';
import { ACCOUNT_LOADED, ACCOUNT_SAVE, ACCOUNT_FAIL } from './types';
import setAuthToken from '../utils/setAuthToken';

//Load Account
export const loadAccount = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:8080/api/v1/account/all');
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
export const saveAccount = ({
  email,
  firstName,
  lastName,
  mobileNumber,
  password
}) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    email,
    firstName,
    lastName,
    mobileNumber,
    password
  });

  try {
    const res = await axios.post(
      'http://localhost:8080/api/v1/user/signup',
      body,
      config
    );

    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    dispatch(loadAccount());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: SIGNUP_FAIL });
  }
};
