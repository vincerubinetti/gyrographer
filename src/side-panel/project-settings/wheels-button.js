import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../components/button';
import { ReactComponent as EyeIcon } from '../../images/eye.svg';
import { toggleWheels } from '../../actions/project';

let WheelsButton = ({ showWheels, toggleWheels }) => (
  <Button
    className=''
    onClick={toggleWheels}
    color={showWheels ? 'blue' : 'gray'}
    tooltip={showWheels ? 'Hide all wheels' : 'Show wheels'}
  >
    <EyeIcon />
  </Button>
);

const mapStateToProps = (state) => ({
  showWheels: state.showWheels
});

const mapDispatchToProps = (dispatch) => ({
  toggleWheels: () => dispatch(toggleWheels())
});

WheelsButton = connect(mapStateToProps, mapDispatchToProps)(WheelsButton);

export { WheelsButton };
