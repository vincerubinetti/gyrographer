import React from 'react';
import { Component } from 'react';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowLeft } from '../images/arrow_left.svg';

export class BackButton extends Component {
  render() {
    return (
      <Button
        className="time_button_half"
        onClick={this.context.decrementTime}
        tooltip="Step back"
      >
        <ArrowLeft />
      </Button>
    );
  }
}
BackButton.contextType = AppContext;
