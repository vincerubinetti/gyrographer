import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as LoadIcon } from '../images/load.svg';

let LoadButton = ({ state }) =>
  <Button tooltip='Open project' onClick={loadState}>
    <LoadIcon />
  </Button>;

const mapStateToProps = (state) => ({
  state
});

LoadButton = connect(mapStateToProps)(LoadButton);

export { LoadButton };

const loadState = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.click();
};
