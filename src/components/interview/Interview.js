import React, {
  useState,
  useEffect,
  Fragment,
  forwardRef,
  useRef,
  useImperativeHandle
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  TextField,
  Input,
  InputBase,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  Chip
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
  root: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const skills = [
  'react',
  'java',
  'javascript',
  '.net',
  'angular',
  'python',
  'flutter'
];

const candidates = ['candidate 1', 'candidate 2', 'candidate 3', 'candidate 4'];

const Interview = forwardRef(
  (
    {
      serviceOrderById,
      saveServiceOrder,
      loadServiceOrderById,
      loadTeam,
      team,
      handleNext
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      handleSave() {
        return saveServiceOrder(
          state.data,
          { locationText, positionCountText, serviceOrderText },
          teamId
        );
      }
    }));
    const { soId } = useParams();
    const classes = useStyles();
    const [state, setState] = useState({
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
    const [teamData, setTeamData] = useState([]);
    const [skillName, setSkillName] = useState([]);
    const [candidateName, setCandidateName] = useState([]);
    useEffect(() => {
      loadTeam();
      if (soId) {
        loadServiceOrderById(soId);
      }
    }, []);

    const handleChange = event => {
      // setTeamId(event.target.value);
      setTeamData(event.target.value);
    };
    const handleSkillChange = event => {
      setSkillName(event.target.value);
    };
    const handleCandidateChange = event => {
      setCandidateName(event.target.value);
    };

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    handleNext = () => {
      // handleSave();
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
      Delete: forwardRef((props, ref) => (
        <DeleteOutline {...props} ref={ref} />
      )),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
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
      ViewColumn: forwardRef((props, ref) => (
        <ViewColumn {...props} ref={ref} />
      ))
    };

    const body = (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-mutiple-chip-label'>Panelist</InputLabel>
              <Select
                labelId='demo-mutiple-chip-label'
                id='demo-mutiple-chip'
                multiple
                value={teamData}
                onChange={handleChange}
                input={<Input id='select-multiple-chip' />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {team.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.teamName}
                    // style={getStyles(item.teamName, personName, theme)}
                  >
                    {item.teamName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-mutiple-chip-label'>Skills</InputLabel>
              <Select
                labelId='demo-mutiple-chip-label'
                id='demo-mutiple-chip'
                multiple
                value={skillName}
                onChange={handleSkillChange}
                input={<Input id='select-multiple-chip' />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {skills.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item}
                    // style={getStyles(item.teamName, personName, theme)}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id='demo-simple-select-label'>Team</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={candidateName}
                name={candidateName}
                onChange={handleCandidateChange}
              >
                {candidates.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='positionCountText'
              label='Panelist aviability'
              name='positionCountText'
              value={positionCountText}
              autoComplete='positionCount'
              onChange={e => onChange(e)}
            />
          </Grid>
        </Grid>
      </Fragment>
    );

    return <div className={classes.root}>{body}</div>;
  }
);

Interview.propTypes = {
  loadServiceOrder: PropTypes.func.isRequired,
  loadServiceOrderById: PropTypes.func.isRequired,
  saveServiceOrder: PropTypes.func.isRequired,
  loadTeam: PropTypes.func.isRequired,
  handleNext: PropTypes.func
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
})(Interview);
