import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { SelectedContext } from '../controllers/selected';
import { TimeContext } from '../controllers/time';

let Hitbox = ({ orb, guides, d }) => {
  const { changeSelected } = useContext(SelectedContext);
  const { time } = useContext(TimeContext);

  // geometry
  const to = orb.computeProp('to', time);
  const b = orb.computePoint(to, time);

  // style
  const strokeWidth = orb.computeProp('strokeWidth', time);
  const lineCap = orb.computeProp('lineCap', time);
  const lineJoin = orb.computeProp('lineJoin', time);

  return (
    <g className='path_hitbox' opacity={0}>
      <path
        fill='none'
        stroke={guides.rgb}
        strokeWidth={strokeWidth + 10}
        strokeLinecap={lineCap}
        strokeLinejoin={lineJoin}
        d={d}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          changeSelected(orb.id);
        }}
      />
      <circle
        fill={guides.rgb}
        cx={b.x}
        cy={b.y}
        r={strokeWidth + 10}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          changeSelected(orb.id);
        }}
      />
    </g>
  );
};

const mapStateToProps = (state) => ({
  guides: state.guides
});

Hitbox = connect(mapStateToProps)(Hitbox);

export { Hitbox };
