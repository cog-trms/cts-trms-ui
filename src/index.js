import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/layout/LandingPage';
import Login from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/layout/Dashboard';
import Business from './components/business/Business';
import Account from './components/account/Account';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import ServiceOrderById from './components/so/ServiceOrderById';
import Routes from './routes';

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

  const NotFoundPage = () => {
    return <div>404!</div>;
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/signin' component={Login} />
        <Route path='/signup' component={SignUp} />
        <LandingPage />
        <Switch>
          {Routes.map(route => (
            <Route exact path={route.path} key={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
