import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as Eye } from '../images/eye.svg';
import { togglePaths } from '../actions/actions';

let PathsButton = ({ showPaths, togglePaths }) => (
  <Button
    className=''
    onClick={togglePaths}
    color={showPaths ? 'blue' : 'gray'}
    tooltip={showPaths ? 'Hide all paths' : 'Show paths'}
    tooltipVerticalAlign='bottom'
  >
    <Eye />
  </Button>
);

const mapStateToProps = (state) => ({
  showPaths: state.showPaths
});

const mapDispatchToProps = (dispatch) => ({
  togglePaths: () => dispatch(togglePaths())
});

PathsButton = connect(mapStateToProps, mapDispatchToProps)(PathsButton);

export { PathsButton };
