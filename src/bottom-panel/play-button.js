import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../time';
import { Button } from '../components/button';
import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';

export const PlayButton = () => {
  const context = useContext(TimeContext);

  return (
    <Button
      className=""
      onClick={() => context.changePlaying(!context.playing)}
      color={context.playing ? 'blue' : 'white'}
      tooltip={context.playing ? 'Pause' : 'Play'}
    >
      {context.playing ? <PauseIcon /> : <PlayIcon />}
    </Button>
  );
};
