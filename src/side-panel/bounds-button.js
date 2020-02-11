import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as Eye } from '../images/eye.svg';
import { toggleBounds } from '../actions/actions';

let BoundsButton = ({ showBounds, toggleBounds }) => (
  <Button
    className=""
    onClick={toggleBounds}
    color={showBounds ? 'blue' : 'gray'}
    tooltip={showBounds ? "Don't show bounds" : 'Show bounds'}
  >
    <Eye />
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
