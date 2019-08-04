import React from 'react';
import { Component } from 'react';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as Play } from '../images/play.svg';
import { ReactComponent as Pause } from '../images/pause.svg';

export class PlayButton extends Component {
  render() {
    return (
      <Button
        className="time_button"
        onClick={() => this.context.changePlaying(!this.context.playing)}
        color={this.context.playing ? 'blue' : 'white'}
        tooltip={this.context.playing ? 'Pause' : 'Play'}
      >
        {this.context.playing ? <Pause /> : <Play />}
      </Button>
    );
  }
}
PlayButton.contextType = AppContext;
