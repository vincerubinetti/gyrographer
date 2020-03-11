import React from 'react';

import { Row } from './row';
import { Heading } from './heading';
import { CheckBox } from '../components/check-box';
import { NumberBox } from '../components/number-box';
import { TextBox } from '../components/text-box';
import { ColorPicker } from '../components/color-picker';

import { ReactComponent as PathIcon } from '../images/path.svg';
import { ReactComponent as StickIcon } from '../images/stick.svg';
import { ReactComponent as WheelIcon } from '../images/wheel.svg';
import { ReactComponent as FromIcon } from '../images/from.svg';
import { ReactComponent as ToIcon } from '../images/to.svg';
import { ReactComponent as StepIcon } from '../images/step.svg';
import { ReactComponent as RadiusIcon } from '../images/radius.svg';
import { ReactComponent as SpinIcon } from '../images/spin.svg';
import { ReactComponent as OffsetIcon } from '../images/offset.svg';
import { ReactComponent as FillIcon } from '../images/fill.svg';
import { ReactComponent as StrokeIcon } from '../images/stroke.svg';
import { ReactComponent as StrokeWidthIcon } from '../images/stroke-width.svg';
import { ReactComponent as DashArrayIcon } from '../images/dash-array.svg';
import { ReactComponent as DashOffsetIcon } from '../images/dash-offset.svg';
import { ReactComponent as LineCapIcon } from '../images/cap.svg';
import { ReactComponent as LineJoinIcon } from '../images/join.svg';
import { ReactComponent as OrderIcon } from '../images/order.svg';
import { ReactComponent as CloseIcon } from '../images/close.svg';

const Orb = () => (
  <>
    <Heading text="Markers" />
    <Row prop="path" Icon={PathIcon} Control={CheckBox} />
    <Row prop="stick" Icon={StickIcon} Control={CheckBox} />
    <Row prop="wheel" Icon={WheelIcon} Control={CheckBox} />
    <Heading text="Geometry" />
    <Row prop="from" Icon={FromIcon} Control={NumberBox} />
    <Row prop="to" Icon={ToIcon} Control={NumberBox} />
    <Row prop="step" Icon={StepIcon} Control={NumberBox} />
    <Row prop="radius" Icon={RadiusIcon} Control={NumberBox} />
    <Row prop="spin" Icon={SpinIcon} Control={NumberBox} />
    <Row prop="offset" Icon={OffsetIcon} Control={NumberBox} />
    <Heading text="Style" />
    <Row prop="fill" Icon={FillIcon} Control={ColorPicker} />
    <Row prop="stroke" Icon={StrokeIcon} Control={ColorPicker} />
    <Row prop="strokeWidth" Icon={StrokeWidthIcon} Control={NumberBox} />
    <Row prop="dashArray" Icon={DashArrayIcon} Control={TextBox} />
    <Row prop="dashOffset" Icon={DashOffsetIcon} Control={NumberBox} />
    <Row prop="lineCap" Icon={LineCapIcon} Control={TextBox} />
    <Row prop="lineJoin" Icon={LineJoinIcon} Control={TextBox} />
    <Row prop="order" Icon={OrderIcon} Control={NumberBox} />
    <Row prop="close" Icon={CloseIcon} Control={CheckBox} />
  </>
);

export { Orb };
