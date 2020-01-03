import React from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { setSpeed } from '../actions/actions.js';

const speeds = [0.1, 0.25, 0.5, 1, 2, 4];

let SpeedButton = ({ speed, setSpeed }) => {
  const onClick = useCallback(() => {
    const index = speeds.indexOf(speed);
    let newSpeed = 1;
    if (index !== -1)
      newSpeed = speeds[(index + 1) % speeds.length];

    setSpeed({ speed: newSpeed });
  }, [speed, setSpeed]);

  const onCtrlClick = useCallback(() => {
    setSpeed({ speed: 1 });
  }, [setSpeed]);

  return (
    <Button
      className=""
      onClick={onClick}
      onCtrlClick={onCtrlClick}
      tooltip="Preview speed"
    >
      {speed} <b>&times;</b>
    </Button>
  );
};

const mapStateToProps = (state) => ({
  speed: state.speed
});

const mapDispatchToProps = (dispatch) => ({
  setSpeed: (...args) => dispatch(setSpeed(...args))
});

SpeedButton = connect(mapStateToProps, mapDispatchToProps)(SpeedButton);

export { SpeedButton };
