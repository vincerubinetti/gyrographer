import React from 'react';
import { Component } from 'react';

import { BoundsButton } from './bounds-button.js';
import { AxesButton } from './axes-button.js';
import { GridButton } from './grid-button.js';

import './top-panel.css';

export class TopPanel extends Component {
  render() {
    return (
      <div className="top_panel">
        <BoundsButton />
        <AxesButton />
        <GridButton />
      </div>
    );
  }
}
