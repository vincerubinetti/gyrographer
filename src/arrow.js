import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getContrastColor } from './util.js';
import { Vector } from './util.js';
import './arrow.css';

const precision = 2;

export class Arrow extends Component {
  render() {
    const orb = this.props.orb;
    const time = this.props.time;
    const parent = orb.parent;

    // styles
    const color = getContrastColor(this.props.backgroundColor) + 'ff';
    const strokeWidth = orb.strokeWidth;
    const headSize = strokeWidth * 4;

    // geometry
    const to = orb.computeProp('to', time);
    // a = parent point, arrow start
    // b = this orb's point, arrow end
    // l = distance between a and b
    // c = center of arrowhead base
    // e = left-hand point of arrowhead base
    // f = right-hand point of arrowhead base
    let a;
    if (parent)
      a = parent.computePoint(to, time);
    else
      a = new Vector(0, 0);
    const b = orb.computePoint(to, time);
    const ab = b.subtract(a);
    const l = ab.length();
    const ac = ab.normalize().scale(l - headSize);
    const c = a.add(ac);
    const d = ab
      .rotate(-90)
      .normalize()
      .scale(headSize / 2)
      .add(a)
      .add(ac);
    const e = ab
      .rotate(90)
      .normalize()
      .scale(headSize / 2)
      .add(a)
      .add(ac);

    const shaft = [
      'M',
      a.x.toFixed(precision),
      a.y.toFixed(precision),
      'L',
      c.x.toFixed(precision),
      c.y.toFixed(precision)
    ].join(' ');

    const head = [
      'M',
      d.x.toFixed(precision),
      d.y.toFixed(precision),
      'L',
      b.x.toFixed(precision),
      b.y.toFixed(precision),
      'L',
      e.x.toFixed(precision),
      e.y.toFixed(precision),
      'z'
    ].join(' ');

    return (
      <g className="arrow">
        <path
          d={shaft}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path d={head} fill={color} stroke="none" />
      </g>
    );
  }
}
Arrow = connect((state) => ({
  backgroundColor: state.backgroundColor
}))(Arrow);
