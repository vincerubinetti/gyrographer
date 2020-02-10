import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as Eye } from '../images/eye.svg';
import { toggleGrid } from '../actions/actions';

let GridButton = ({ showGrid, toggleGrid }) => (
  <Button
    className=""
    onClick={toggleGrid}
    color={showGrid ? 'blue' : 'gray'}
    tooltip={showGrid ? "Don't show grid" : 'Show grid'}
    tooltipVerticalAlign="bottom"
  >
    <Eye />
  </Button>
);

const mapStateToProps = (state) => ({
  showGrid: state.showGrid
});

const mapDispatchToProps = (dispatch) => ({
  toggleGrid: () => dispatch(toggleGrid())
});

GridButton = connect(mapStateToProps, mapDispatchToProps)(GridButton);

export { GridButton };
