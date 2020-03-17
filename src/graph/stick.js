import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { SelectedContext } from '../controllers/selected';
import { TimeContext } from '../controllers/time';

const precision = 2;
const strokeWidth = 5;

let Stick = ({ orb, guides }) => {
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

  return (
    <g
      className='stick'
      opacity={
        orb.stick && (selected === true || selected === undefined) ? 1 : 0
      }
    >
      <line
        fill='none'
        stroke={guides.rgba}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        x1={a.x.toFixed(precision)}
        y1={a.y.toFixed(precision)}
        x2={b.x.toFixed(precision)}
        y2={b.y.toFixed(precision)}
      />
      <circle
        fill={guides.rgba}
        cx={b.x.toFixed(precision)}
        cy={b.y.toFixed(precision)}
        r={(strokeWidth * 2).toFixed(precision)}
      />
    </g>
  );
};

const mapStateToProps = (state) => ({
  guides: state.guides
});

Stick = connect(mapStateToProps)(Stick);

export { Stick };
