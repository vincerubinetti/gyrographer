import React from 'react';

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
import { ReactComponent as FillIcon } from '../../images/fill.svg';
import { ReactComponent as StrokeIcon } from '../../images/stroke.svg';
import { ReactComponent as StrokeWidthIcon } from '../../images/stroke-width.svg';
import { ReactComponent as DashArrayIcon } from '../../images/dash-array.svg';
import { PathButton } from './path-button';
import { StickButton } from './stick-button';
import { WheelButton } from './wheel-button';
import { FromBox } from './from-box';
import { ToBox } from './to-box';
import { StepSizeBox } from './step-size-box';
import { RadiusBox } from './radius-box';
import { SpinBox } from './spin-box';
import { OffsetBox } from './offset-box';
import { FillPicker } from './fill-picker';
import { StrokePicker } from './stroke-picker';
import { StrokeWidthBox } from './stroke-width-box';
import { DashArrayBox } from './dash-array-box';

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
        control={<StepSizeBox />}
      />
      <Row
        icon={<RadiusIcon />}
        text='Radius'
        tooltip=''
        control={<RadiusBox />}
      />
      <Row icon={<SpinIcon />} text='Spin' tooltip='' control={<SpinBox />} />
      <Row
        icon={<OffsetIcon />}
        text='Offset'
        tooltip=''
        control={<OffsetBox />}
      />
      <Heading text='Style' />
      <Row
        icon={<FillIcon />}
        text='Fill'
        tooltip=''
        control={<FillPicker />}
      />
      <Row
        icon={<StrokeIcon />}
        text='Stroke'
        tooltip=''
        control={<StrokePicker />}
      />
      <Row
        icon={<StrokeWidthIcon />}
        text='Width'
        tooltip=''
        control={<StrokeWidthBox />}
      />
      <Row
        icon={<DashArrayIcon />}
        text='Dash Array'
        tooltip=''
        control={<DashArrayBox />}
      />
    </>
  </>
);

export default OrbSettings;
