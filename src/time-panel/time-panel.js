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
import { ReactComponent as ArrowStart } from '../images/arrow_start.svg';
import { ReactComponent as ArrowEnd } from '../images/arrow_end.svg';
import { Button } from '../components/button.js';
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
          tooltip={this.context.playing ? 'Pause' : 'Play'}
        >
          {this.context.playing ? <Pause /> : <Play />}
        </Button>
        <Button
          className="time_button"
          onClick={() => this.props.dispatch(toggleLoop())}
          color={this.props.loop ? 'blue' : 'gray'}
          tooltip={this.props.loop ? "Don't loop" : 'Loop'}
        >
          <Loop />
        </Button>
        <Timecode />
        <Button
          className="time_button_half"
          onClick={() => this.context.changeTime(0)}
          tooltip="To start"
        >
          <ArrowStart />
        </Button>
        <Button
          className="time_button_half"
          onClick={this.context.decrementTime}
          tooltip="One frame back"
        >
          <ArrowLeft />
        </Button>
        <TimeRail />
        <Button
          className="time_button_half"
          onClick={this.context.incrementTime}
          tooltip="One frame forward"
        >
          <ArrowRight />
        </Button>
        <Button
          className="time_button_half"
          onClick={() => this.context.changeTime(this.props.length)}
          tooltip="To end"
        >
          <ArrowEnd />
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
