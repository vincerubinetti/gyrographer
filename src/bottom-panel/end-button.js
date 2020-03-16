import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';
import { ReactComponent as ArrowEndIcon } from '../images/arrow-end.svg';

const EndButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button className='thin_button' onClick={context.toEnd} tooltip='To end'>
      <ArrowEndIcon />
    </Button>
  );
};

export { EndButton };
