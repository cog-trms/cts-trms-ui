import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import business from './business';
import account from './account';
import program from './program';
import team from './team';
import search from './search';

export default combineReducers({
  alert,
  auth,
  business,
  account,
  program,
  team,
  search
});
