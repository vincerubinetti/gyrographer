import React from 'react';
import { connect } from 'react-redux';

const strokeWidth = 3;

let Bounds = ({ left, top, right, bottom, guideColor }) => (
  <rect
    x={left}
    y={top}
    width={right - left}
    height={bottom - top}
    fill='none'
    stroke={guideColor.rgb}
    strokeWidth={strokeWidth}
  />
);

const mapStateToProps = (state) => ({
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom,
  guideColor: state.guideColor
});

Bounds = connect(mapStateToProps)(Bounds);

export { Bounds };
