import React from 'react';
import { connect } from 'react-redux';

const strokeWidth = 3;

let Axes = ({ left, top, right, bottom, guideColor }) => (
  <>
    <line
      x1={left}
      y1="0"
      x2={right}
      y2="0"
      stroke={guideColor.rgb}
      strokeWidth={strokeWidth}
      strokeLinecap="square"
    />
    <line
      x1="0"
      y1={top}
      x2="0"
      y2={bottom}
      stroke={guideColor.rgb}
      strokeWidth={strokeWidth}
      strokeLinecap="square"
    />
  </>
);

const mapStateToProps = (state) => ({
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom,
  guideColor: state.guideColor
});

Axes = connect(mapStateToProps)(Axes);

export { Axes };
