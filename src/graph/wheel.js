import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { SelectedContext } from '../controllers/selected';
import { TimeContext } from '../controllers/time';

const precision = 2;

let Wheel = ({ orb, guides }) => {
  const selectedContext = useContext(SelectedContext);
  const timeContext = useContext(TimeContext);

  // geometry
  const selected = selectedContext.selected ?
    selectedContext.selected === orb.id ?
      true :
      false :
    undefined;
  const time = timeContext.time;
  const parent = orb.parent;
  const to = orb.computeProp('to', time);
  let a;
  if (parent)
    a = parent.computePoint(to, time);
  else
    a = { x: 0, y: 0 };
  const b = orb.computePoint(to, time);
  const radius = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

  return (
    <g
      className='wheel'
      opacity={
        orb.wheel && (selected === true || selected === undefined) ? 1 : 0
      }
    >
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
