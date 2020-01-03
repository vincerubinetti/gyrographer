import React from 'react';

import { Row } from './row.js';
import { BoundsButton } from './bounds-button.js';
import { AxesButton } from './axes-button.js';
import { GridButton } from './grid-button.js';
import { ReactComponent as Bounds } from '../images/bounds.svg';
import { ReactComponent as Axes } from '../images/axes.svg';
import { ReactComponent as Grid } from '../images/grid.svg';

const Project = () => (
  <div>
    <Row
      icon={<Bounds />}
      text='Show Bounds'
      tooltip='Show the boundaries of the image'
      control={<BoundsButton />}
    />
    <Row
      icon={<Axes />}
      text='Show Axes'
      tooltip='Show the axes of the image'
      control={<AxesButton />}
    />
    <Row
      icon={<Grid />}
      text='Show Grid'
      tooltip='Show the grid'
      control={<GridButton />}
    />
  </div>
);

export { Project };
