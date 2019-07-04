import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getContrastColor } from './util.js';
import { sin } from './util.js';
import { Point } from './util.js';
import { vCircle } from './util.js';
import { vSum } from './util.js';
import { vLength } from './util.js';
import './path.css';

const precision = 2;

export class Path extends Component {
  render() {
    const time = this.props.time;
    const paths = this.props.paths;
    const id = this.props.id;
    const path = paths[id];
    const parent = paths[path.parent];

    // helper styles
    const showWheel = path.showWheel;
    const showArrow = path.showArrow;
    const color = getContrastColor(this.props.backgroundColor);
    const circleFillColor = color + '30';
    const circleStrokeColor = color + 'ff';
    const arrowColor = color + 'ff';

    // helper geometry
    const to = getPathPropAtTime(path, 'to', time);
    const parentPoint = getPathAbsolutePoint(parent, paths, to, time);
    const thisPoint = getPathAbsolutePoint(path, paths, to, time);
    const radius = vLength(parentPoint, thisPoint);
    const arrowD = [
      'M',
      parentPoint.x,
      parentPoint.y,
      'L',
      thisPoint.x,
      thisPoint.y
    ].join(' ');

    // path styles
    const showPath = path.showPath;
    const fillColor = getPathPropAtTime(path, 'fillColor', time);
    const strokeColor = getPathPropAtTime(path, 'strokeColor', time);
    const strokeWidth = getPathPropAtTime(path, 'strokeWidth', time);
    const close = path.close;
    const dashArray = getPathPropAtTime(path, 'dashArray', time);
    const dashOffset = getPathPropAtTime(path, 'dashOffset', time);
    const strokeLineCap = path.strokeLineCap;
    const strokeLineJoin = path.strokeLineJoin;

    // path geometry
    const pathPoints = getPathPoints(path, paths, time);
    let pathD = pathPoints
      .map((point, index) =>
        [
          '\n',
          index === 0 ? 'M' : 'L',
          point.x.toFixed(precision),
          point.y.toFixed(precision)
        ].join(' ')
      )
      .join(' ');
    if (close)
      pathD += 'z';

    return (
      <>
        <g className='helper'>
          {showWheel && (
            <>
              <circle
                cx={parentPoint.x}
                cy={parentPoint.y}
                r={radius}
                fill={circleFillColor}
              />
              <circle
                cx={parentPoint.x}
                cy={parentPoint.y}
                r={radius}
                fill='none'
                stroke={circleStrokeColor}
                strokeWidth={strokeWidth / 2}
              />
            </>
          )}
          {showArrow && (
            <path
              d={arrowD}
              stroke={arrowColor}
              strokeWidth={strokeWidth / 2}
              strokeLinecap='round'
              strokeLinejoin='miter'
            />
          )}
        </g>
        {showPath && (
          <path
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={strokeLineCap}
            strokeLinejoin={strokeLineJoin}
            d={pathD}
          />
        )}
      </>
    );
  }
}
Path = connect((state) => ({
  paths: state.paths,
  time: state.time,
  backgroundColor: state.graph.backgroundColor
}))(Path);

export function getPathPoints(path, paths, time) {
  const from = getPathPropAtTime(path, 'from', time);
  const to = getPathPropAtTime(path, 'to', time);
  const step = path.step;

  const points = [];

  for (let trace = from; trace < to; trace += step)
    points.push(getPathAbsolutePoint(path, paths, trace, time));

  return points;
}

export function getPathPropAtTime(path, prop, time) {
  let value = path[prop];
  if (prop === 'radius')
    value += sin(time) * 50;
  // if (prop === 'to')
  //   value = (time / 10) % 100;
  return value;
}

export function getPathAbsolutePoint(path, paths, trace, time) {
  const stack = [];

  function recurse(thePath) {
    if (!thePath)
      return;
    stack.push(getPathRelativePoint(thePath, trace, time));
    recurse(paths[thePath.parent]);
  }
  recurse(path);

  return vSum(stack);
}

export function getPathRelativePoint(path, trace, time) {
  if (!path)
    return new Point();
  const spin = getPathPropAtTime(path, 'spin', time);
  const offset = getPathPropAtTime(path, 'offset', time);
  const radius = getPathPropAtTime(path, 'radius', time);

  return vCircle((spin * 360 * trace) / 100 + offset, radius);
}
