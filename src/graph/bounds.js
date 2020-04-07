import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { SelectedContext } from '../controllers/selected';
import { dim } from './';

const strokeWidth = 3;

let Bounds = ({ bounds, left, top, right, bottom, guides }) => {
  const { selected } = useContext(SelectedContext);

  const opacity = bounds ? (selected !== null ? dim : 1) : 0;

  return (
    <g id='bounds' opacity={opacity}>
      <rect
        x={Math.min(left, right)}
        y={Math.min(top, bottom)}
        width={Math.abs(right - left)}
        height={Math.abs(bottom - top)}
        fill='none'
        stroke={guides.rgb}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

const mapStateToProps = (state) => ({
  bounds: state.bounds,
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom,
  guides: state.guides
});

Bounds = connect(mapStateToProps)(Bounds);

export { Bounds };
