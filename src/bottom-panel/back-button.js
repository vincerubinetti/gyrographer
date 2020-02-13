import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../time';
import { Button } from '../components/button';
import { ReactComponent as ArrowLeftIcon } from '../images/arrow-left.svg';

export const BackButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className="thin_button"
      onClick={context.decrementTime}
      tooltip="Step back"
    >
      <ArrowLeftIcon />
    </Button>
  );
};
