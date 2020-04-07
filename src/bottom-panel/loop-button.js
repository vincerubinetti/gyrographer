import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';
import { ReactComponent as LoopIcon } from '../images/loop.svg';

const LoopButton = () => {
  const { loop, toggleLoop } = useContext(TimeContext);

  return (
    <Button
      onClick={toggleLoop}
      color={loop ? 'blue' : 'gray'}
      tooltip={loop ? "Don't loop" : 'Loop'}
    >
      <LoopIcon />
    </Button>
  );
};

export { LoopButton };
