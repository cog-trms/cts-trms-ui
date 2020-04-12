import React, { useState, useEffect, Fragment, forwardRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid, TextField, InputBase } from '@material-ui/core';
import MaterialTable from 'material-table';
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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    height: 500,
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
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

const ServiceOrderById = ({ open, handleClose, businessName }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    data: []
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [formData, setFormData] = useState({
    serviceOrder: '',
    positionCount: '',
    location: '',
    team: '',
    cases: []
  });
  const { serviceOrder, positionCount, location, team, cases } = formData;

  const handleSave = ({ program, teamMembers, teamName }) => {
    return saveTeam(program.id, teamMembers.id, teamName);
  };

  const handleUpdate = ({ account, programName, id, programManager }) => {
    return updateTeam(account.id, programName, id, programManager.id);
  };

  const handleDelete = ({ id }) => {
    return deleteTeam(id);
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

  const body = (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>
      <div style={{ width: '100%' }}>
        <MaterialTable
          icons={tableIcons}
          title='Team'
          columns={[
            { title: 'Team', field: 'teamName' },
            {
              title: 'Account',
              field: 'account.id'
            },
            {
              title: 'Program',
              field: 'program.id'
            },
            {
              title: 'Program Manager',
              field: 'programManager.id'
            },
            {
              title: 'Team Members',
              field: 'teamMembers.id'
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
    </Fragment>
  );

  return <div>{body}</div>;
};
export default ServiceOrderById;
