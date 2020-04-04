import axios from 'axios';
import { setAlert } from './alert';
import {
  BUSINESS_LOADED,
  BUSINESS_SUCCESS,
  BUSINESS__FAIL,
  BUSINESS_LOADED_FAIL,
  BUSINESS_SAVE,
  BUSINESS_SAVE_FAIL,
  BUSINESS_UPDATE,
  BUSINESS_UPDATE_FAIL,
  BUSINESS_DELETE,
  BUSINESS_DELETE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load Business
export const loadBusiness = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:8080/api/v1/bu/all');
    dispatch({
      type: BUSINESS_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: BUSINESS_LOADED_FAIL
    });
  }
};

//Save Business
export const saveBusiness = businessUnitName => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    businessUnitName
  });

  try {
    const res = await axios.post(
      'http://localhost:8080/api/v1/bu/',
      body,
      config
    );
    dispatch({ type: BUSINESS_SAVE, payload: res.data });
    dispatch(loadBusiness());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: BUSINESS_SAVE_FAIL });
  }
};

//Update Business
export const updateBusiness = (id, buName) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({
    id,
    buName
  });

  try {
    const res = await axios.put(
      'http://localhost:8080/api/v1/bu/',
      body,
      config
    );
    dispatch({ type: BUSINESS_UPDATE, payload: res.data });
    dispatch(loadBusiness());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: BUSINESS_UPDATE_FAIL });
  }
};

//Delete Business
export const deleteBusiness = id => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/bu/${id}`,
      config
    );
    dispatch({ type: BUSINESS_DELETE, payload: res.data });
    dispatch(loadBusiness());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: BUSINESS_DELETE_FAIL });
  }
};
