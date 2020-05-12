import React, { useState, useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './components/layout/LandingPage';
import Login from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import routes from './routes';
import { loadUser } from './actions/user';
import { loadLoginUser } from './actions/auth';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import theme from './components/Theme';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  useEffect(() => {
    store.dispatch(loadLoginUser());
  }, []);

  const NotFoundPage = () => {
    return <div>404!</div>;
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path='/signin' component={Login} />
          <Route path='/signup' component={SignUp} />
          <LandingPage />
          <Switch>
            {routes.map(route => (
              <Route exact path={route.path} key={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
