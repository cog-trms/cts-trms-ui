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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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
  loadProgram,
  saveProgram,
  updateProgram,
  deleteProgram
} from '../../actions/program';
import { loadAccount } from '../../actions/account';
import { loadUser } from '../../actions/user';

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
  program: {
    width: 1100,
    fontWeight: 'bold'
  },
  description: {
    minWidth: 700
  },
  formControl: {
    width: 260
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
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

const Program = ({
  program,
  loadProgram,
  saveProgram,
  updateProgram,
  deleteProgram,
  loadAccount,
  account,
  loadUser,
  user
}) => {
  const accountList = {};
  const programManager = {};

  account.forEach(ele => {
    accountList[ele.id] = ele.accountName;
  });

  user.forEach(ele => {
    programManager[ele.id] = ele.fullName;
  });

  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [state, setState] = React.useState({
    data: []
  });
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    loadProgram();
    loadAccount();
    loadUser();
  }, []);

  useEffect(() => {
    setState(state => ({ ...state, data: program }));
  }, [program]);

  const handleSearch = event => {
    event.preventDefault();
    const result = filterData(event.target.value);
    setResult(result);
  };

  const filterData = searchText => {
    const result = program.filter(item => item.programName === searchText);
    return result;
  };

  const handleSave = ({ account, programName, programManager }) => {
    return saveProgram(account.id, programName, programManager.id);
  };

  const handleUpdate = ({ account, programName, id, programManager }) => {
    return updateProgram(account.id, programName, id, programManager.id);
  };

  const handleDelete = ({ id }) => {
    return deleteProgram(id);
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

  return (
    <Grid container spacing={3}>
      <div style={{ width: '100%' }}>
        <MaterialTable
          icons={tableIcons}
          title='Program'
          columns={[
            { title: 'Program', field: 'programName' },
            {
              title: 'Account',
              field: 'account.id',
              lookup: accountList
            },
            {
              title: 'Program Manager',
              field: 'programManager.id',
              lookup: programManager
            }
          ]}
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
          }}
          onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow)}
          options={{
            headerStyle: {
              backgroundColor: '#04A4F9',
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

Program.propTypes = {
  loadProgram: PropTypes.func.isRequired,
  saveProgram: PropTypes.func.isRequired,
  updateProgram: PropTypes.func.isRequired,
  deleteProgram: PropTypes.func.isRequired,
  loadAccount: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  program: state.program.program,
  account: state.account.account,
  user: state.user.user
});

export default connect(mapStateToProps, {
  loadProgram,
  saveProgram,
  updateProgram,
  deleteProgram,
  loadAccount,
  loadUser
})(Program);
