import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';
import { ReactComponent as ArrowLeftIcon } from '../images/arrow-left.svg';

const BackButton = () => {
  const { decrementTime } = useContext(TimeContext);

  return (
    <Button className='thin_button' onClick={decrementTime} tooltip='Step back'>
      <ArrowLeftIcon />
    </Button>
  );
};

export { BackButton };
