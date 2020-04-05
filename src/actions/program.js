import axios from 'axios';
import { setAlert } from './alert';
import {
  PROGRAM_LOADED,
  PROGRAM_SAVE,
  PROGRAM_FAIL,
  PROGRAM_UPDATE,
  PROGRAM_UPDATE_FAIL,
  PROGRAM_DELETE,
  PROGRAM_DELETE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load Program
export const loadProgram = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:8080/api/v1/programs/all');
    dispatch({
      type: PROGRAM_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_FAIL
    });
  }
};

//Save Program
export const saveProgram = (accountId, name, userId) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    accountId,
    name,
    userId
  });
  try {
    const res = await axios.post(
      'http://localhost:8080/api/v1/programs/program',
      body,
      config
    );

    dispatch({ type: PROGRAM_SAVE, payload: res.data });
    dispatch(loadProgram());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: PROGRAM_FAIL });
  }
};

//Update Program
export const updateProgram = (
  accountId,
  name,
  programId,
  userId
) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    accountId,
    name,
    programId,
    userId
  });

  try {
    const res = await axios.patch(
      'http://localhost:8080/api/v1/programs/program',
      body,
      config
    );
    dispatch({ type: PROGRAM_UPDATE, payload: res.data });
    dispatch(loadProgram());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: PROGRAM_UPDATE_FAIL });
  }
};

//Delete Program
export const deleteProgram = id => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/programs/program/${id}`,
      config
    );
    dispatch({ type: PROGRAM_DELETE, payload: res.data });
    dispatch(loadProgram());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: PROGRAM_DELETE_FAIL });
  }
};
