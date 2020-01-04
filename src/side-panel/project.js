import React from 'react';

import { Row } from './row.js';
import { Header } from './header.js';
import { BoundsButton } from './bounds-button.js';
import { AxesButton } from './axes-button.js';
import { GridButton } from './grid-button.js';
import { PathsButton } from './paths-button.js';
import { SticksButton } from './sticks-button.js';
import { WheelsButton } from './wheels-button.js';
import { ReactComponent as Bounds } from '../images/bounds.svg';
import { ReactComponent as Axes } from '../images/axes.svg';
import { ReactComponent as Grid } from '../images/grid.svg';
import { ReactComponent as Path } from '../images/show-path.svg';
import { ReactComponent as Stick } from '../images/show-stick.svg';
import { ReactComponent as Wheel } from '../images/show-wheel.svg';

const Project = () => (
  <>
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
    <Row
      icon={<Path />}
      text='Paths'
      tooltip='Curves traced by orbs'
      control={<PathsButton />}
    />
    <Row
      icon={<Stick />}
      text='Sticks'
      tooltip='Visualization lines from parent orb to child orb'
      control={<SticksButton />}
    />
    <Row
      icon={<Wheel />}
      text='Wheels'
      tooltip='Visualization circles from parent orb to child orb'
      control={<WheelsButton />}
    />
  </>
);

export { Project };
