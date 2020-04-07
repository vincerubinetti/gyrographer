import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';

const SpeedButton = () => {
  const { speed, toggleSpeed } = useContext(TimeContext);

  return (
    <Button
      className='small'
      onClick={toggleSpeed}
      onCtrlClick={() => toggleSpeed(1)}
      tooltip='Preview speed'
    >
      {(speed * 100).toFixed(0)}%
    </Button>
  );
};

export { SpeedButton };
