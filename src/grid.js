import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getContrastColor } from './util.js';
import './grid.css';

const minorSpacing = 50;
const majorMultiple = 4;

export class Grid extends Component {
  render() {
    const color = getContrastColor(this.props.backgroundColor);

    const minorHorizontalLines = [];
    const minorVerticalLines = [];
    const majorHorizontalLines = [];
    const majorVerticalLines = [];

    for (let index = -1000; index < 1000; index++) {
      const xy = index * minorSpacing;

      if (xy > this.props.left && xy < this.props.right) {
        const newLine = (
          <line
            key={index}
            x1={this.props.left}
            y1={xy}
            x2={this.props.right}
            y2={xy}
            stroke={color}
          />
        );
        if (index % majorMultiple === 0)
          majorHorizontalLines.push(newLine);
        else
          minorHorizontalLines.push(newLine);
      }
      if (xy > this.props.top && xy < this.props.bottom) {
        const newLine = (
          <line
            key={index}
            x1={xy}
            y1={this.props.top}
            x2={xy}
            y2={this.props.bottom}
            stroke={color}
          />
        );
        if (index % majorMultiple === 0)
          majorVerticalLines.push(newLine);
        else
          minorVerticalLines.push(newLine);
      }
    }

    return (
      <g id="grid">
        <g id="minor_horizontal_lines">{minorHorizontalLines}</g>
        <g id="minor_vertical_lines">{minorVerticalLines}</g>
        <g id="major_horizontal_lines">{majorHorizontalLines}</g>
        <g id="major_vertical_lines">{majorVerticalLines}</g>
      </g>
    );
  }
}
Grid = connect((state) => ({
  left: state.graph.left,
  top: state.graph.top,
  right: state.graph.right,
  bottom: state.graph.bottom,
  backgroundColor: state.graph.backgroundColor
}))(Grid);
