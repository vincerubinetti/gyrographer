import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { ControllerContext } from '../controller';

let Hitbox = ({ orb, guides, d, lastPoint }) => {
  const context = useContext(ControllerContext);

  const time = context.time;

  // styles
  const strokeWidth = orb.computeProp('strokeWidth', time);

  return (
    <g className='path_hitbox' opacity={0}>
      <path
        fill='none'
        stroke={guides.rgb}
        strokeWidth={strokeWidth + 10}
        strokeLinecap='round'
        strokeLinejoin='round'
        d={d}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          context.changeSelected(orb.id);
        }}
      />
      <circle
        fill={guides.rgb}
        cx={lastPoint.x}
        cy={lastPoint.y}
        r={strokeWidth + 20}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          context.changeSelected(orb.id);
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
