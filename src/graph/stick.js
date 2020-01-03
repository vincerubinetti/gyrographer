import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../time.js';
import { Vector } from '../util/math.js';
import { Color } from '../util/color.js';
import './stick.css';

const precision = 2;

let Stick = ({ orb, edit }) => {
  const context = useContext(TimeContext);

  const time = context.time;
  const parent = orb.parent;

  // styles
  const color = new Color(orb.computeProp('strokeColor', time));
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
    <g className='stick' data-edit={edit} opacity={color.a}>
      <line
        stroke={color.hex(true)}
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
        fill={color.hex(true)}
      />
    </g>
  );
};

const mapStateToProps = (state) => ({
  edit: state.edit
});

Stick = connect(mapStateToProps)(Stick);

export { Stick };