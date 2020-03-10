import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../components/button';
import { ReactComponent as EyeIcon } from '../../images/eye.svg';
import { toggleStick } from '../../actions/orbs';

let StickButton = ({ selected, isOn, toggleStick }) => (
  <Button
    className=''
    onClick={() => toggleStick({ id: selected })}
    color={isOn ? 'blue' : 'gray'}
    tooltip={isOn ? 'Hide stick' : 'Show stick'}
  >
    <EyeIcon />
  </Button>
);

const mapStateToProps = (state) => ({
  selected: state.selected,
  isOn: state.orbs[state.selected]?.path
});

const mapDispatchToProps = (dispatch) => ({
  toggleStick: (...args) => dispatch(toggleStick(...args))
});

StickButton = connect(mapStateToProps, mapDispatchToProps)(StickButton);

export { StickButton };
