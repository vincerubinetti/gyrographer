import React from 'react';

import { UndoButton } from './undo-button';
import { RedoButton } from './redo-button';
import { FullscreenButton } from './fullscreen-button';

import './index.css';

const TopPanel = () =>
  <div id='top_panel'>
    <UndoButton />
    <RedoButton />
    <span className='flex_grow' />
    <FullscreenButton />
  </div>;

export default TopPanel;
