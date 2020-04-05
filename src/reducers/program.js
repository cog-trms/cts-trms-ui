import { PROGRAM_LOADED, PROGRAM_SAVE, PROGRAM_FAIL } from '../actions/types';

const initialState = {
  loading: true,
  program: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROGRAM_LOADED:
      return {
        ...state,
        loading: false,
        program: payload
      };
    default:
      // need this for default case
      return state;
  }
}
