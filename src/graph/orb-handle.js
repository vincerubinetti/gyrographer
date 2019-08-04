import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { Vector } from '../util/math.js';
import { Color } from '../util/color.js';
import './orb-handle.css';

const precision = 2;
const radius = 12;

export class OrbHandle extends Component {
  render() {
    const orb = this.props.orb;
    const time = this.context.time;
    const parent = orb.parent;

    // styles
    const color = new Color(this.props.backgroundColor).contrast().hex(true);

    // geometry
    const to = orb.computeProp('to', time);
    let a;
    if (parent)
      a = parent.computePoint(to, time);
    else
      a = new Vector(0, 0);
    const b = orb.computePoint(to, time);

    return (
      <g className="orb_handle" data-active={this.props.edit}>
        <line
          x1={a.x.toFixed(precision)}
          y1={a.y.toFixed(precision)}
          x2={b.x.toFixed(precision)}
          y2={b.y.toFixed(precision)}
          stroke={color}
          strokeWidth={radius / 4}
          strokeLinecap="round"
        />
        <circle
          cx={b.x.toFixed(precision)}
          cy={b.y.toFixed(precision)}
          r={radius}
          fill={color}
        />
      </g>
    );
  }
}
OrbHandle.contextType = AppContext;
OrbHandle = connect((state) => ({
  edit: state.edit,
  backgroundColor: state.backgroundColor
}))(OrbHandle);
