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
    // store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route path='/signin' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/dashboard' component={LandingPage} />
          <Route path='/business' component={LandingPage} />
          <Route path='/account' component={LandingPage} />
          <Route path='/program' component={LandingPage} />
          <Route path='/team' component={LandingPage} />
        </Switch>
      </Router>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
