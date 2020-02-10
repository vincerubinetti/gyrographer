import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as Eye } from '../images/eye.svg';
import { toggleAxes } from '../actions/actions';

let AxesButton = ({ showAxes, toggleAxes }) => (
  <Button
    className=""
    onClick={toggleAxes}
    color={showAxes ? 'blue' : 'gray'}
    tooltip={showAxes ? "Don't show axes" : 'Show axes'}
    tooltipVerticalAlign="bottom"
  >
    <Eye />
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
