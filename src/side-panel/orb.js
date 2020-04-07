import React from 'react';
import { useContext } from 'react';

import { SelectedContext } from '../controllers/selected';
import { Row } from './row';
import { Heading } from './heading';
import { CheckBox } from '../components/check-box';
import { NumberBox } from '../components/number-box';
import { TextBox } from '../components/text-box';
import { ColorPicker } from '../components/color-picker';
import { ChoiceBox } from '../components/choice-box';

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

const Orb = () => {
  const { selected } = useContext(SelectedContext);

  if (selected === null)
    return <div className='side_panel_empty'>No orb selected</div>;

  return (
    <>
      <Heading text='Markers' />
      <Row prop='path' Icon={PathIcon} Control={CheckBox} orb={true} />
      <Row prop='stick' Icon={StickIcon} Control={CheckBox} orb={true} />
      <Row prop='wheel' Icon={WheelIcon} Control={CheckBox} orb={true} />
      <Heading text='Geometry' />
      <Row prop='from' Icon={FromIcon} Control={NumberBox} orb={true} />
      <Row prop='to' Icon={ToIcon} Control={NumberBox} orb={true} />
      <Row prop='step' Icon={StepIcon} Control={NumberBox} orb={true} />
      <Row prop='radius' Icon={RadiusIcon} Control={NumberBox} orb={true} />
      <Row prop='spin' Icon={SpinIcon} Control={NumberBox} orb={true} />
      <Row prop='offset' Icon={OffsetIcon} Control={NumberBox} orb={true} />
      <Heading text='Style' />
      <Row prop='fill' Icon={FillIcon} Control={ColorPicker} orb={true} />
      <Row prop='stroke' Icon={StrokeIcon} Control={ColorPicker} orb={true} />
      <Row
        prop='strokeWidth'
        Icon={StrokeWidthIcon}
        Control={NumberBox}
        orb={true}
      />
      <Row prop='dashArray' Icon={DashArrayIcon} Control={TextBox} orb={true} />
      <Row
        prop='dashOffset'
        Icon={DashOffsetIcon}
        Control={NumberBox}
        orb={true}
      />
      <Row prop='lineCap' Icon={LineCapIcon} Control={ChoiceBox} orb={true} />
      <Row prop='lineJoin' Icon={LineJoinIcon} Control={ChoiceBox} orb={true} />
      <Row prop='order' Icon={OrderIcon} Control={NumberBox} orb={true} />
      <Row prop='close' Icon={CloseIcon} Control={CheckBox} orb={true} />
    </>
  );
};

export { Orb };
