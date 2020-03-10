import React from 'react';
import { useContext } from 'react';

import { ControllerContext } from '../controller';
import { Button } from '../components/button';
import { ReactComponent as LoopIcon } from '../images/loop.svg';

const LoopButton = () => {
  const context = useContext(ControllerContext);

  return (
    <Button
      className=''
      onClick={context.toggleLoop}
      color={context.loop ? 'blue' : 'gray'}
      tooltip={context.loop ? "Don't loop" : 'Loop'}
    >
      <LoopIcon />
    </Button>
  );
};

export { LoopButton };
