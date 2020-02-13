import React from 'react';

import { Row } from '../row';
import { Heading } from '../heading';
import { BoundsButton } from './bounds-button';
import { AxesButton } from './axes-button';
import { GridButton } from './grid-button';
import { PathsButton } from './paths-button';
import { SticksButton } from './sticks-button';
import { WheelsButton } from './wheels-button';
import { ReactComponent as BoundsIcon } from '../../images/bounds.svg';
import { ReactComponent as AxesIcon } from '../../images/axes.svg';
import { ReactComponent as GridIcon } from '../../images/grid.svg';
import { ReactComponent as PathIcon } from '../../images/path.svg';
import { ReactComponent as StickIcon } from '../../images/stick.svg';
import { ReactComponent as WheelIcon } from '../../images/wheel.svg';

const ProjectSettings = () => (
  <>
    <Heading text='Guides' />
    <Row
      icon={<BoundsIcon />}
      text='Bounds'
      tooltip='Boundaries of the image'
      control={<BoundsButton />}
    />
    <Row
      icon={<AxesIcon />}
      text='Axes'
      tooltip='X/Y axes and origin of the image'
      control={<AxesButton />}
    />
    <Row
      icon={<GridIcon />}
      text='Grid'
      tooltip='Major and minor gridlines'
      control={<GridButton />}
    />
    <Heading text='Markers' />
    <Row
      icon={<PathIcon />}
      text='Paths'
      tooltip='Curves traced by orbs'
      control={<PathsButton />}
    />
    <Row
      icon={<StickIcon />}
      text='Sticks'
      tooltip='Visualization lines from parent orb to child orb'
      control={<SticksButton />}
    />
    <Row
      icon={<WheelIcon />}
      text='Wheels'
      tooltip='Visualization circles from parent orb to child orb'
      control={<WheelsButton />}
    />
  </>
);

export default ProjectSettings;
