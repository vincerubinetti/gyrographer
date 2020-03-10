import React from 'react';
import { useContext } from 'react';

import { ControllerContext } from '../controller';
import { Button } from '../components/button';

const SpeedButton = () => {
  const context = useContext(ControllerContext);

  return (
    <Button
      className='small'
      onClick={context.toggleSpeed}
      onCtrlClick={() => context.toggleSpeed(1)}
      tooltip='Preview speed'
    >
      {context.speed} &times;
    </Button>
  );
};

export { SpeedButton };
