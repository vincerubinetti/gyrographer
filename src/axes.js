import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getContrastColor } from './util.js';
import './axes.css';

export class Axes extends Component {
  render() {
    const color = getContrastColor(this.props.backgroundColor);

    return (
      <g id="axes">
        <line
          x1={this.props.left}
          y1="0"
          x2={this.props.right}
          y2="0"
          stroke={color}
          strokeLinecap="square"
        />
        <line
          x1="0"
          y1={this.props.top}
          x2="0"
          y2={this.props.bottom}
          stroke={color}
          strokeLinecap="square"
        />
      </g>
    );
  }
}
Axes = connect((state) => ({
  left: state.graph.left,
  top: state.graph.top,
  right: state.graph.right,
  bottom: state.graph.bottom,
  backgroundColor: state.graph.backgroundColor
}))(Axes);
