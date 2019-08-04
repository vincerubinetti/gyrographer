import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { Vector } from '../util/math.js';
import './wheel.css';

const precision = 2;

export class Wheel extends Component {
  render() {
    const orb = this.props.orb;
    const time = this.context.time;
    const parent = orb.parent;

    // styles
    const color = orb.computeProp('fillColor', time);

    // geometry
    const to = orb.computeProp('to', time);
    // a = parent point, arrow start
    // b = this orb's point, arrow end
    let a;
    if (parent)
      a = parent.computePoint(to, time);
    else
      a = new Vector(0, 0);
    const b = orb.computePoint(to, time);
    const radius = b.subtract(a).length();

    return (
      <g className='wheel' data-active={!this.props.edit}>
        <circle
          cx={a.x.toFixed(precision)}
          cy={a.y.toFixed(precision)}
          r={radius.toFixed(precision)}
          fill={color}
        />
      </g>
    );
  }
}
Wheel.contextType = AppContext;
Wheel = connect((state) => ({
  edit: state.edit,
  backgroundColor: state.backgroundColor
}))(Wheel);
