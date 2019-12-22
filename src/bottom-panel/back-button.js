import React from 'react';
import { useContext } from 'react';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowLeft } from '../images/arrow_left.svg';

export const BackButton = () => {
  const context = useContext(AppContext);

  return (
    <Button
      className="time_button_half"
      onClick={context.decrementTime}
      tooltip="Step back"
    >
      <ArrowLeft />
    </Button>
  );
};
