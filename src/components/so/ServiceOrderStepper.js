import React, {
  useState,
  useEffect,
  Fragment,
  forwardRef,
  useRef
} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid
} from '@material-ui/core';
import ServiceOrderCreate from './ServiceOrderCreate';
import Interview from '../interview/Interview';

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
  },
  content: {
    width: '80%',
    margin: theme.spacing(3),
    alignItems: 'center'
  }
}));

const getSteps = () => {
  return [
    'Create a service order',
    'Schedule an interview',
    'Provide interview feedback',
    'Decision making'
  ];
};

const getStepContent = (step, handleNext, childRef) => {
  switch (step) {
    case 0:
      return (
        <ServiceOrderCreate forwardedRef={childRef} handleNext={handleNext} />
      );
    case 1:
      return <Interview forwardedRef={childRef} handleNext={handleNext} />;
    case 2:
      return 'dummy2';
    default:
      return 'Unknown step';
  }
};

const ServiceOrderStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const childRef = useRef();

  useEffect(() => {
    console.log(childRef.current, 'parent');
  }, []);

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      //senthil - need to uncommend it back
      childRef.current.handleSave();
    } else if (activeStep === 1) {
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const body = (
    <Fragment>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant='caption'>Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.content}>
              {getStepContent(activeStep, handleNext, childRef)}
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );

  return <div>{body}</div>;
};

export default ServiceOrderStepper;
