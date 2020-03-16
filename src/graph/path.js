import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../controllers/time';

const Path = ({ orb, d }) => {
  const context = useContext(TimeContext);

  const time = context.time;

  // styles
  const fill = orb.computeProp('fill', time);
  const stroke = orb.computeProp('stroke', time);
  const strokeWidth = orb.computeProp('strokeWidth', time);
  const close = orb.close;
  const dashArray = orb.computeProp('dashArray', time);
  const dashOffset = orb.computeProp('dashOffset', time);
  const strokeLineCap = orb.strokeLineCap;
  const strokeLineJoin = orb.strokeLineJoin;

  return (
    <g className='path' opacity={orb.path ? 1 : 0}>
      <path
        fill={close ? fill.rgba : 'none'}
        stroke={stroke.rgba}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
        d={d}
      />
    </g>
  );
};

export { Path };
