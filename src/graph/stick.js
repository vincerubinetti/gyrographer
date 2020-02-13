import React from 'react';
import { connect } from 'react-redux';
import { useContext } from 'react';

import { TimeContext } from '../time';
import { Vector } from '../util/math';

const precision = 2;
const strokeWidth = 5;

let Stick = ({ orb, guideColor }) => {
  const context = useContext(TimeContext);

  const time = context.time;
  const parent = orb.parent;

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
    <g className="stick" opacity={orb.showStick ? 1 : 0}>
      <line
        fill="none"
        stroke={guideColor.rgba}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        x1={a.x.toFixed(precision)}
        y1={a.y.toFixed(precision)}
        x2={b.x.toFixed(precision)}
        y2={b.y.toFixed(precision)}
      />
      <circle
        fill={guideColor.rgba}
        cx={b.x.toFixed(precision)}
        cy={b.y.toFixed(precision)}
        r={(strokeWidth * 2).toFixed(precision)}
      />
    </g>
  );
};

const mapStateToProps = (state, props) => ({
  selected: state.selected ?
    state.selected.id === props.orb.id ?
      true :
      false :
    undefined,
  guideColor: state.guideColor
});

Stick = connect(mapStateToProps)(Stick);

export { Stick };
