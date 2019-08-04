import React from 'react';
import { Component } from 'react';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowRight } from '../images/arrow_right.svg';

export class ForwardButton extends Component {
  render() {
    return (
      <Button
        className="time_button_half"
        onClick={this.context.incrementTime}
        tooltip="Step forward"
      >
        <ArrowRight />
      </Button>
    );
  }
}
ForwardButton.contextType = AppContext;
