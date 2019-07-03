import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import './board.css';

export class Board extends Component {
  render() {
    return (
      <svg id='board' viewBox="-100 -100 2000 2000">
        <View>
          <Background />
          <Grid />
        </View>
      </svg>
    );
  }
}
class View extends Component {
  render() {
    return <g id='view'>{this.props.children}</g>;
  }
}

class Background extends Component {
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
  color: state.board.backgroundColor
}))(Background);

class Grid extends Component {
  render() {
    const color = '#ffffffff';
    const thickness = 3;
    const axes = (
      <>
        <line
          stroke={color}
          stroke-width={thickness}
          x1={this.props.left}
          y1='0'
          x2={this.props.right}
          y2='0'
        />
        <line
          stroke={color}
          stroke-width={thickness}
          x1='0'
          y1={this.props.top}
          x2='0'
          y2={this.props.bottom}
        />
      </>
    );
    return <g id='grid'>{axes}</g>;
  }
}
Grid = connect((state) => ({
  left: state.board.left,
  top: state.board.top,
  right: state.board.right,
  bottom: state.board.bottom,
  show: state.board.showGrid
}))(Grid);
