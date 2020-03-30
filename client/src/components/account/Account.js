import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Checkbox,
  Grid,
  Link,
  TextField,
  Typography,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loadAccount } from '../../actions/account';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  save: {
    margin: theme.spacing(2, 0, 2),
    width: 150
  },
  edit: {
    width: 20
  },
  delete: {
    width: 20
  },
  table: {
    minWidth: 650
  },
  account: {
    width: 1100
  },
  description: {
    minWidth: 700
  },
  formControl: {
    width: 260
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Account = ({ loadAccount, account }) => {
  const classes = useStyles();
  // const [businessName, setBusinessName] = useState('');

  // const handleChange = event => {
  //   setBusinessName(event.target.value);
  // };

  useEffect(() => {
    loadAccount();
  }, []);

  const rows = account || [];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          id='accountName'
          name='accountName'
          label='Account name'
          fullWidth
          autoComplete='accountName'
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Business Unit</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={''}
            // onChange={handleChange}
          >
            <MenuItem value={10}>CMT</MenuItem>
            <MenuItem value={20}>IME</MenuItem>
            <MenuItem value={30}>BFSI</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* <Grid item xs={12} sm={3}>
        <TextField
          required
          id='businessName'
          name='businessName'
          label='businessName'
          fullWidth
          autoComplete='description'
        />
      </Grid> */}
      <Grid item xs={12} sm={3}>
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Save
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.account} align='left'>
                Account name
              </TableCell>
              {/* <TableCell className={classes.account} align='left'>
                Business name
              </TableCell> */}
              {/* <TableCell className={classes.description} align='left'>
                Description
              </TableCell> */}
              <TableCell align='center'></TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.accountName}
                </TableCell>
                {/* <TableCell component='th' scope='row'>
                  {row.user}
                </TableCell> */}
                {/* <TableCell align='left'>{row.businessUnit}</TableCell> */}
                <TableCell align='center'>
                  <Button
                    type='button'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.edit}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align='right'>
                  <Button
                    type='button'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.delete}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

Account.propTypes = {
  loadAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account.account
});

export default connect(mapStateToProps, { loadAccount })(Account);
