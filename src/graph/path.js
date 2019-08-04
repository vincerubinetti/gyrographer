import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import './path.css';

const precision = 2;

export class Path extends Component {
  render() {
    const orb = this.props.orb;
    const time = this.context.time;

    // styles
    const fillColor = orb.computeProp('fillColor', time);
    const strokeColor = orb.computeProp('strokeColor', time);
    const strokeWidth = orb.computeProp('strokeWidth', time);
    const close = orb.close;
    const dashArray = orb.computeProp('dashArray', time);
    const dashOffset = orb.computeProp('dashOffset', time);
    const strokeLineCap = orb.strokeLineCap;
    const strokeLineJoin = orb.strokeLineJoin;

    //  geometry
    const points = orb.computePath(time);
    let d = points
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
      d += 'z';

    return (
      <path
        data-active={!this.props.edit}
        className="path"
        fill={close ? fillColor : 'none'}
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
Path.contextType = AppContext;
Path = connect((state) => ({
  edit: state.edit
}))(Path);
