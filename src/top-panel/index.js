import React from 'react';

import { SaveButton } from './save-button';
import { LoadButton } from './load-button';
import { UndoButton } from './undo-button';
import { RedoButton } from './redo-button';
import { RandomButton } from './random-button';
import { TitleBox } from './title-box';
import { HelpLink } from './help-link';
import { FullscreenButton } from './fullscreen-button';

import './index.css';

const TopPanel = () =>
  <div id='top_panel'>
    <SaveButton />
    <LoadButton />
    <UndoButton />
    <RedoButton />
    <RandomButton />
    <TitleBox />
    <span className='flex_grow' />
    <HelpLink />
    <FullscreenButton />
  </div>;
export default TopPanel;
