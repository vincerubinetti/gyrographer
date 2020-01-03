import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../time.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowRight } from '../images/arrow_right.svg';

export const ForwardButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className="thin_button"
      onClick={context.incrementTime}
      tooltip="Step forward"
      tooltipHorizontalAlign="right"
    >
      <ArrowRight />
    </Button>
  );
};
