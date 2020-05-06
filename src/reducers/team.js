import { TEAM_LOADED, TEAM_SAVE, TEAM_FAIL } from '../actions/types';

const initialState = {
  loading: true,
  team: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TEAM_LOADED:
      return {
        ...state,
        loading: false,
        team: payload
      };
    default:
      // need this for default case
      return state;
  }
}
