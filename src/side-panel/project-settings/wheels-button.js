import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../components/button';
import { ReactComponent as EyeIcon } from '../../images/eye.svg';
import { toggleWheels } from '../../actions/project';

let WheelsButton = ({ wheels, toggleWheels }) => (
  <Button
    className=''
    onClick={toggleWheels}
    color={wheels ? 'blue' : 'gray'}
    tooltip={wheels ? 'Hide all wheels' : 'Show wheels'}
  >
    <EyeIcon />
  </Button>
);

const mapStateToProps = (state) => ({
  wheels: state.wheels
});

const mapDispatchToProps = (dispatch) => ({
  toggleWheels: () => dispatch(toggleWheels())
});

WheelsButton = connect(mapStateToProps, mapDispatchToProps)(WheelsButton);

export { WheelsButton };
