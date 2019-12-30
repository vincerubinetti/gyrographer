import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../time.js';
import { Vector } from '../util/math.js';
import { Color } from '../util/color.js';
import './orb-handle.css';

const precision = 2;
const radius = 12;

let OrbHandle = ({ orb, edit, backgroundColor }) => {
  const context = useContext(TimeContext);

  const time = context.time;
  const parent = orb.parent;

  // styles
  const color = new Color(backgroundColor).contrast().hex(true);

  // geometry
  const to = orb.computeProp('to', time);
  let a;
  if (parent)
    a = parent.computePoint(to, time);
  else
    a = new Vector(0, 0);
  const b = orb.computePoint(to, time);

  return (
    <g className="orb_handle" data-active={edit}>
      <line
        x1={a.x.toFixed(precision)}
        y1={a.y.toFixed(precision)}
        x2={b.x.toFixed(precision)}
        y2={b.y.toFixed(precision)}
        stroke={color}
        strokeWidth={radius / 4}
        strokeLinecap="round"
      />
      <circle
        cx={b.x.toFixed(precision)}
        cy={b.y.toFixed(precision)}
        r={radius}
        fill={color}
      />
    </g>
  );
};

const mapStateToProps = (state) => ({
  edit: state.edit,
  backgroundColor: state.backgroundColor
});

OrbHandle = connect(mapStateToProps)(OrbHandle);

export { OrbHandle };
