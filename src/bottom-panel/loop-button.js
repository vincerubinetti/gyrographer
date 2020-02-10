import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as Loop } from '../images/loop.svg';
import { toggleLoop } from '../actions/actions';

let LoopButton = ({ loop, toggleLoop }) => (
  <Button
    className=""
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
