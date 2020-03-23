import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { SelectedContext } from '../controllers/selected';
import { dim } from './';

const majorStrokeWidth = 1;
const minorStrokeWidth = 0.25;
const minorSpacing = 50;
const majorMultiple = 4;

let Grid = ({ grid, left, top, right, bottom, guides }) => {
  const context = useContext(SelectedContext);

  const opacity = grid ? context.selected ? dim : 1 : 0;

  const minorHorizontalLines = [];
  const minorVerticalLines = [];
  const majorHorizontalLines = [];
  const majorVerticalLines = [];

  for (let index = -1000; index < 1000; index++) {
    const xy = index * minorSpacing;

    if (xy > Math.min(top, bottom) && xy < Math.max(top, bottom)) {
      const newLine =
        <line
          key={index}
          x1={Math.min(left, right)}
          y1={xy}
          x2={Math.max(left, right)}
          y2={xy}
        />;
      if (index % majorMultiple === 0)
        majorHorizontalLines.push(newLine);
      else
        minorHorizontalLines.push(newLine);
    }
    if (xy > Math.min(left, right) && xy < Math.max(left, right)) {
      const newLine =
        <line
          key={index}
          x1={xy}
          y1={Math.min(top, bottom)}
          x2={xy}
          y2={Math.max(top, bottom)}
        />;
      if (index % majorMultiple === 0)
        majorVerticalLines.push(newLine);
      else
        minorVerticalLines.push(newLine);
    }
  }

  return (
    <g id='grid' opacity={opacity}>
      <g
        id='minor_horizontal_lines'
        stroke={guides.rgb}
        strokeWidth={minorStrokeWidth}
      >
        {minorHorizontalLines}
      </g>
      <g
        id='minor_vertical_lines'
        stroke={guides.rgb}
        strokeWidth={minorStrokeWidth}
      >
        {minorVerticalLines}
      </g>
      <g
        id='major_horizontal_lines'
        stroke={guides.rgb}
        strokeWidth={majorStrokeWidth}
      >
        {majorHorizontalLines}
      </g>
      <g
        id='major_vertical_lines'
        stroke={guides.rgb}
        strokeWidth={majorStrokeWidth}
      >
        {majorVerticalLines}
      </g>
    </g>
  );
};

const mapStateToProps = (state) => ({
  grid: state.grid,
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom,
  guides: state.guides
});

Grid = connect(mapStateToProps)(Grid);

export { Grid };
