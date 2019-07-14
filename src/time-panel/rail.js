import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import './rail.css';

export class Rail extends Component {
  constructor() {
    super();

    this.state = {};
    this.state.clicking = false;

    this.track = React.createRef();

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchmove', this.onMouseMove);
    window.addEventListener('touchcancel', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
  }

  onMouseDown = (event) => {
    this.setState({ clicking: true });
    this.seek(event);

    event.stopPropagation();
  };

  onMouseUp = () => {
    this.setState({ clicking: false });
  };

  onMouseMove = (event) => {
    if (!this.state.clicking)
      return;

    this.seek(event);

    event.stopPropagation();
  };

  seek = (event) => {
    const x = event.clientX || (event.touches ? event.touches[0].clientX : 0);

    const bbox = this.track.current.getBoundingClientRect();
    const time = Math.floor((this.props.length * (x - bbox.left)) / bbox.width);

    this.context.changeTime(time);
  };

  render() {
    const percent = (100 * this.context.time) / this.props.length;

    return (
      <div className='rail_container'>
        <div
          className='rail'
          tabIndex={0}
          onTouchStart={this.onMouseDown}
          onMouseDown={this.onMouseDown}
          ref={this.track}
        >
          <div
            className='rail_marker'
            style={{ right: 100 - percent + '%' }}
          />
        </div>
        <div className='keyframe_markers' />
      </div>
    );
  }
}
Rail.contextType = AppContext;
Rail = connect((state) => ({
  length: state.length
}))(Rail);
