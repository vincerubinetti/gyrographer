import React from 'react';

import { SaveButton } from './save-button';
import { UndoButton } from './undo-button';
import { RedoButton } from './redo-button';
import { FullscreenButton } from './fullscreen-button';

import './index.css';

const TopPanel = () =>
  <div id='top_panel'>
    <SaveButton />
    <UndoButton />
    <RedoButton />
    <span className='flex_grow' />
    <FullscreenButton />
  </div>;

export default TopPanel;
