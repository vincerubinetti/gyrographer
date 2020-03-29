import React from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { setState } from '../actions';
import { generateRandomProject } from '../util/random';
import { ReactComponent as RandomIcon } from '../images/random.svg';

let RandomButton = ({ setState }) => {
  const onClick = useCallback(
    () =>
      setState({
        state: generateRandomProject(),
        description: 'Generate random project'
      }),
    [setState]
  );

  return (
    <Button tooltip='Generate random project' onClick={onClick}>
      <RandomIcon />
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setState: (...args) => dispatch(setState(...args))
});

RandomButton = connect(null, mapDispatchToProps)(RandomButton);

export { RandomButton };
