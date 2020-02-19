import React from 'react';

import { NumberBox } from '../../components/number-box';
import { Row } from '../row';
import { Heading } from '../heading';
import { ReactComponent as PathIcon } from '../../images/path.svg';
import { ReactComponent as StickIcon } from '../../images/stick.svg';
import { ReactComponent as WheelIcon } from '../../images/wheel.svg';
import { ReactComponent as FromIcon } from '../../images/from.svg';
import { ReactComponent as ToIcon } from '../../images/to.svg';
import { ReactComponent as StepIcon } from '../../images/step.svg';
import { ReactComponent as RadiusIcon } from '../../images/radius.svg';
import { ReactComponent as SpinIcon } from '../../images/spin.svg';
import { ReactComponent as OffsetIcon } from '../../images/offset.svg';
import { PathButton } from './path-button';
import { StickButton } from './stick-button';
import { WheelButton } from './wheel-button';
import { FromBox } from './from-box';
import { ToBox } from './to-box';

const OrbSettings = () => (
  <>
    <>
      <Heading text='Markers' />
      <Row
        icon={<PathIcon />}
        text='Path'
        tooltip=''
        control={<PathButton />}
      />
      <Row
        icon={<StickIcon />}
        text='Stick'
        tooltip=''
        control={<StickButton />}
      />
      <Row
        icon={<WheelIcon />}
        text='Wheel'
        tooltip=''
        control={<WheelButton />}
      />
      <Heading text='Geometry' />
      <Row icon={<FromIcon />} text='From' tooltip='' control={<FromBox />} />
      <Row icon={<ToIcon />} text='To' tooltip='' control={<ToBox />} />
      <Row
        icon={<StepIcon />}
        text='Step Size'
        tooltip=''
        control={<NumberBox />}
      />
      <Row
        icon={<RadiusIcon />}
        text='Radius'
        tooltip=''
        control={<NumberBox />}
      />
      <Row icon={<SpinIcon />} text='Spin' tooltip='' control={<NumberBox />} />
      <Row
        icon={<OffsetIcon />}
        text='Offset'
        tooltip=''
        control={<NumberBox />}
      />
    </>
  </>
);

export default OrbSettings;
