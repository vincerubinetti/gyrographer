import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Bounds } from '../images/bounds.svg';
import { toggleBounds } from '../actions/actions.js';

let BoundsButton = ({ showBounds, toggleBounds }) => (
  <Button
    className="top_button"
    onClick={toggleBounds}
    color={showBounds ? 'blue' : 'gray'}
    tooltip={showBounds ? "Don't show bounds" : 'Show bounds'}
    tooltipVerticalAlign="bottom"
  >
    <Bounds />
  </Button>
);

const mapStateToProps = (state) => ({
  showBounds: state.showBounds
});

const mapDispatchToProps = (dispatch) => ({
  toggleBounds: () => dispatch(toggleBounds())
});

BoundsButton = connect(mapStateToProps, mapDispatchToProps)(BoundsButton);

export { BoundsButton };
