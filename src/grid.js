import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getContrastColor } from './util.js';
import './grid.css';

export class Grid extends Component {
  render() {
    const color = getContrastColor(this.props.color);

    const minorSpacing = 50;
    const majorMultiple = 4;

    const minorHorizontalLines = [];
    const minorVerticalLines = [];
    const majorHorizontalLines = [];
    const majorVerticalLines = [];

    for (let index = -1000; index < 1000; index++) {
      if (index === 0)
        continue;

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

    const bounds = (
      <rect
        x={this.props.left}
        y={this.props.top}
        width={this.props.right - this.props.left}
        height={this.props.bottom - this.props.top}
        stroke={color}
        fill='none'
      />
    );

    const axes = (
      <>
        <line
          x1={this.props.left}
          y1='0'
          x2={this.props.right}
          y2='0'
          stroke={color}
        />
        <line
          x1='0'
          y1={this.props.top}
          x2='0'
          y2={this.props.bottom}
          stroke={color}
        />
      </>
    );

    return (
      <g id='grid'>
        <g id='bounds'>{bounds}</g>
        <g id='minor_horizontal_lines'>{minorHorizontalLines}</g>
        <g id='minor_vertical_lines'>{minorVerticalLines}</g>
        <g id='major_horizontal_lines'>{majorHorizontalLines}</g>
        <g id='major_vertical_lines'>{majorVerticalLines}</g>
        <g id='axes'>{axes}</g>
      </g>
    );
  }
}
Grid = connect((state) => ({
  left: state.board.left,
  top: state.board.top,
  right: state.board.right,
  bottom: state.board.bottom,
  color: state.board.color,
  show: state.board.showGrid
}))(Grid);
