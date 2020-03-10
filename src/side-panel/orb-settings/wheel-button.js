import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../components/button';
import { ReactComponent as EyeIcon } from '../../images/eye.svg';
import { toggleWheel } from '../../actions/orbs';

let WheelButton = ({ selected, isOn, toggleWheel }) => (
  <Button
    className=''
    onClick={() => toggleWheel({ id: selected })}
    color={isOn ? 'blue' : 'gray'}
    tooltip={isOn ? 'Hide wheel' : 'Show wheel'}
  >
    <EyeIcon />
  </Button>
);

const mapStateToProps = (state) => ({
  selected: state.selected,
  isOn: state.orbs[state.selected]?.wheel
});

const mapDispatchToProps = (dispatch) => ({
  toggleWheel: (...args) => dispatch(toggleWheel(...args))
});

WheelButton = connect(mapStateToProps, mapDispatchToProps)(WheelButton);

export { WheelButton };
