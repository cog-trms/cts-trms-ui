import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import footerAdornment from '../../images/Footer Adornment.svg';
import { fontWeight, grid } from '@material-ui/system';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    position: 'fixed'

    // zIndex: 1302
    // position: 'relative'
  },
  footerImg: {
    // width: '25em',
    verticalAlign: 'bottom',
    [theme.breakpoints.down('md')]: {
      width: '21em'
    },
    [theme.breakpoints.down('xs')]: {
      width: '15em'
    }
  },
  mainContainer: {
    position: 'absolute'
  },
  link: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '0.75em',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  gridItem: {
    margin: '3em'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: theme.palette.secondary
    // zIndex: theme.zIndex.modal + 1
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

const Footer = props => {
  const classes = useStyles();

  return (
    <footer
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.openDrawer
      })}
    >
      <Hidden mdDown>
        <Grid container justify='center' className={classes.mainContainer}>
          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid
                item
                component={Link}
                to='/'
                className={classes.link}
                onClick={() => {
                  props.setValue(0);
                  props.setSelectedIndex(0);
                }}
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid
                item
                component={Link}
                to='/business'
                className={classes.link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(0);
                }}
              >
                Business
              </Grid>
              <Grid
                item
                component={Link}
                to='/account'
                className={classes.link}
                onClick={() => {
                  props.setValue(2);
                  props.setSelectedIndex(1);
                }}
              >
                Account
              </Grid>
              <Grid
                item
                component={Link}
                to='/program'
                className={classes.link}
                onClick={() => {
                  props.setValue(3);
                  props.setSelectedIndex(2);
                }}
              >
                Program
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid item className={classes.link}>
                About Us
              </Grid>
              <Grid item className={classes.link}>
                Contact Us
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <img alt='footer' src={footerAdornment} className={classes.footerImg} />
    </footer>
  );
};

export default Footer;
