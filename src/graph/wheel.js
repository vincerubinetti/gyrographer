import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { SelectedContext } from '../controllers/selected';
import { TimeContext } from '../controllers/time';
import { dim } from './';

const precision = 2;

let Wheel = ({ orb, guides }) => {
  let { selected } = useContext(SelectedContext);
  const { time } = useContext(TimeContext);

  // geometry
  selected =
    selected !== null ? (selected === orb.id ? true : false) : undefined;
  const parent = orb.parent;
  const to = orb.computeProp('to', time);
  let a;
  if (parent)
    a = parent.computePoint(to, time);
  else
    a = { x: 0, y: 0 };
  const b = orb.computePoint(to, time);
  const radius = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

  // style
  let opacity;
  if (selected === true)
    opacity = 1;
  else if (selected === false)
    opacity = orb.wheel ? dim : 0;
  else
    opacity = orb.wheel ? 1 : 0;

  return (
    <g className='wheel' opacity={opacity}>
      <circle
        fill={guides.rgba}
        opacity={0.25}
        cx={a.x.toFixed(precision)}
        cy={a.y.toFixed(precision)}
        r={radius.toFixed(precision)}
      />
    </g>
  );
};

const mapStateToProps = (state) => ({
  guides: state.guides
});

Wheel = connect(mapStateToProps)(Wheel);

export { Wheel };
