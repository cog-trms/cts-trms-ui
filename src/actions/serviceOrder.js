import axios from 'axios';
import { setAlert } from './alert';
import {
  SERVICE_ORDER_LOADED_BY_ID,
  SERVICEORDER_SAVE,
  SERVICEORDER_SAVE_FAIL,
  SERVICE_ORDER_FAIL_BY_ID,
  SERVICE_ORDER_ALL_LOADED,
  SERVICE_ORDER_ALL_FAIL,
  SERVICEORDER_UPDATE,
  SERVICEORDER_UPDATE_FAIL,
  SERVICEORDER_DELETE,
  SERVICEORDER_DELETE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load All Service Order
export const loadServiceOrder = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:8080/api/v1/sorders/so');
    dispatch({
      type: SERVICE_ORDER_ALL_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: SERVICE_ORDER_ALL_FAIL
    });
  }
};

//Load Service Order By Id
export const loadServiceOrderById = soId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/sorders/so/${soId}/cases`
    );
    dispatch({
      type: SERVICE_ORDER_LOADED_BY_ID,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: SERVICE_ORDER_FAIL_BY_ID
    });
  }
};

//Save ServiceOrder
export const saveServiceOrder = (cases, details, teamId) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    cases,
    location: details.locationText,
    positionCount: details.positionCountText,
    serviceOrder: details.serviceOrderText,
    teamId
  });
  try {
    const res = await axios.post(
      'http://localhost:8080/api/v1/sorders/',
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
    dispatch({ type: SERVICEORDER_SAVE_FAIL });
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
