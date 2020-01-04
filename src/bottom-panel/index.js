import React from 'react';

import { PlayButton } from './play-button.js';
import { LoopButton } from './loop-button.js';
import { SpeedButton } from './speed-button.js';
import { Timecode } from './timecode.js';
import { StartButton } from './start-button.js';
import { BackButton } from './back-button.js';
import { ForwardButton } from './forward-button.js';
import { EndButton } from './end-button.js';
import { Rail } from './rail.js';

import './index.css';

const BottomPanel = () => (
  <div id="bottom_panel">
    <PlayButton />
    <LoopButton />
    <SpeedButton />
    <Timecode />
    <StartButton />
    <BackButton />
    <Rail />
    <ForwardButton />
    <EndButton />
  </div>
);

export default BottomPanel;
