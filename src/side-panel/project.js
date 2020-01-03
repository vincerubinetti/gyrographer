import React from 'react';

import { Row } from './row.js';
import { Header } from './header.js';
import { BoundsButton } from './bounds-button.js';
import { AxesButton } from './axes-button.js';
import { GridButton } from './grid-button.js';
import { ReactComponent as Bounds } from '../images/bounds.svg';
import { ReactComponent as Axes } from '../images/axes.svg';
import { ReactComponent as Grid } from '../images/grid.svg';

const Project = () => (
  <div>
    <Header text='Guides' />
    <Row
      icon={<Bounds />}
      text='Bounds'
      tooltip='Boundaries of the image'
      control={<BoundsButton />}
    />
    <Row
      icon={<Axes />}
      text='Axes'
      tooltip='X/Y axes and origin of the image'
      control={<AxesButton />}
    />
    <Row
      icon={<Grid />}
      text='Grid'
      tooltip='Major and minor gridlines'
      control={<GridButton />}
    />
  </div>
);

export { Project };
