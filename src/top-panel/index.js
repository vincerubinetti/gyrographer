import React from 'react';

import { EditButton } from './edit-button.js';
import { BoundsButton } from './bounds-button.js';
import { AxesButton } from './axes-button.js';
import { GridButton } from './grid-button.js';
import { UndoButton } from './undo-button.js';
import { RedoButton } from './redo-button.js';

import './index.css';

const TopPanel = () => (
  <div className="top_panel">
    <EditButton />
    <BoundsButton />
    <AxesButton />
    <GridButton />
    <UndoButton />
    <RedoButton />
  </div>
);

export default TopPanel;
