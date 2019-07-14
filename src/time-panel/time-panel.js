import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { toggleLoop } from './actions.js';
import { ReactComponent as Play } from '../images/play.svg';
import { ReactComponent as Pause } from '../images/pause.svg';
import { ReactComponent as Loop } from '../images/loop.svg';
import { ReactComponent as ArrowLeft } from '../images/arrow_left.svg';
import { ReactComponent as ArrowRight } from '../images/arrow_right.svg';
import { Button } from '../ui/button.js';
import { Timecode } from './timecode.js';
import { TimeRail } from './time-rail.js';
import './time-panel.css';

export class TimePanel extends Component {
  render() {
    return (
      <div className="time_bar">
        <Button
          className="time_button"
          onClick={() => this.context.changePlaying(!this.context.playing)}
          color={this.context.playing ? 'blue' : 'white'}
        >
          {this.context.playing ? <Pause /> : <Play />}
        </Button>
        <Button
          className="time_button"
          onClick={() => this.props.dispatch(toggleLoop())}
          color={this.props.loop ? 'blue' : 'gray'}
        >
          <Loop />
        </Button>
        <Timecode />
        <Button
          className="time_button_half"
          onClick={this.context.decrementTime}
        >
          <ArrowLeft />
        </Button>
        <TimeRail />
        <Button
          className="time_button_half"
          onClick={this.context.incrementTime}
        >
          <ArrowRight />
        </Button>
      </div>
    );
  }
}
TimePanel.contextType = AppContext;
TimePanel = connect((state) => ({
  loop: state.loop,
  fps: state.fps,
  length: state.length
}))(TimePanel);
