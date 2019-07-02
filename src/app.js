import React from 'react';
import { Component } from 'react';

import './app.css';

let showPath = true;
let showHelpers = false;
let from = 0;
let to = 100;
let steps = 100;
let radius = 100;
let spin = 1;
let offset = 0;

let fillColor = 'none';
let strokeColor = '#ffffff';
let strokeThickness = 5;
let close = false;
let dashArray = '';
let dashOffset = 0;
let strokeLineCap = 'round';
let strokeLineJoin = 'round';

let children = [];

export class App extends Component {
  constructor() {
    super();

    this.state = {};
    this.state.x1 = -1000;
    this.state.y1 = -1000;
    this.state.x2 = 1000;
    this.state.y2 = 1000;
  }
  render() {
    return (
      <svg>
        <View>
          <Background
            x1={this.state.x1}
            y1={this.state.y1}
            x2={this.state.x2}
            y2={this.state.y2}
          />
          <Origin />
        </View>
      </svg>
    );
  }
}

class View extends Component {
  constructor() {
    super();

    this.state = {};
    this.state.translateX = 500;
    this.state.translateY = 500;
    this.state.scale = 0.5;
  }
  render() {
    const transform =
      'translate(' +
      this.state.translateX +
      ',' +
      this.state.translateY +
      ') scale(' +
      this.state.scale +
      ')';
    return <g transform={transform}>{this.props.children}</g>;
  }
}

class Background extends Component {
  render() {
    return (
      <rect
        fill='#404040'
        x={this.props.x1}
        y={this.props.y1}
        width={this.props.x2 - this.props.x1}
        height={this.props.y2 - this.props.y1}
      />
    );
  }
}

class Origin extends Component {
  render() {
    const length = 20;
    const thickness = 3;
    const color = '#808080';
    return (
      <>
        <line
          stroke={color}
          strokeWidth={thickness}
          x1={-length}
          y1='0'
          x2={length}
          y2='0'
        />
        <line
          stroke={color}
          strokeWidth={thickness}
          x1='0'
          y1={-length}
          x2='0'
          y2={length}
        />
      </>
    );
  }
}
