import axios from 'axios';
import { setAlert } from './alert';
import {
  SERVICEORDER_LOADED,
  SERVICEORDER_SAVE,
  SERVICEORDER_FAIL,
  SERVICEORDER_ALL_LOADED,
  SERVICEORDER_ALL_FAIL,
  SERVICEORDER_UPDATE,
  SERVICEORDER_UPDATE_FAIL,
  SERVICEORDER_DELETE,
  SERVICEORDER_DELETE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load All ServiceOrder
export const loadServiceOrder = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:8080/api/v1/sorders/so');
    dispatch({
      type: SERVICEORDER_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: SERVICEORDER_FAIL
    });
  }
};

//Load ServiceOrder
export const loadServiceOrderById = soId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/sorders/so/${soId}/cases`
    );
    dispatch({
      type: SERVICEORDER_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: SERVICEORDER_FAIL
    });
  }
};

//Save ServiceOrder
export const saveServiceOrder = (
  programId,
  teamMembers1,
  teamName
) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    programId,
    teamMembers: [teamMembers1],
    teamName
  });
  try {
    const res = await axios.post(
      'http://localhost:8080/api/v1/teams/team',
      body,
      config
    );

    dispatch({ type: SERVICEORDER_SAVE, payload: res.data });
    dispatch(loadServiceOrder());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: SERVICEORDER_FAIL });
  }
};

//Update ServiceOrder
export const updateServiceOrder = (
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
    dispatch({ type: SERVICEORDER_UPDATE, payload: res.data });
    dispatch(loadServiceOrder());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: SERVICEORDER_UPDATE_FAIL });
  }
};

//Delete ServiceOrder
export const deleteServiceOrder = id => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/teams/team/${id}`,
      config
    );
    dispatch({ type: SERVICEORDER_DELETE, payload: res.data });
    dispatch(loadServiceOrder());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: SERVICEORDER_DELETE_FAIL });
  }
};
