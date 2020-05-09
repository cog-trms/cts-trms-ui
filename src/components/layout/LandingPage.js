import React from 'react';
import clsx from 'clsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Routes from '../../routes';

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

const LandingPage = props => {
  const classes = useStyles();
  return (
    <Switch>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.openDrawer
        })}
      >
        {Routes.map(route => (
          <Route exact path={route.path} key={route.path}>
            <div
              className={clsx(classes.content, {
                [classes.contentShift]: props.openDrawer
              })}
            >
              <route.component />
            </div>
          </Route>
        ))}
      </main>
    </Switch>
  );
};

export default LandingPage;
