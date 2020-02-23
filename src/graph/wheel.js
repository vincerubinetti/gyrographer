import React from 'react';
import { connect } from 'react-redux';
import { useContext } from 'react';

import { TimeContext } from '../time';
import { Vector } from '../util/math';

const precision = 2;

let Wheel = ({ orb, selected, guideColor }) => {
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
  const radius = b.subtract(a).length();

  return (
    <g
      className="wheel"
      opacity={
        orb.showWheel && (selected === true || selected === undefined) ? 1 : 0
      }
    >
      <circle
        fill={guideColor.rgba}
        opacity={0.25}
        cx={a.x.toFixed(precision)}
        cy={a.y.toFixed(precision)}
        r={radius.toFixed(precision)}
      />
    </g>
  );
};

const mapStateToProps = (state, props) => ({
  selected: state.selected ?
    state.selected === props.orb.id ?
      true :
      false :
    undefined,
  guideColor: state.guideColor
});

Wheel = connect(mapStateToProps)(Wheel);

export { Wheel };
