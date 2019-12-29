import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../time.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowLeft } from '../images/arrow_left.svg';

export const BackButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className="time_button_half"
      onClick={context.decrementTime}
      tooltip="Step back"
      tooltipHorizontalAlign="left"
    >
      <ArrowLeft />
    </Button>
  );
};
