import React from 'react';

import { PlayButton } from './play-button';
import { LoopButton } from './loop-button';
import { SpeedButton } from './speed-button';
import { Timecode } from './timecode';
import { StartButton } from './start-button';
import { BackButton } from './back-button';
import { ForwardButton } from './forward-button';
import { EndButton } from './end-button';
import { Rail } from './rail';

import './index.css';

const BottomPanel = () =>

  <div id='bottom_panel'>
    <PlayButton />
    <LoopButton />
    <SpeedButton />
    <Timecode />
    <StartButton />
    <BackButton />
    <Rail />
    <ForwardButton />
    <EndButton />
  </div>;
export default BottomPanel;
