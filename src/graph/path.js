import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';

const Path = ({ orb, d }) => {
  const context = useContext(TimeContext);

  // geometry
  const time = context.time;

  // style
  const fill = orb.computeProp('fill', time);
  const stroke = orb.computeProp('stroke', time);
  const strokeWidth = orb.computeProp('strokeWidth', time);
  const dashArray = orb.computeProp('dashArray', time);
  const dashOffset = orb.computeProp('dashOffset', time);
  const lineCap = orb.computeProp('lineCap', time);
  const lineJoin = orb.computeProp('lineJoin', time);

  return (
    <g className='path' opacity={orb.path ? 1 : 0}>
      <path
        fill={fill.rgba}
        stroke={stroke.rgba}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap={lineCap}
        strokeLinejoin={lineJoin}
        d={d}
      />
    </g>
  );
};

export { Path };
