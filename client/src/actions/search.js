import axios from 'axios';
import { SEARCH_LOADED, SEARCH_FAIL } from './types';
import setAuthToken from '../utils/setAuthToken';

//Load Business
export const loadSearch = (type, searchText) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let url;
    if (type === 'business') {
      url = `http://localhost:8080/api/v1/bu/name/{name}?buName=${searchText}`;
    }
    const res = await axios.get(url);
    dispatch({
      type: SEARCH_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: SEARCH_FAIL
    });
  }
};
