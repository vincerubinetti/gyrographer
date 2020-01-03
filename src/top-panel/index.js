import React from 'react';

import { EditButton } from './edit-button.js';
import { UndoButton } from './undo-button.js';
import { RedoButton } from './redo-button.js';

import './index.css';

const TopPanel = () => (
  <div className='top_panel'>
    <EditButton />
    <UndoButton />
    <RedoButton />
  </div>
);

export default TopPanel;
