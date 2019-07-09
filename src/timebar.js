import React from 'react';
import { Component } from 'react';

import './timebar.css';

export class Timebar extends Component {
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
    let percent = (100 * (x - bbox.left)) / bbox.width;
    if (!percent)
      percent = 0;
    if (percent > 100)
      percent = 100;
    if (percent < 0)
      percent = 0;
    this.props.onChange(percent);
  };

  onFocus = () => {};

  onBlur = () => {};

  onKeyDown = (event) => {
    let factor = 1;
    if (event.ctrlKey)
      factor = 0.1;
    else if (event.shiftKey)
      factor = 5;

    if (event.key === 'ArrowLeft')
      this.props.onChange(this.props.value - factor);

    if (event.key === 'ArrowRight')
      this.props.onChange(this.props.value + factor);

    if (event.key === 'Home')
      this.props.onChange(0);
  };

  render() {
    return (
      <div
        className="timebar"
      >
        <div
          className="slider"
          tabIndex={0}
          onTouchStart={this.onMouseDown}
          onMouseDown={this.onMouseDown}
          ref={this.track}
        >
          <div
            className="slider_marker"
            style={{ right: 100 - this.props.value + '%' }}
          />
        </div>
      </div>
    );
  }
}
