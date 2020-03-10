import React from 'react';
import { useContext } from 'react';

import { ControllerContext } from '../controller';
import { Button } from '../components/button';
import { ReactComponent as ArrowRightIcon } from '../images/arrow-right.svg';

const ForwardButton = () => {
  const context = useContext(ControllerContext);

  return (
    <Button
      className='thin_button'
      onClick={context.incrementTime}
      tooltip='Step forward'
    >
      <ArrowRightIcon />
    </Button>
  );
};

export { ForwardButton };
