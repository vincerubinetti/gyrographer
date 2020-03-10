import React from 'react';
import { useContext } from 'react';

import { ControllerContext } from '../controller';
import { Button } from '../components/button';
import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';

const PlayButton = () => {
  const context = useContext(ControllerContext);

  return (
    <Button
      className=''
      onClick={context.togglePlaying}
      color={context.playing ? 'blue' : 'white'}
      tooltip={context.playing ? 'Pause' : 'Play'}
    >
      {context.playing ? <PauseIcon /> : <PlayIcon />}
    </Button>
  );
};

export { PlayButton };
