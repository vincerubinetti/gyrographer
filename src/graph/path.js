import React from 'react';
import { useContext } from 'react';

import { SelectedContext } from '../controllers/selected';
import { TimeContext } from '../controllers/time';
import { dim } from './';

const Path = ({ orb, d }) => {
  let { selected } = useContext(SelectedContext);
  const { time } = useContext(TimeContext);

  // geometry
  selected =
    selected !== null ? (selected === orb.id ? true : false) : undefined;

  // style
  const fill = orb.computeProp('fill', time);
  const stroke = orb.computeProp('stroke', time);
  const strokeWidth = orb.computeProp('strokeWidth', time);
  const dashArray = orb.computeProp('dashArray', time);
  const dashOffset = orb.computeProp('dashOffset', time);
  const lineCap = orb.computeProp('lineCap', time);
  const lineJoin = orb.computeProp('lineJoin', time);
  let opacity;
  if (selected === true)
    opacity = 1;
  else if (selected === false)
    opacity = orb.path ? dim : 0;
  else
    opacity = orb.path ? 1 : 0;

  return (
    <g className='path' opacity={opacity}>
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
