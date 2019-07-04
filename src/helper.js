import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getContrastColor } from './util.js';
import { sin } from './util.js';
import { cos } from './util.js';

export class Helper extends Component {
  render() {
    const time = this.props.time;
    const paths = this.props.paths;
    const thisId = this.props.id;
    const thisPath = paths[thisId];

    if (!thisPath)
      return '';

    const to = thisPath.to;
    // const to = (time / 50) % 100;

    let parentX = 0;
    let parentY = 0;

    function recurse(id) {
      const thePath = paths[id];

      if (!thePath)
        return;

      const spin = thePath.spin;
      const offset = thePath.offset;
      const radius = thePath.radius + sin(time) * 10;

      parentX += cos((spin * 360 * to) / 100 + offset) * radius;
      parentY += -sin((spin * 360 * to) / 100 + offset) * radius;

      recurse(thePath.parent);
    }
    recurse(thisPath.parent);

    let thisX = parentX;
    let thisY = parentY;

    const spin = thisPath.spin;
    const offset = thisPath.offset;
    const radius = thisPath.radius + sin(time) * 10;

    thisX += cos((spin * 360 * to) / 100 + offset) * radius;
    thisY += -sin((spin * 360 * to) / 100 + offset) * radius;

    const color = getContrastColor(this.props.color);
    const circleFillColor = color + '30';
    const circleStrokeColor = color + 'ff';
    const arrowColor = color + 'ff';
    const thickness = 1;

    const d = ['M', parentX, parentY, 'L', thisX, thisY].join(' ');

    return (
      <>
        <circle cx={parentX} cy={parentY} r={radius} fill={circleFillColor} />
        <circle
          cx={parentX}
          cy={parentY}
          r={radius}
          fill="none"
          stroke={circleStrokeColor}
          strokeWidth={thickness}
        />
        <path
          d={d}
          stroke={arrowColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
      </>
    );
  }
}
Helper = connect((state) => ({
  paths: state.paths,
  time: state.time,
  color: state.board.color
}))(Helper);
