import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';
import { Button } from '../components/button';
import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';

const PlayButton = () => {
  const { playing, togglePlaying } = useContext(TimeContext);

  return (
    <Button
      onClick={togglePlaying}
      color={playing ? 'blue' : 'white'}
      tooltip={playing ? 'Pause' : 'Play'}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </Button>
  );
};

export { PlayButton };
