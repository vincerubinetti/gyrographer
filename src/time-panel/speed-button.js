import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { setSpeed } from './actions.js';

const speeds = [0.1, 0.25, 0.5, 1, 2, 4];

export class SpeedButton extends Component {
  onClick = () => {
    const index = speeds.indexOf(this.props.speed);
    let newSpeed = 1;
    if (index !== -1)
      newSpeed = speeds[(index + 1) % speeds.length];

    this.props.dispatch(setSpeed(newSpeed));
  };

  onCtrlClick = () => {
    this.props.dispatch(setSpeed(1));
  };

  render() {
    return (
      <Button
        className="time_button"
        onClick={this.onClick}
        onCtrlClick={this.onCtrlClick}
        tooltip="Play speed"
      >
        {this.props.speed} <b>&times;</b>
      </Button>
    );
  }
}
SpeedButton = connect((state) => ({
  speed: state.speed
}))(SpeedButton);
