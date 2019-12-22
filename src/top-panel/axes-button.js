import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Axes } from '../images/axes.svg';
import { toggleAxes } from '../actions/actions.js';

let AxesButton = ({ showAxes, toggleAxes }) => (
  <Button
    className="top_button"
    onClick={toggleAxes}
    color={showAxes ? 'blue' : 'gray'}
    tooltip={showAxes ? "Don't show axes" : 'Show axes'}
  >
    <Axes />
  </Button>
);

const mapStateToProps = (state) => ({
  showAxes: state.showAxes
});

const mapDispatchToProps = (dispatch) => ({
  toggleAxes: () => dispatch(toggleAxes())
});

AxesButton = connect(mapStateToProps, mapDispatchToProps)(AxesButton);

export { AxesButton };
