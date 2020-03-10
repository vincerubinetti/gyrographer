import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../components/button';
import { ReactComponent as EyeIcon } from '../../images/eye.svg';
import { togglePaths } from '../../actions/project';

let PathsButton = ({ paths, togglePaths }) => (
  <Button
    className=''
    onClick={togglePaths}
    color={paths ? 'blue' : 'gray'}
    tooltip={paths ? 'Hide all paths' : 'Show paths'}
  >
    <EyeIcon />
  </Button>
);

const mapStateToProps = (state) => ({
  paths: state.paths
});

const mapDispatchToProps = (dispatch) => ({
  togglePaths: () => dispatch(togglePaths())
});

PathsButton = connect(mapStateToProps, mapDispatchToProps)(PathsButton);

export { PathsButton };
