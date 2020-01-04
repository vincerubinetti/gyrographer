import React from 'react';
import { useContext } from 'react';

import { TimeContext } from '../time.js';
import { Vector } from '../util/math.js';
import './wheel.css';

const precision = 2;

const Wheel = ({ orb, alpha }) => {
  const context = useContext(TimeContext);

  const time = context.time;
  const parent = orb.parent;

  // styles
  const opacity = orb.showWheel ? alpha : 0;

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
  const radius = b.subtract(a).length();

  return (
    <circle
      className='wheel'
      opacity={opacity}
      cx={a.x.toFixed(precision)}
      cy={a.y.toFixed(precision)}
      r={radius.toFixed(precision)}
    />
  );
};

export { Wheel };
