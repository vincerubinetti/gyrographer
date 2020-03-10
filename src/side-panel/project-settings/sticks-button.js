import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../components/button';
import { ReactComponent as EyeIcon } from '../../images/eye.svg';
import { toggleSticks } from '../../actions/project';

let SticksButton = ({ paths, toggleSticks }) => (
  <Button
    className=''
    onClick={toggleSticks}
    color={paths ? 'blue' : 'gray'}
    tooltip={paths ? 'Hide all sticks' : 'Show sticks'}
  >
    <EyeIcon />
  </Button>
);

const mapStateToProps = (state) => ({
  paths: state.paths
});

const mapDispatchToProps = (dispatch) => ({
  toggleSticks: () => dispatch(toggleSticks())
});

SticksButton = connect(mapStateToProps, mapDispatchToProps)(SticksButton);

export { SticksButton };
