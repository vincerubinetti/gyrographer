import React from 'react';
import { useContext } from 'react';

import { TreeContext } from '../controllers/tree';
import { TimeContext } from '../controllers/time';
import { Wheel } from './wheel';
import { Stick } from './stick';
import { Path } from './path';
import { Hitbox } from './hitbox';

export const Contents = () => {
  const { list } = useContext(TreeContext);
  const { time } = useContext(TimeContext);

  const wheels = [];
  const sticks = [];
  const paths = [];
  const hitboxes = [];

  for (const orb of list) {
    const d = orb.computePath(time);
    wheels.push(<Wheel key={wheels.length} orb={orb} />);
    sticks.push(<Stick key={sticks.length} orb={orb} />);
    paths.push(<Path key={paths.length} orb={orb} d={d} />);
    hitboxes.push(<Hitbox key={hitboxes.length} orb={orb} d={d} />);
  }

  return (
    <g id='contents'>
      <g id='wheels'>{wheels}</g>
      <g id='sticks'>{sticks}</g>
      <g id='paths'>{paths}</g>
      <g id='hitboxes'>{hitboxes}</g>
    </g>
  );
};
