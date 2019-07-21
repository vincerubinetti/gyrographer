import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import './timecode.css';

export class Timecode extends Component {
  render() {
    const seconds = String(
      Math.floor(this.context.time / this.props.fps)
    ).padStart(2, '0');
    const frames = String(
      (this.context.time % this.props.fps).toFixed(1)
    ).padStart(4, '0');

    return (
      <div className='timecode'>
        <div>
          <span>{seconds}</span>
          <small className='light_gray'>sec</small>
          <span>{frames}</span>
          <small className='light_gray'>fr</small>
        </div>
      </div>
    );
  }
}
Timecode.contextType = AppContext;
Timecode = connect((state) => ({
  fps: state.fps
}))(Timecode);
