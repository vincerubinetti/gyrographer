import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Loop } from '../images/loop.svg';
import { toggleLoop } from '../actions/actions.js';

let LoopButton = ({ loop, toggleLoop }) => (
  <Button
    className="time_button"
    onClick={toggleLoop}
    color={loop ? 'blue' : 'gray'}
    tooltip={loop ? "Don't loop" : 'Loop'}
  >
    <Loop />
  </Button>
);

const mapStateToProps = (state) => ({
  loop: state.loop
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoop: () => dispatch(toggleLoop())
});

LoopButton = connect(mapStateToProps, mapDispatchToProps)(LoopButton);

export { LoopButton };
