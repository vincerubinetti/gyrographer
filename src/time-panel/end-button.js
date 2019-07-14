import React from 'react';
import { Component } from 'react';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowEnd } from '../images/arrow_end.svg';

export class EndButton extends Component {
  render() {
    return (
      <Button
        className="time_button_half"
        onClick={() => this.context.changeTime(this.props.length)}
        tooltip="To end"
      >
        <ArrowEnd />
      </Button>
    );
  }
}
EndButton.contextType = AppContext;
