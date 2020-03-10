import React from 'react';
import { useContext } from 'react';

import { ControllerContext } from '../controller';
import { Button } from '../components/button';
import { ReactComponent as ArrowStartIcon } from '../images/arrow-start.svg';

const StartButton = () => {
  const context = useContext(ControllerContext);

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
