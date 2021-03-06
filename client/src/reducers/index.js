import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import business from './business';
import account from './account';
import search from './search';

export default combineReducers({ alert, auth, business, account, search });
