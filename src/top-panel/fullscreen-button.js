import React from 'react';
import { useEffect } from 'react';

import { Button } from '../components/button';
import { ReactComponent as FullscreenIcon } from '../images/fullscreen.svg';

const FullscreenButton = () => {
  useEffect(() => {
    document.body.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement)
        document.body.dataset.fullscreen = 'true';
      else
        document.body.dataset.fullscreen = 'false';
    });
  }, []);

  return (
    <Button
      className=''
      onClick={() => {
        if (!document.fullscreenElement)
          document.body.requestFullscreen();
        else if (document.exitFullscreen)
          document.exitFullscreen();
      }}
      color='white'
      tooltip='Go fullscreen'
    >
      <FullscreenIcon />
    </Button>
  );
};

export { FullscreenButton };
