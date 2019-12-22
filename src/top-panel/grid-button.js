import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Grid } from '../images/grid.svg';
import { toggleGrid } from '../actions/actions.js';

let GridButton = ({ showGrid, toggleGrid }) => (
  <Button
    className="top_button"
    onClick={toggleGrid}
    color={showGrid ? 'blue' : 'gray'}
    tooltip={showGrid ? "Don't show grid" : 'Show grid'}
  >
    <Grid />
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
