import React from 'react';
import { Component } from 'react';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowStart } from '../images/arrow_start.svg';

export class StartButton extends Component {
  render() {
    return (
      <Button
        className="time_button_half"
        onClick={() => this.context.changeTime(0)}
        tooltip="To start"
      >
        <ArrowStart />
      </Button>
    );
  }
}
StartButton.contextType = AppContext;
