import React from 'react';
import { useContext } from 'react';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as Play } from '../images/play.svg';
import { ReactComponent as Pause } from '../images/pause.svg';

export const PlayButton = () => {
  const context = useContext(AppContext);

  return (
    <Button
      className="time_button"
      onClick={() => context.changePlaying(!context.playing)}
      color={context.playing ? 'blue' : 'white'}
      tooltip={context.playing ? 'Pause' : 'Play'}
    >
      {context.playing ? <Pause /> : <Play />}
    </Button>
  );
};
