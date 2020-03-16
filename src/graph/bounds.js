import React from 'react';
import { connect } from 'react-redux';

const strokeWidth = 3;

let Bounds = ({ left, top, right, bottom, guides }) =>
  <rect
    x={Math.min(left, right)}
    y={Math.min(top, bottom)}
    width={Math.abs(right - left)}
    height={Math.abs(bottom - top)}
    fill='none'
    stroke={guides.rgb}
    strokeWidth={strokeWidth}
  />;

const mapStateToProps = (state) => ({
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom,
  guides: state.guides
});

Bounds = connect(mapStateToProps)(Bounds);

export { Bounds };
