import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import routes from '../../routes';
import { logout } from '../../actions/auth';
import Header from './Header';

const drawerWidth = 540;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    margin: 20
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 110
  }
}));

const LandingPage = ({ isAuthenticated, loginUser, logout }) => {
  //if not authenticated, then redirect to login

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  if (!isAuthenticated) {
    return <Redirect to='/signin' />;
  }

  return (
    <Fragment>
      <Header
        value={value}
        setValue={setValue}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer
        })}
      >
        <BrowserRouter>
          <Switch>
            {routes.map(route => (
              <Route exact path={route.path} key={route.path}>
                <div
                  className={clsx(classes.content, {
                    [classes.contentShift]: openDrawer
                  })}
                >
                  <route.component />
                </div>
              </Route>
            ))}
          </Switch>
        </BrowserRouter>
      </main>
    </Fragment>
  );
};

LandingPage.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loginUser: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginUser: state.auth.loginUser
});
export default connect(mapStateToProps, { logout })(LandingPage);
