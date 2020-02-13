import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../components/button';
import { ReactComponent as EyeIcon } from '../../images/eye.svg';
import { togglePath } from '../../actions/orbs';

let PathButton = ({ selected, isOn, togglePath }) => (
  <Button
    className=''
    onClick={() => togglePath({ id: selected })}
    color={isOn ? 'blue' : 'gray'}
    tooltip={isOn ? 'Hide path' : 'Show path'}
  >
    <EyeIcon />
  </Button>
);

const mapStateToProps = (state) => ({
  selected: state.selected,
  isOn: state.orbs[state.selected]?.showPath
});

const mapDispatchToProps = (dispatch) => ({
  togglePath: (...args) => dispatch(togglePath(...args))
});

PathButton = connect(mapStateToProps, mapDispatchToProps)(PathButton);

export { PathButton };
