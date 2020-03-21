import React from 'react';

import { SaveButton } from './save-button';
import { LoadButton } from './load-button';
import { UndoButton } from './undo-button';
import { RedoButton } from './redo-button';
import { TitleBox } from './title-box';
import { FullscreenButton } from './fullscreen-button';

import './index.css';

const TopPanel = () =>
  <div id='top_panel'>
    <SaveButton />
    <LoadButton />
    <UndoButton />
    <RedoButton />
    <span className='flex_grow' />
    <TitleBox />
    <span className='flex_grow' />
    <FullscreenButton />
  </div>;
export default TopPanel;
