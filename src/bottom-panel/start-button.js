import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../time';
import { Button } from '../components/button';
import { ReactComponent as ArrowStart } from '../images/arrow-start.svg';

export const StartButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className="thin_button"
      onClick={() => context.changeTime(0)}
      tooltip="To start"
      tooltipHorizontalAlign="left"
    >
      <ArrowStart />
    </Button>
  );
};
