import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import './axes.css';

export class Axes extends Component {
  render() {
    return (
      <g id="axes">
        <line
          x1={this.props.left}
          y1="0"
          x2={this.props.right}
          y2="0"
          strokeLinecap="square"
        />
        <line
          x1="0"
          y1={this.props.top}
          x2="0"
          y2={this.props.bottom}
          strokeLinecap="square"
        />
      </g>
    );
  }
}
Axes = connect((state) => ({
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom
}))(Axes);
