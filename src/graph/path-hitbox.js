import React from 'react';
import { connect } from 'react-redux';
import { useContext } from 'react';

import { setSelected } from '../actions/project';
import { TimeContext } from '../time';

let PathHitbox = ({ orb, guideColor, d, lastPoint, select }) => {
  const context = useContext(TimeContext);

  const time = context.time;

  // styles
  const strokeWidth = orb.computeProp('strokeWidth', time);

  return (
    <g className="path_hitbox" opacity={0}>
      <path
        fill="none"
        stroke={guideColor.rgb}
        strokeWidth={strokeWidth + 10}
        strokeLinecap="round"
        strokeLinejoin="round"
        d={d}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          select({ id: orb.id });
        }}
      />
      <circle
        fill={guideColor.rgb}
        cx={lastPoint.x}
        cy={lastPoint.y}
        r={strokeWidth + 20}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          select({ id: orb.id });
        }}
      />
    </g>
  );
};

const mapStateToProps = (state) => ({
  guideColor: state.guideColor
});

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(setSelected(...args))
});

PathHitbox = connect(mapStateToProps, mapDispatchToProps)(PathHitbox);

export { PathHitbox };
