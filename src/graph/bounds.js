import React from 'react';
import { connect } from 'react-redux';

import './bounds.css';

let Bounds = ({ left, top, right, bottom }) => (
  <g id="bounds">
    <rect
      x={left}
      y={top}
      width={right - left}
      height={bottom - top}
      fill="none"
    />
  </g>
);

const mapStateToProps = (state) => ({
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom
});

Bounds = connect(mapStateToProps)(Bounds);

export { Bounds };
