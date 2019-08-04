import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import './bounds.css';

export class Bounds extends Component {
  render() {
    return (
      <g id="bounds">
        <rect
          x={this.props.left}
          y={this.props.top}
          width={this.props.right - this.props.left}
          height={this.props.bottom - this.props.top}
          fill="none"
        />
      </g>
    );
  }
}
Bounds = connect((state) => ({
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom
}))(Bounds);
