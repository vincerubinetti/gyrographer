import React from 'react';
import { connect } from 'react-redux';

import './bounds.css';

let Bounds = ({ show, left, top, right, bottom }) => (
  <g id='bounds' data-show={show}>
    <rect
      x={left}
      y={top}
      width={right - left}
      height={bottom - top}
      fill='none'
    />
  </g>
);

const mapStateToProps = (state) => ({
  show: state.showBounds,
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom
});

Bounds = connect(mapStateToProps)(Bounds);

export { Bounds };
