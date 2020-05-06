import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  const results =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert, index) => <div key={index}>{alert.msg}</div>);

  return results;
};
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
