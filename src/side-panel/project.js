import React from 'react';

import { Row } from './row';
import { Heading } from './heading';
import { CheckBox } from '../components/check-box';
import { NumberBox } from '../components/number-box';
import { ColorPicker } from '../components/color-picker';

import { ReactComponent as BoundsIcon } from '../images/bounds.svg';
import { ReactComponent as AxesIcon } from '../images/axes.svg';
import { ReactComponent as GridIcon } from '../images/grid.svg';
import { ReactComponent as LeftIcon } from '../images/left.svg';
import { ReactComponent as TopIcon } from '../images/top.svg';
import { ReactComponent as RightIcon } from '../images/right.svg';
import { ReactComponent as BottomIcon } from '../images/bottom.svg';
import { ReactComponent as FillIcon } from '../images/fill.svg';
import { ReactComponent as StrokeIcon } from '../images/stroke.svg';
import { ReactComponent as FpsIcon } from '../images/fps.svg';
import { ReactComponent as LengthIcon } from '../images/length.svg';

const Project = () => (
  <>
    <Heading text="Guides" />
    <Row prop="bounds" Icon={BoundsIcon} Control={CheckBox} />
    <Row prop="axes" Icon={AxesIcon} Control={CheckBox} />
    <Row prop="grid" Icon={GridIcon} Control={CheckBox} />
    <Heading text="Geometry" />
    <Row prop="left" Icon={LeftIcon} Control={NumberBox} />
    <Row prop="top" Icon={TopIcon} Control={NumberBox} />
    <Row prop="right" Icon={RightIcon} Control={NumberBox} />
    <Row prop="bottom" Icon={BottomIcon} Control={NumberBox} />
    <Heading text="Style" />
    <Row prop="background" Icon={FillIcon} Control={ColorPicker} />
    <Row prop="guides" Icon={StrokeIcon} Control={ColorPicker} />
    <Heading text="Animation" />
    <Row prop="fps" Icon={FpsIcon} Control={NumberBox} />
    <Row prop="length" Icon={LengthIcon} Control={NumberBox} />
  </>
);

export { Project };
