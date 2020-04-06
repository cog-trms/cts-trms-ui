import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import business from './business';
import account from './account';
import program from './program';
import user from './user';
import search from './search';

export default combineReducers({
  alert,
  auth,
  business,
  account,
  program,
  user,
  search
});
