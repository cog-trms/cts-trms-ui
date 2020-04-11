import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputBase
} from '@material-ui/core';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  Search,
  SaveAlt,
  ViewColumn
} from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import SearchIcon from '@material-ui/icons/Search';
import BusinessModal from '../common/BusinessModal';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 300
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 150,
    textAlign: 'right'
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

const ServiceOrder = ({}) => {
  const [state, setState] = React.useState({
    data: []
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    serviceOrder: '',
    positionCount: '',
    location: '',
    team: '',
    cases: []
  });
  const classes = useStyles();
  const { serviceOrder, positionCount, location, team, cases } = formData;
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClick = () => {
    setOpen(true);
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password does not match', 'danger', 3000);
    } else {
      register({ serviceOrder, positionCount, location, team, cases });
    }
  };

  const handleSearch = event => {
    event.preventDefault();
    const result = filterData(event.target.value);
    setResult(result);
  };

  const filterData = searchText => {
    const result = business.filter(item => item.buName === searchText);
    return result;
  };

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  const rows = [
    {
      serviceOrder: 'My SO1',
      teamId: '5e8a06e7cd3a7cb5d37dd0c3',
      positionCount: 2,
      location: 'Denver',
      createdBy: 'admin@gmail.com',
      soCandidates: []
    },
    {
      serviceOrder: 'My SO2',
      teamId: '5e8a06e7cd3a7cb5d37dd0c3',
      positionCount: 5,
      location: 'Denver',
      createdBy: 'admin@gmail.com',
      soCandidates: []
    },
    {
      serviceOrder: 'My SO3',
      teamId: '5e8a06e7cd3a7cb5d37dd0c3',
      positionCount: 3,
      location: 'Denver',
      createdBy: 'admin@gmail.com',
      soCandidates: []
    }
  ];
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12} sm={6}>
        <TextField
          autoComplete='sOrder'
          name='serviceOrder'
          value={serviceOrder}
          variant='outlined'
          required
          fullWidth
          id='serviceOrder'
          label='Service Order'
          autoFocus
          onChange={e => onChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant='outlined'
          required
          fullWidth
          id='positionCount'
          label='No of postion'
          name='positionCount'
          value={positionCount}
          autoComplete='positionCount'
          onChange={e => onChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant='outlined'
          required
          fullWidth
          id='location'
          label='Location'
          name='location'
          value={location}
          autoComplete='location'
          onChange={e => onChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant='outlined'
          required
          fullWidth
          id='team'
          label='Team'
          name='team'
          value={team}
          autoComplete='team'
          onChange={e => onChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Save
        </Button>
      </Grid> */}
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
                    onClick={handleEditClick}
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
      <BusinessModal open={open} handleClose={handleClose} />
    </Grid>
  );
};

ServiceOrder.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(ServiceOrder);
