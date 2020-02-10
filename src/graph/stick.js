import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../time';
import { Vector } from '../util/math';
import './stick.css';

const precision = 2;

const Stick = ({ orb }) => {
  const context = useContext(TimeContext);

  const time = context.time;
  const parent = orb.parent;

  // styles
  const opacity = orb.showStick ? 1 : 0;
  const strokeWidth = orb.strokeWidth;
  const radius = strokeWidth * 1.5;

  // geometry
  const to = orb.computeProp('to', time);
  // a = parent point
  // b = this orb's point
  let a;
  if (parent)
    a = parent.computePoint(to, time);
  else
    a = new Vector(0, 0);
  const b = orb.computePoint(to, time);

  return (
    <g className='stick' opacity={opacity}>
      <line
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        x1={a.x.toFixed(precision)}
        y1={a.y.toFixed(precision)}
        x2={b.x.toFixed(precision)}
        y2={b.y.toFixed(precision)}
      />
      <circle
        cx={b.x.toFixed(precision)}
        cy={b.y.toFixed(precision)}
        r={radius.toFixed(precision)}
      />
    </g>
  );
};

export { Stick };
