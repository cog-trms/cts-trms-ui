import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Menu,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  AccountCircle,
  Menu as MenuIcon,
  Mail as MailIcon,
  MoreVert as MoreIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import routes from '../../routes';
import logo from '../../images/logo.svg';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  logoContainer: {
    padding: 0
  },
  logo: { height: '7em' },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
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
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1
    }
  },
  drawerPaper: {
    backgroundColor: theme.palette.common.blue,
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

const Header = props => {
  const classes = useStyles();
  const theme = useTheme();

  // const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [menu, setMenu] = useState('dashboard');

  useEffect(() => {
    [...routes].forEach(route => {
      if (route.isMenu) {
        switch (window.location.pathname) {
          case `${route.path}`:
            if (props.value !== route.activeIndex) {
              props.setValue(route.activeIndex);
              // if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              //   props.setSelectedIndex(route.selectedIndex);
              // }
            }
            break;
          default:
            break;
        }
      }
    });
  }, [props.value, props.selectedIndex, routes, props]);
  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };

  const handleClose = event => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleDrawerOpen = () => {
    props.setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    props.setOpenDrawer(false);
  };
  const handleMenuClick = menu => {
    setMenu(menu);
  };
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = event => {
    setAnchorEl(null);
    if (event.target.id === 'logout') {
      logout();
    }
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const NotFoundPage = () => {
    return <div>404!</div>;
  };

  const drawer = (
    <Fragment>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={props.openDrawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List disablePadding>
          {routes.map(
            (route, index) =>
              route.isMenu && (
                <ListItem
                  key={`${route}${index}`}
                  onClick={() => {
                    props.setOpenDrawer(false);
                    props.setValue(route.activeIndex);
                  }}
                  divider
                  button
                  component={Link}
                  to={route.path}
                  selected={props.value === route.activeIndex}
                  classes={{ selected: classes.drawerItemSelected }}
                >
                  <ListItemText
                    disableTypography
                    className={classes.drawerItem}
                  >
                    {route.name}
                  </ListItemText>
                </ListItem>
              )
          )}
        </List>
      </Drawer>
    </Fragment>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.openDrawer
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(
              classes.menuButton,
              props.openDrawer && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap={true}>
            Demand Portal
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {drawer}
    </div>
  );
};

export default Header;
