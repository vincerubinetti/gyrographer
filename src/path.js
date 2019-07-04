import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Point, vCircle } from './util.js';
import { sin } from './util.js';

const precision = 2;

export class Path extends Component {
  render() {
    const time = this.props.time;
    const paths = this.props.paths;
    const id = this.props.id;
    const path = paths[thisId];

    const from = getPathPropAtTime(path, 'from', time);
    const to = getPathPropAtTime(path, 'to', time);
    const step = getPathPropAtTime(path, 'step', time);

    const fillColor = getPathPropAtTime(path, 'fillColor', time);
    const strokeColor = getPathPropAtTime(path, 'strokeColor', time);
    const strokeWidth = getPathPropAtTime(path, 'strokeWidth', time);
    const dashArray = getPathPropAtTime(path, 'dashArray', time);
    const dashOffset = getPathPropAtTime(path, 'dashOffset', time);
    const strokeLineCap = getPathPropAtTime(path, 'strokeLineCap', time);
    const strokeLineJoin = getPathPropAtTime(path, 'strokeLineJoin', time);

    let d = [];
    for (let t = from; t < to; t += step) {
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
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
        d={d}
      />
    );
  }
}
Path = connect((state) => ({
  paths: state.paths,
  time: state.time
}))(Path);

export function getPathPoint(id, trace, paths, time) {
  const spin = getPathPropAtTime(id, paths, 'spin', time);
  const offset = getPathPropAtTime(id, paths, 'offset', time);
  const radius = getPathPropAtTime(id, paths, 'radius', time);

  return vCircle((spin * 360 * trace) / 100 + offset, radius);
}

export function getPathPropAtTime(path, prop, time) {
  let value = path[prop];
  if (prop === 'radius')
    value += sin(time) * 50;
  return value;
}
