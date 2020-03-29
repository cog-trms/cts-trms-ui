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
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import BusinessTable from './BusinessTable';
import { connect } from 'react-redux';
import { loadBusiness } from '../../actions/business';

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
  business: {
    width: 1100
  }
}));

const Business = ({ loadBusiness, business }) => {
  const classes = useStyles();

  useEffect(() => {
    loadBusiness();
  }, []);
  const rows = business || [];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          id='businessName'
          name='businessName'
          label='Business name'
          fullWidth
          autoComplete='businessName'
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.save}
          // onClick={() => loadBusiness()}
        >
          Save
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.business} align='left'>
                Business Unit
              </TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.buName}
                </TableCell>
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
Business.propTypes = {
  loadBusiness: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  business: state.business.business
});
export default connect(mapStateToProps, { loadBusiness })(Business);
