import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getContrastColor } from '../util/color.js';
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
  left: state.present.left,
  top: state.present.top,
  right: state.present.right,
  bottom: state.present.bottom,
  backgroundColor: state.present.backgroundColor
}))(Bounds);
