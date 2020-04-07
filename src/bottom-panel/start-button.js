import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';
import { ReactComponent as ArrowStartIcon } from '../images/arrow-start.svg';

const StartButton = () => {
  const { toStart } = useContext(TimeContext);

  return (
    <Button className='thin_button' onClick={toStart} tooltip='To start'>
      <ArrowStartIcon />
    </Button>
  );
};

export { StartButton };
