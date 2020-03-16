import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';
import { ReactComponent as ArrowLeftIcon } from '../images/arrow-left.svg';

const BackButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className='thin_button'
      onClick={context.decrementTime}
      tooltip='Step back'
    >
      <ArrowLeftIcon />
    </Button>
  );
};

export { BackButton };
