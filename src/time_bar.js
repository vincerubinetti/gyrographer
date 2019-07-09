import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Play } from './images/play.svg';
import { ReactComponent as Pause } from './images/pause.svg';
import { ReactComponent as Loop } from './images/loop.svg';
import { ReactComponent as NoLoop } from './images/no_loop.svg';
import { ReactComponent as ArrowLeft } from './images/arrow_left.svg';
import { ReactComponent as ArrowRight } from './images/arrow_right.svg';
import { Button } from './button.js';
import './time_bar.css';

export class TimeBar extends Component {
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

    this.props.onChange(time);
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

        this.props.onChange(
          Math.round((this.props.time + factor) / factor) * factor
        );
        break;

      case 'Home':
        this.props.onChange(0);
        break;

      default:
        break;
    }
  };

  render() {
    const percent = (100 * this.props.time) / this.props.length;

    const seconds = String(
      Math.floor(this.props.time / this.props.fps)
    ).padStart(2, '0');
    const frames = String(
      (this.props.time % this.props.fps).toFixed(1)
    ).padStart(4, '0');

    return (
      <div className='time_bar'>
        <Button className='time_button' icon1={<Play />} />
        <Button className='time_button' icon1={<Loop />} />
        <div className='timecode'>
          <div>
            <span>{seconds}</span>
            <small>sec</small>
            <span>{frames}</span>
            <small>frames</small>
          </div>
        </div>
        <Button className='time_button_half' icon1={<ArrowLeft />} />
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
        <Button className='time_button_half' icon1={<ArrowRight />} />
      </div>
    );
  }
}
TimeBar = connect((state) => ({
  fps: state.fps,
  length: state.length
}))(TimeBar);
