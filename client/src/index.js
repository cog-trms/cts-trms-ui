import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/layout/LandingPage';
import Login from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/layout/Dashboard';
import Business from './components/business/Business';
import Account from './components/account/Account';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Route path='/signin' component={Login} />
        <Route path='/signup' component={SignUp} />
        <LandingPage>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/business' component={Business} />
            <Route path='/account' component={Account} />
          </Switch>
        </LandingPage>
      </Router>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
