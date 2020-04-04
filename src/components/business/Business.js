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
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  loadBusiness,
  saveBusiness,
  updateBusiness,
  deleteBusiness
} from '../../actions/business';
import { Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';

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
    width: 1100,
    fontWeight: 'bold'
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

const Business = ({
  isAuthenticated,
  loadBusiness,
  saveBusiness,
  updateBusiness,
  deleteBusiness,
  business
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/signin' />;
  }

  const classes = useStyles();
  const [businessName, setBusinessName] = useState('');
  const [result, setResult] = useState([]);
  const [state, setState] = React.useState({
    columns: [{ title: 'Business Unit', field: 'buName' }],
    data: []
  });
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    loadBusiness();
  }, []);

  useEffect(() => {
    setState(state => ({ ...state, data: business }));
  }, [business]);

  const onChange = e => {
    setBusinessName(e.target.value);
  };
  const handleSave = ({ buName }) => {
    debugger;
    return saveBusiness(buName);
  };

  const handleUpdate = ({ id, buName }) => {
    debugger;
    return updateBusiness(id, buName);
  };

  const handleDelete = ({ id }) => {
    return deleteBusiness(id);
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
  const rows = result && result.length > 0 ? result : business;
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
  console.log('data: ', state);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          id='businessName'
          name='businessName'
          label='Business name'
          value={businessName}
          fullWidth
          autoComplete='businessName'
          onChange={e => onChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.save}
          onClick={handleSave}
        >
          Save
        </Button>
      </Grid>
      <div style={{ width: '100%' }}>
        <MaterialTable
          icons={tableIcons}
          title='Business Unit'
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              handleSave(newData).then(() => {
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }),
            onRowUpdate: (newData, oldData) =>
              handleUpdate(newData, oldData).then(() => {
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }),
            onRowDelete: oldData =>
              handleDelete(oldData).then(() => {
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              })
            // new Promise(resolve => {
            //   setTimeout(() => {
            //     resolve();
            //     setState(prevState => {
            //       const data = [...prevState.data];
            //       data.splice(data.indexOf(oldData), 1);
            //       return { ...prevState, data };
            //     });
            //   }, 600);
            // })
          }}
          onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow)}
          options={{
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF'
            },
            rowStyle: rowData => ({
              backgroundColor:
                selectedRow && selectedRow.id === rowData.id
                  ? '#DDF1FC'
                  : '#FFF'
            })
          }}
        />
      </div>
    </Grid>
  );
};
Business.propTypes = {
  loadBusiness: PropTypes.func.isRequired,
  saveBusiness: PropTypes.func.isRequired,
  updateBusiness: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  business: state.business.business
});
export default connect(mapStateToProps, {
  loadBusiness,
  saveBusiness,
  updateBusiness,
  deleteBusiness
})(Business);
