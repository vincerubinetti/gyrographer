import React from 'react';

import { UndoButton } from './undo-button';
import { RedoButton } from './redo-button';

import './index.css';

const TopPanel = () => (
  <div id='top_panel'>
    <UndoButton />
    <RedoButton />
  </div>
);

export default TopPanel;
