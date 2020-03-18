import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';

const SpeedButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className='small'
      onClick={context.toggleSpeed}
      onCtrlClick={() => context.toggleSpeed(1)}
      tooltip='Preview speed'
    >
      {(context.speed * 100).toFixed(0)}%
    </Button>
  );
};

export { SpeedButton };
