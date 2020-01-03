import React from 'react';
import { connect } from 'react-redux';

import './axes.css';

let Axes = ({ show, left, top, right, bottom }) => (
  <g id='axes' data-show={show}>
    <line x1={left} y1='0' x2={right} y2='0' strokeLinecap='square' />
    <line x1='0' y1={top} x2='0' y2={bottom} strokeLinecap='square' />
  </g>
);

const mapStateToProps = (state) => ({
  show: state.showAxes,
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom
});

Axes = connect(mapStateToProps)(Axes);

export { Axes };
