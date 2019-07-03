import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { sin } from './util.js';
import { cos } from './util.js';

const precision = 2;

export class Path extends Component {
  render() {
    const time = this.props.time;
    const paths = this.props.paths;
    const thisId = this.props.id;
    const thisPath = paths[thisId];

    if (!thisPath)
      return '';

    const from = thisPath.from;
    // const to = thisPath.to;
    const to = time/10 % 100;
    const steps = thisPath.steps;

    const step = (to - from) / steps || 1;

    let d = [];
    for (let t = from; t <= to; t += step) {
      let x = 0;
      let y = 0;

      function recurse(id) {
        const thePath = paths[id];

        if (!thePath)
          return;

        const spin = thePath.spin;
        const offset = thePath.offset;
        const radius = thePath.radius;

        x += cos((spin * 360 * t) / 100 + offset) * radius;
        y += -sin((spin * 360 * t) / 100 + offset) * radius;

        recurse(thePath.parent);
      }
      recurse(thisId);
      d.push({ x: x.toFixed(precision), y: y.toFixed(precision) });
    }
    d = d
      .map((point, index) =>
        ['\n', index === 0 ? 'M' : 'L', point.x, point.y].join(' ')
      )
      .join(' ');
    if (thisPath.close)
      d += 'z';

    return (
      <path
        fill={thisPath.fillColor}
        stroke={thisPath.strokeColor}
        strokeWidth={thisPath.strokeWidth}
        strokeDasharray={thisPath.dashArray}
        strokeDashoffset={thisPath.dashOffset}
        strokeLinecap={thisPath.strokeLineCap}
        strokeLinejoin={thisPath.strokeLineJoin}
        d={d}
      />
    );
  }
}
Path = connect((state) => ({
  paths: state.paths,
  time: state.time
}))(Path);
