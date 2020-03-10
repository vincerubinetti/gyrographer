import React from 'react';
import { useContext } from 'react';

import { ControllerContext } from '../controller';
import { Wheel } from './wheel';
import { Stick } from './stick';
import { Path } from './path';
import { Hitbox } from './hitbox';

const precision = 2;

const Contents = () => {
  const context = useContext(ControllerContext);

  const time = context.time;

  const wheels = [];
  const sticks = [];
  const paths = [];
  const hitboxes = [];

  for (const orb of context.orbTree) {
    const points = orb.computePath(time);
    let d = points
      .map((point, index) =>
        [
          '\n',
          index === 0 ? 'M' : 'L',
          point.x.toFixed(precision),
          point.y.toFixed(precision)
        ].join(' ')
      )
      .join(' ');
    if (orb.close)
      d += 'z';

    const lastPoint = points[points.length - 1];
    wheels.push(<Wheel key={wheels.length} orb={orb} lastPoint={lastPoint} />);
    sticks.push(<Stick key={sticks.length} orb={orb} lastPoint={lastPoint} />);
    paths.push(<Path key={paths.length} orb={orb} d={d} />);
    hitboxes.push(
      <Hitbox key={hitboxes.length} orb={orb} d={d} lastPoint={lastPoint} />
    );
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

export default Contents;
