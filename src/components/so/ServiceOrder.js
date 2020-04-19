import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import PropTypes from 'prop-types';
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
import { Search } from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { loadServiceOrder } from '../../actions/serviceOrder';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import ServiceOrderStepper from './ServiceOrderStepper';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    width: 300
  },
  add: {
    margin: theme.spacing(3, 0, 2),
    width: 250,
    textAlign: 'right'
  },
  edit: {
    width: 20
  },
  delete: {
    width: 20
  },
  table: {
    // minWidth: 650
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const ServiceOrder = ({ serviceOrder, loadServiceOrder }) => {
  let history = useHistory();
  const [result, setResult] = useState([]);
  const [state, setState] = useState({
    data: []
  });
  useEffect(() => {
    loadServiceOrder();
  }, []);

  useEffect(() => {
    setState(state => ({ ...state, data: serviceOrder }));
  }, [serviceOrder]);

  const [showStepper, setShowStepper] = useState(false);
  const [formData, setFormData] = useState({
    serviceOrderText: '',
    positionCount: '',
    location: '',
    team: '',
    cases: []
  });
  const classes = useStyles();
  const { serviceOrderText, positionCount, location, team, cases } = formData;
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    // history.push('/serviceorder/add');
    setShowStepper(true);
  };
  const handleEditClick = id => {
    history.push(`/serviceorder/${id}`);
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password does not match', 'danger', 3000);
    } else {
      register({ serviceOrderText, positionCount, location, team, cases });
    }
  };

  const handleSearch = event => {
    event.preventDefault();
    const result = filterData(event.target.value);
    setResult(result);
  };

  const filterData = searchText => {
    const result = serviceOrderText.filter(
      item => item.serviceOrderText === searchText
    );
    return result;
  };

  const rows = result && result.length > 0 ? result : serviceOrder;

  return (
    <Fragment>
      {showStepper ? (
        <ServiceOrderStepper />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              type='button'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.add}
              onClick={handleAdd}
            >
              Add Service Order
            </Button>
          </Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.business} align='left'>
                    Service Order
                  </TableCell>
                  <TableCell align='center'>No of position</TableCell>
                  <TableCell align='center'>Location</TableCell>
                  <TableCell align='center'>Team</TableCell>
                  <TableCell align='center'>Created By</TableCell>
                  <TableCell align='center'>Candidates</TableCell>
                  <TableCell align='center'>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <Search />
                      </div>
                      <InputBase
                        placeholder='Search…'
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearch}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>
                      {row.serviceOrder}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.positionCount}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.location}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.teamId}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.createdBy}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.soCandidates}
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        type='button'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.edit}
                        onClick={() => handleEditClick(row.id)}
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
      )}
    </Fragment>
  );
};

ServiceOrder.propTypes = {
  loadServiceOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  serviceOrder: state.serviceOrder.serviceOrder
});

export default connect(mapStateToProps, {
  loadServiceOrder
})(ServiceOrder);
