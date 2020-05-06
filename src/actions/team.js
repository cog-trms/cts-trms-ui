import axios from 'axios';
import { setAlert } from './alert';
import {
  TEAM_LOADED,
  TEAM_SAVE,
  TEAM_FAIL,
  TEAM_UPDATE,
  TEAM_UPDATE_FAIL,
  TEAM_DELETE,
  TEAM_DELETE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load Team
export const loadTeam = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:8080/api/v1/teams/team/all');
    dispatch({
      type: TEAM_LOADED,
      payload: res.data.payload
    });
  } catch (err) {
    dispatch({
      type: TEAM_FAIL
    });
  }
};

//Save Team
export const saveTeam = (
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

    dispatch({ type: TEAM_SAVE, payload: res.data });
    dispatch(loadTeam());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: TEAM_FAIL });
  }
};

//Update Team
export const updateTeam = (
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
    dispatch({ type: TEAM_UPDATE, payload: res.data });
    dispatch(loadTeam());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: TEAM_UPDATE_FAIL });
  }
};

//Delete Team
export const deleteTeam = id => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/teams/team/${id}`,
      config
    );
    dispatch({ type: TEAM_DELETE, payload: res.data });
    dispatch(loadTeam());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.array.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: TEAM_DELETE_FAIL });
  }
};
