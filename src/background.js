import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

export class Background extends Component {
  render() {
    return (
      <g id='background'>
        <rect
          x={this.props.left}
          y={this.props.top}
          width={this.props.right - this.props.left}
          height={this.props.bottom - this.props.top}
          fill={this.props.color}
        />
      </g>
    );
  }
}
Background = connect((state) => ({
  left: state.board.left,
  top: state.board.top,
  right: state.board.right,
  bottom: state.board.bottom,
  color: state.board.color
}))(Background);
