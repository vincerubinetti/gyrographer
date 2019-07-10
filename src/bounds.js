import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getContrastColor } from './util.js';
import './bounds.css';

export class Bounds extends Component {
  render() {
    const color = getContrastColor(this.props.backgroundColor);

    return (
      <g id='bounds'>
        <rect
          x={this.props.left}
          y={this.props.top}
          width={this.props.right - this.props.left}
          height={this.props.bottom - this.props.top}
          stroke={color}
          fill='none'
        />
      </g>
    );
  }
}
Bounds = connect((state) => ({
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom,
  backgroundColor: state.backgroundColor
}))(Bounds);
