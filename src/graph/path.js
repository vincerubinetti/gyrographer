import React from 'react';
import { useContext } from 'react';

import { SelectedContext } from '../controllers/selected';
import { TimeContext } from '../controllers/time';
import { dim } from './';

const Path = ({ orb, d }) => {
  const selectedContext = useContext(SelectedContext);
  const timeContext = useContext(TimeContext);

  // geometry
  const selected = selectedContext.selected ?
    selectedContext.selected === orb.id ?
      true :
      false :
    undefined;
  const time = timeContext.time;

  // style
  const fill = orb.computeProp('fill', time);
  const stroke = orb.computeProp('stroke', time);
  const strokeWidth = orb.computeProp('strokeWidth', time);
  const dashArray = orb.computeProp('dashArray', time);
  const dashOffset = orb.computeProp('dashOffset', time);
  const lineCap = orb.computeProp('lineCap', time);
  const lineJoin = orb.computeProp('lineJoin', time);
  const opacity = orb.path ? selected === false ? dim : 1 : 0;

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
