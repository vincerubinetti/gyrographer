import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../time.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowStart } from '../images/arrow_start.svg';

export const StartButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className="time_button_half"
      onClick={() => context.changeTime(0)}
      tooltip="To start"
      tooltipHorizontalAlign="left"
    >
      <ArrowStart />
    </Button>
  );
};
