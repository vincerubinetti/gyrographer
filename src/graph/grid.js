import React from 'react';
import { connect } from 'react-redux';

import './grid.css';

const minorSpacing = 50;
const majorMultiple = 4;

let Grid = ({ left, top, right, bottom }) => {
  const minorHorizontalLines = [];
  const minorVerticalLines = [];
  const majorHorizontalLines = [];
  const majorVerticalLines = [];

  for (let index = -1000; index < 1000; index++) {
    const xy = index * minorSpacing;

    if (xy > left && xy < right) {
      const newLine = <line key={index} x1={left} y1={xy} x2={right} y2={xy} />;
      if (index % majorMultiple === 0)
        majorHorizontalLines.push(newLine);
      else
        minorHorizontalLines.push(newLine);
    }
    if (xy > top && xy < bottom) {
      const newLine = <line key={index} x1={xy} y1={top} x2={xy} y2={bottom} />;
      if (index % majorMultiple === 0)
        majorVerticalLines.push(newLine);
      else
        minorVerticalLines.push(newLine);
    }
  }

  return (
    <>
      <g id='minor_horizontal_lines'>{minorHorizontalLines}</g>
      <g id='minor_vertical_lines'>{minorVerticalLines}</g>
      <g id='major_horizontal_lines'>{majorHorizontalLines}</g>
      <g id='major_vertical_lines'>{majorVerticalLines}</g>
    </>
  );
};

const mapStateToProps = (state) => ({
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom
});

Grid = connect(mapStateToProps)(Grid);

export { Grid };
