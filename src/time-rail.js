import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from './app-context.js';
import './time-rail.css';

export class TimeRail extends Component {
  constructor() {
    super();

    this.state = {};
    this.state.clicking = false;

    this.track = React.createRef();

    window.addEventListener('keydown', this.onKeyDown);
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

  onFocus = () => {};

  onBlur = () => {};

  onKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        let factor = 1;
        if (event.ctrlKey)
          factor = 0.1;
        else if (event.shiftKey)
          factor = 5;
        if (event.key === 'ArrowLeft')
          factor *= -1;

        this.context.changeTime(
          Math.round((this.context.time + factor) / factor) * factor
        );
        break;

      case 'Home':
        this.context.changeTime(0);
        break;

      default:
        break;
    }
  };

  render() {
    const percent = (100 * this.context.time) / this.props.length;

    return (
      <div className='time_rail'>
        <div
          className='slider'
          tabIndex={0}
          onTouchStart={this.onMouseDown}
          onMouseDown={this.onMouseDown}
          ref={this.track}
        >
          <div
            className='slider_marker'
            style={{ right: 100 - percent + '%' }}
          />
        </div>
        <div className='keyframe_markers' />
      </div>
    );
  }
}
TimeRail.contextType = AppContext;
TimeRail = connect((state) => ({
  length: state.length
}))(TimeRail);
