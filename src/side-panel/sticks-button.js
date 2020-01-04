import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Eye } from '../images/eye.svg';
import { toggleSticks } from '../actions/actions.js';

let SticksButton = ({ showSticks, toggleSticks }) => (
  <Button
    className=''
    onClick={toggleSticks}
    color={showSticks ? 'blue' : 'gray'}
    tooltip={showSticks ? 'Hide all sticks' : 'Show sticks'}
    tooltipVerticalAlign='bottom'
  >
    <Eye />
  </Button>
);

const mapStateToProps = (state) => ({
  showSticks: state.showSticks
});

const mapDispatchToProps = (dispatch) => ({
  toggleSticks: () => dispatch(toggleSticks())
});

SticksButton = connect(mapStateToProps, mapDispatchToProps)(SticksButton);

export { SticksButton };
