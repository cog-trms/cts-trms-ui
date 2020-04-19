import React, { useState, useEffect, Fragment, forwardRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography
} from '@material-ui/core';
import ServiceOrderCreate from './ServiceOrderCreate';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const StepperComponent = () => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastname: ''
  });

  nextStep = () => {
    setStep(step + 1);
  };

  prevStep = () => {
    setStep(step - 1);
  };

  handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { firstName, lastname } = formData;
  return <div>test</div>;
};

export default StepperComponent;
