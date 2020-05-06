import React from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AccountCircle, Mail as MailIcon } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
}));

const AppBarMenu = ({ menuId }) => {
  const classes = useStyles();
  return (
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
  );
};
AppBarMenu.PropTypes = {
  menuId: PropTypes.number.isRequired
};
export default AppBarMenu;
