import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { sin } from './util.js';
import { cos } from './util.js';

const precision = 3;

export class Path extends Component {
  render() {
    const paths = this.props.paths;
    const thisId = this.props.id;
    const thisPath = paths[thisId];
    if (!thisPath)
      return '';

    let d = [];
    const step = (thisPath.to - thisPath.from) / thisPath.steps;
    for (let t = thisPath.from; t <= thisPath.to; t += step) {
      let x = 0;
      let y = 0;

      function recurse(id) {
        const thePath = paths[id];
        if (!thePath)
          return;

        x +=
          cos((thePath.spin * 360 * t) / 100 + thePath.offset) * thePath.radius;
        y +=
          -sin((thePath.spin * 360 * t) / 100 + thePath.offset) *
          thePath.radius;

        recurse(thePath.parent);
      }
      recurse(thisId);

      d.push({ x: x.toFixed(precision), y: y.toFixed(precision) });
    }

    d = d.map((point, index) =>
      [index === 0 ? 'M' : 'L', point.x, point.y].join(' ')
    );
    if (thisPath.close)
      d += 'z';

    return (
      <path
        d={d}
        fill={thisPath.fillColor}
        stroke={thisPath.strokeColor}
        strokeWidth={thisPath.strokeWidth}
        dash-array={thisPath.dashArray}
        dash-offset={thisPath.dashOffset}
        strokeLinecap={thisPath.strokeLineCap}
        strokeLinejoin={thisPath.strokeLineJoin}
      />
    );
  }
}
Path = connect((state) => ({
  paths: state.paths
}))(Path);
