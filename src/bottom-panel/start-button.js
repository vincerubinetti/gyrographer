import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';
import { ReactComponent as ArrowStartIcon } from '../images/arrow-start.svg';

const StartButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className='thin_button'
      onClick={context.toStart}
      tooltip='To start'
    >
      <ArrowStartIcon />
    </Button>
  );
};

export { StartButton };
