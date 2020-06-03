import React from 'react';
// import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './style.css';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputBase
} from '@material-ui/core';
function formatDate(str) {
  return str.substr(0, 10);
}

function capitalize(str) {
  return str
    .split(' ')
    .map(s => {
      return s.charAt(0).toUpperCase() + s.substr(1);
    })
    .join(' ');
}

class UserTableRow extends React.Component {
  state = { expanded: false };

  toggleExpander = e => {
    if (e.target.type === 'checkbox') return;

    if (!this.state.expanded) {
      this.setState({ expanded: true }, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false });
        }
      });
    }
  };

  render() {
    const { item } = this.props;
    return [
      <TableRow key='main' onClick={this.toggleExpander}>
        <TableCell>
          <input className='uk-checkbox' type='checkbox' />
        </TableCell>
        <TableCell className='uk-text-nowrap'>{this.props.index}.</TableCell>
        <TableCell>
          <img
            className='uk-preserve-width uk-border-circle'
            src={user.picture.thumbnail}
            width={48}
            alt='avatar'
          />
        </TableCell>
        <TableCell>
          {capitalize(user.name.first + ' ' + user.name.last)}
          <br />
          <small>{user.email}</small>
        </TableCell>
        <TableCell>
          {capitalize(user.location.city)} ({user.nat})
        </TableCell>
        <TableCell>{formatDate(user.registered)}</TableCell>
      </TableRow>,
      this.state.expanded && (
        <TableRow className='expandable' key='tr-expander'>
          <TableCell className='uk-background-muted' colSpan={6}>
            <div ref='expanderBody' className='inner uk-grid'>
              <div className='uk-width-1-4 uk-text-center'>
                <img
                  className='uk-preserve-width uk-border-circle'
                  src={user.picture.large}
                  alt='avatar'
                />
              </div>
              <div className='uk-width-3-4'>
                <h3>{capitalize(user.name.first + ' ' + user.name.last)}</h3>
                <p>
                  Address:
                  <br />
                  <i>
                    {capitalize(user.location.street)}
                    <br />
                    {user.location.postcode} {capitalize(user.location.city)}
                    <br />
                    {user.nat}
                  </i>
                </p>
                <p>
                  E-mail: {user.email}
                  <br />
                  Phone: {user.phone}
                </p>
                <p>Date of birth: {formatDate(user.dob)}</p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )
    ];
  }
}
export default UserTableRow;
