import React, { useState, useEffect, Fragment, forwardRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fade, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  Button,
  Grid,
  TextField,
  InputBase,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  MenuItem
} from '@material-ui/core';
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
import {
  loadServiceOrder,
  loadServiceOrderById,
  saveServiceOrder
} from '../../actions/serviceOrder';

import { loadTeam } from '../../actions/team';

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

const ServiceOrderCreate = ({
  serviceOrderById,
  saveServiceOrder,
  loadServiceOrderById,
  loadTeam,
  team
}) => {
  const { soId } = useParams();
  const classes = useStyles();
  const [state, setState] = React.useState({
    data: []
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const [formData, setFormData] = useState({
    serviceOrderText: '',
    positionCountText: '',
    locationText: ''
  });
  const { serviceOrderText, positionCountText, locationText } = formData;
  const [teamId, setTeamId] = useState('');

  useEffect(() => {
    loadTeam();
    if (soId) {
      loadServiceOrderById(soId);
    }
  }, []);

  const handleChange = event => {
    setTeamId(event.target.value);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    return saveServiceOrder(
      state.data,
      { locationText, positionCountText, serviceOrderText },
      teamId
    );
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
      <button onClick={() => history.push('/')}>Go to home</button>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete='sOrder'
            name='serviceOrderText'
            value={serviceOrderText}
            variant='outlined'
            required
            fullWidth
            id='serviceOrderText'
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
            id='positionCountText'
            label='No of postion'
            name='positionCountText'
            value={positionCountText}
            autoComplete='positionCount'
            onChange={e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            required
            fullWidth
            id='locationText'
            label='location'
            name='locationText'
            value={locationText}
            autoComplete='location'
            onChange={e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Team</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={teamId}
              name={teamId}
              onChange={handleChange}
            >
              {team.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.teamName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <div style={{ width: '100%' }}>
          <MaterialTable
            icons={tableIcons}
            title='Case'
            columns={[
              { title: 'Level', field: 'level' },
              {
                title: 'Number of position',
                field: 'numberOfPosition'
              },
              {
                title: 'Skill',
                field: 'skill'
              }
            ]}
            data={state.data}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 300);
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
        <Grid item xs={12} sm={3}>
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
      </Grid>
    </Fragment>
  );

  return <div>{body}</div>;
};

ServiceOrderCreate.propTypes = {
  loadServiceOrder: PropTypes.func.isRequired,
  loadServiceOrderById: PropTypes.func.isRequired,
  saveServiceOrder: PropTypes.func.isRequired,
  loadTeam: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  serviceOrder: state.serviceOrder.serviceOrder,
  serviceOrderById: state.serviceOrder.serviceOrderById,
  team: state.team.team
});

export default connect(mapStateToProps, {
  loadServiceOrder,
  loadServiceOrderById,
  saveServiceOrder,
  loadTeam
})(ServiceOrderCreate);
